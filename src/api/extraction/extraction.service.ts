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

    async getAll(): Promise<any> {
        interface ExampleCom {
            title: string;
            year: string;
            authors: string;
            abstract: string;
        }

        interface Page {
            title: string;
        }

        const pages: Page[] = await this.crawler.fetch({
            target: {
                url: 'https://sol.sbc.org.br/busca/index.php/integrada/results?isAdvanced=1&archiveIds%5B%5D=1&archiveIds%5B%5D=2&query=plataforma+de+an%C3%A1lise+de+redes+sociais&field-3=&field-15=&field-4=&field-14=&field-16=&field-7-fromMonth=01&field-7-fromDay=1&field-7-fromYear=2018&field-7-toMonth=&field-7-toDay=&field-7-toYear=',
                iterator: {
                    selector: 'a.record_title'
                },
            },
            fetch: (data: any, index: number, url: string) => {
                console.log(url)
                return {
                    title: 'h1',
                    year: 'div.published',
                    authors: 'span.name',
                    abstract: 'div.abstract'
                }
            },
        });

        console.log(pages);

        return pages
    }
}

