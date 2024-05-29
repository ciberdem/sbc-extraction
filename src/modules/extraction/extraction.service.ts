import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ExtractionDTO } from 'src/dto/extraction.dto';
import { NestCrawlerService } from 'nest-crawler';
import { FormDTO } from 'src/dto/form.dto';
import { LinksDTO } from 'src/dto/links.dto';

@Injectable()
export class ExtractionService {

    constructor(
        private readonly crawler: NestCrawlerService,
    ) { }

    async getAll(data: FormDTO): Promise<ExtractionDTO[]> {
        const URL = this.createURL(data);
        console.log(URL)
        const numberOfPages = await this.getNumberOfPages(URL);
        console.log(numberOfPages)
        let requests: Promise<ExtractionDTO[]>[] = [];
        for (let i = 1; i <= numberOfPages; i++) {
            requests.push(this.getAllFromPage(URL, i))
        }
        const responses = await Promise.all(requests);
        const flatArray: ExtractionDTO[] = ([] as ExtractionDTO[]).concat(...responses);

        return flatArray;
    }

    createURL(data: FormDTO): string {
        let URL = `https://sol.sbc.org.br/busca/index.php/integrada/results?query=${encodeURIComponent(data.searchWord)}`;

        const archives = this.createArchives(data)
        if (archives != "") {
            URL += archives
        }

        const date = this.createDate(data)
        if (date != "") {
            URL += date
        }

        const languages = this.createLanguages(data)
        if (languages != "") {
            URL += languages
        }

        return URL
    }

    createArchives(data: FormDTO): string | string[] {
        var archives = data.archives || ""
        if (archives != undefined) {
            if (Array.isArray(data.archives)) {
                archives = data.archives.join("&");   
            }

            archives = `&${archives}`
        }
        return archives
    }

    createDate(data: FormDTO): string {
        let result = ""
        let initialDate = data.initialDate

        if (initialDate != undefined) {
            const [day, month, year] = initialDate.split('/');
            result += `&field-7-fromDay=${day}`
            result += `&field-7-fromMonth=${month}`
            result += `&field-7-fromYear=${year}`
        }

        let finalDate = data.finalDate

        if (finalDate != undefined) {
            const [day, month, year] = finalDate.split('/');
            result += `&field-7-toDay=${day}`
            result += `&field-7-toMonth=${month}`
            result += `&field-7-toYear=${year}`

        }

        return result
    }

    createLanguages(data: FormDTO): string | string[] {
        var languages = data.languages || ""

        if (languages != undefined) {
            if (Array.isArray(data.languages)) {
                languages = data.languages.join("&");   
            }

            languages = `&${languages}`
        }
        return languages
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

    // MARK: - Springer Resumes

    async getSpringer(data: LinksDTO): Promise<ExtractionDTO[]> {
        const links = data.links;
        let requests: Promise<ExtractionDTO[]>[] = [];
        for (let i = 0; i < links.length; i++) {
            requests.push(this.getResume(links[i]))
        }
        const responses = await Promise.all(requests);
        const flatArray: ExtractionDTO[] = ([] as ExtractionDTO[]).concat(...responses);

        return flatArray;
    }

    async getResume(URL: string): Promise<ExtractionDTO[]> {
        return this.crawler.fetch({
            target: URL,
            fetch: {
                title: {
                    selector: 'h1',
                    convert: (x: string) => `${x}`,
                },
                year: {
                    selector: 'header li time',
                    convert: (x: string) => `${x.replace(/(.*)(\d{4})/, "$2")}`,
                },
                authors: {
                    selector: 'header li.c-article-author-list__item a',
                    convert: (x: string) => `${x.replace(/ORCID: orcid.org\/\d{4}-\d{4}-\d{4}-\d{4}/, '').replace(/\d+/g, ', ')}.`.replace(', .', '.'),
                },
                abstract: {
                    selector: 'div#Abs1-content',
                    convert: (x: string) => `${x.replace(/\t/g, "").replace(/Resumo\n/g, '')}`,
                },
                publicated: {
                    selector: 'nav ol li#breadcrumb2',
                    convert: (x: string) => `${x}`,
                },
                PDF: {
                    selector: 'div.c-pdf-container a',
                    attr: 'href',
                    convert: (x: string) => `${x == "" ? "" : 'https://rd.springer.com'+x }`
                },
                DOI: {
                    selector: 'div.doi span.value a',
                    attr: 'href'
                },
                type: {
                    selector: 'nav ol li#breadcrumb1',
                },
                url: {
                    selector: 'nav.cmp_breadcrumbs a',
                    convert: (x: string) => `${URL}`,
                }
            },
        });
    }
}

