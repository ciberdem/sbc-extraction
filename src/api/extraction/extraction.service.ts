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
        var urls = []
        const pages: ExtractionDTO[] = await this.crawler.fetch({
            target: {
                url: `https://sol.sbc.org.br/busca/index.php/integrada/results?query=${encodeURIComponent(word)}`,
                iterator: {
                    selector: 'a.record_title'
                },
            },
            fetch: (data: any, index: number, url: string) => {
                urls.push(url)
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
                    }
                }
            },
        });

        for (let i in pages) {
            pages[i].url = urls[i]
        }

        return pages
    }
}

