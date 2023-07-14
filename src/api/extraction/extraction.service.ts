import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ExtractionDTO } from 'src/dto/models/extraction.dto';
import { NestCrawlerService } from 'nest-crawler';

@Injectable()
export class ExtractionService {

    constructor(
        private readonly crawler: NestCrawlerService,
    ) { }

    async getAll(word: string): Promise<ExtractionDTO[]> {
        const URL = `https://sol.sbc.org.br/busca/index.php/integrada/results?query=${encodeURIComponent(word)}`;
        const numberOfPages = await this.getNumberOfPages(URL);

        let requests: Promise<ExtractionDTO[]>[] = [];
        for (let i = 1; i <= numberOfPages; i++) {
            requests.push(this.getAllFromPage(URL, i))
        }
        const responses = await Promise.all(requests);
        const flatArray: ExtractionDTO[] = ([] as ExtractionDTO[]).concat(...responses);

        return flatArray;
    }

    async getNumberOfPages(URL: string): Promise<number> {
        interface Result {
            numberOfArticles: string;
        }

        const data: Result = await this.crawler.fetch({
            target: URL,
            fetch: {
                numberOfArticles: {
                    selector: 'div.articles_count',
                    convert: (x: string) => `${x.replace(/(\d+)\s+a\s+\d+\s+de\s+(\d+)\s+itens/, "$2")}`,
                }
            },
        });

        return Math.ceil(Number(data.numberOfArticles) / 25)
    }

    async getAllFromPage(URL: string, page: Number): Promise<ExtractionDTO[]> {
        return this.crawler.fetch({
            target: {
                url: `${URL}&searchPage=${page}`,
                iterator: {
                    selector: 'a.record_title'
                },
            },
            fetch: (data: any, index: number, url: string) => {
                return {
                    title: {
                        selector: 'h1',
                        convert: (x: string) => `${x}`,
                    },
                    year: {
                        selector: 'div.published div.value',
                        convert: (x: string) => `${x.replace(/.*\/(\d{4})$/, "$1")}`,
                    },
                    authors: {
                        selector: 'span.name',
                        convert: (x: string) => `${x.replace(/\t/g, "").replace(/\n\n/g, ', ')}.`,
                    },
                    abstract: {
                        selector: 'div.abstract',
                        convert: (x: string) => `${x.replace(/\t/g, "").replace(/Resumo\n/g, '')}`,
                    },
                    publicated: {
                        selector: 'nav.cmp_breadcrumbs a',
                        convert: (x: string) => `${x}`,
                    },
                    PDF: {
                        selector: 'a.obj_galley_link',
                        attr: 'href'
                    },
                    DOI: {
                        selector: 'div.doi span.value a',
                        attr: 'href'
                    },
                    type: {
                        selector: 'nav.cmp_breadcrumbs b'
                    },
                    url: {
                        selector: 'nav.cmp_breadcrumbs a',
                        convert: (x: string) => `${url}`,
                    }
                }
            },
        });
    }
}

