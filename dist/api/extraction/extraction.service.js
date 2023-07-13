"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractionService = void 0;
const common_1 = require("@nestjs/common");
const extraction_dto_1 = require("../../dto/models/extraction.dto");
const nest_crawler_1 = require("nest-crawler");
let ExtractionService = class ExtractionService {
    constructor(crawler) {
        this.crawler = crawler;
    }
    async getAll(word) {
        const pages = await this.crawler.fetch({
            target: {
                url: `https://sol.sbc.org.br/busca/index.php/integrada/results?query=${encodeURIComponent(word)}`,
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
                        selector: 'div.published',
                        convert: (x) => `${x.replace(/Publicado/g, '').replace(/\n/g, '').replace(/\t/g, '').replace(/.*\/(\d{4})$/, "$1")}`,
                    },
                    authors: {
                        selector: 'span.name',
                        convert: (x) => `${x.replace(/\t/g, "").replace(/\n\n/g, ', ')}.`,
                    },
                    abstract: {
                        selector: 'div.abstract',
                        convert: (x) => `${x.replace(/\t/g, "").replace(/Resumo\n/g, '')}`,
                    }
                };
            },
        });
        return pages;
    }
};
ExtractionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nest_crawler_1.NestCrawlerService])
], ExtractionService);
exports.ExtractionService = ExtractionService;
//# sourceMappingURL=extraction.service.js.map