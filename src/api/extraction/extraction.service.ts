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

    async getAll(word: string): Promise<any> {

        interface Page {
            title: string;
        }

        const pages: Page[] = await this.crawler.fetch({
            target: {
                url: `https://sol.sbc.org.br/busca/index.php/integrada/results?query=${encodeURIComponent(word)}`,
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
                        selector: 'div.published',
                        convert: (x: string) => `${x.replace(/Publicado/g, '').replace(/\n/g, '').replace(/\t/g, '').replace(/.*\/(\d{4})$/, "$1")}`,
                    },
                    authors: {
                        selector: 'span.name',
                        convert: (x: string) => `${x.replace(/\t/g, "").replace(/\n\n/g, ', ')}.`,
                    },
                    abstract: {
                        selector: 'div.abstract',
                        convert: (x: string) => `${x.replace(/\t/g, "").replace(/Resumo\n/g, '')}`,
                    }
                }
            },
        });

        return pages
    }
}

