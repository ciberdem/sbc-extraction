
class ExtractionService {
    constructor(crawler) {
        this.crawler = crawler;
    }

    async getAll(data) {
        const URL = this.createURL(data);
        const numberOfPages = await this.getNumberOfPages(URL);

        let requests = [];
        for (let i = 1; i <= numberOfPages; i++) {
            requests.push(this.getAllFromPage(URL, i));
        }
        const responses = await Promise.all(requests);
        const flatArray = [].concat(...responses);

        return flatArray;
    }

    createURL(data) {
        let URL = `https://sol.sbc.org.br/busca/index.php/integrada/results?query=${encodeURIComponent(data.searchWord)}`;

        const archives = this.createArchives(data);
        if (archives !== "") {
            URL += archives;
        }

        const date = this.createDate(data);
        if (date !== "") {
            URL += date;
        }

        const languages = this.createLanguages(data);
        if (languages !== "") {
            URL += languages;
        }

        return URL;
    }

    createArchives(data) {
        let archives = data.archives || "";
        if (archives !== undefined) {
            if (Array.isArray(data.archives)) {
                archives = data.archives.join("&");
            }

            archives = `&${archives}`;
        }
        return archives;
    }

    createDate(data) {
        let result = "";
        const initialDate = data.initialDate;

        if (initialDate !== undefined) {
            const [day, month, year] = initialDate.split('/');
            result += `&field-7-fromDay=${day}`;
            result += `&field-7-fromMonth=${month}`;
            result += `&field-7-fromYear=${year}`;
        }

        const finalDate = data.finalDate;

        if (finalDate !== undefined) {
            const [day, month, year] = finalDate.split('/');
            result += `&field-7-toDay=${day}`;
            result += `&field-7-toMonth=${month}`;
            result += `&field-7-toYear=${year}`;
        }

        return result;
    }

    createLanguages(data) {
        let languages = data.languages || "";

        if (languages !== undefined) {
            if (Array.isArray(data.languages)) {
                languages = data.languages.join("&");
            }

            languages = `&${languages}`;
        }
        return languages;
    }

    async getNumberOfPages(URL) {
        const data = await this.crawler.fetch({
            target: URL,
            fetch: {
                numberOfArticles: {
                    selector: 'div.articles_count',
                    convert: (x) => `${x.replace(/(\d+)\s+a\s+\d+\s+de\s+(\d+)\s+itens/, "$2")}`,
                }
            },
        });

        return Math.ceil(Number(data.numberOfArticles) / 25);
    }

    async getAllFromPage(URL, page) {
        return this.crawler.fetch({
            target: {
                url: `${URL}&searchPage=${page}`,
                iterator: {
                    selector: 'a.record_title'
                },
            },
            fetch: (data, index, url) => {
                return {
                    title: {
                        selector: 'h1',
                        convert: (x) => `${x}`,
                    },
                    year: {
                        selector: 'div.published div.value',
                        convert: (x) => `${x.replace(/.*\/(\d{4})$/, "$1")}`,
                    },
                    authors: {
                        selector: 'span.name',
                        convert: (x) => `${x.replace(/\t/g, "").replace(/\n\n/g, ', ')}.`,
                    },
                    abstract: {
                        selector: 'div.abstract',
                        convert: (x) => `${x.replace(/\t/g, "").replace(/Resumo\n/g, '')}`,
                    },
                    publicated: {
                        selector: 'nav.cmp_breadcrumbs a',
                        convert: (x) => `${x}`,
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
                        convert: (x) => `${url}`,
                    }
                }
            },
        });
    }

    async getSpringer(data) {
        const links = data.links;
        let requests = [];
        for (let i = 0; i < links.length; i++) {
            requests.push(this.getResume(links[i]));
        }
        const responses = await Promise.all(requests);
        const flatArray = [].concat(...responses);

        return flatArray;
    }

    async getResume(URL) {
        return this.crawler.fetch({
            target: URL,
            fetch: {
                title: {
                    selector: 'h1',
                    convert: (x) => `${x}`,
                },
                year: {
                    selector: 'header li time',
                    convert: (x) => `${x.replace(/(.*)(\d{4})/, "$2")}`,
                },
                authors: {
                    selector: 'header li.c-article-author-list__item a',
                    convert: (x) => `${x.replace(/ORCID: orcid.org\/\d{4}-\d{4}-\d{4}-\d{4}/, '').replace(/\d+/g, ', ')}.`.replace(', .', '.'),
                },
                abstract: {
                    selector: 'div#Abs1-content',
                    convert: (x) => `${x.replace(/\t/g, "").replace(/Resumo\n/g, '')}`,
                },
                publicated: {
                    selector: 'nav ol li#breadcrumb2',
                    convert: (x) => `${x}`,
                },
                PDF: {
                    selector: 'div.c-pdf-container a',
                    attr: 'href',
                    convert: (x) => `${x == "" ? "" : 'https://rd.springer.com'+x }`
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
                    convert: (x) => `${URL}`,
                }
            },
        });
    }
}
