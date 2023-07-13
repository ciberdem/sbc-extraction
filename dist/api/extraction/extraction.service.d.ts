import { NestCrawlerService } from 'nest-crawler';
export declare class ExtractionService {
    private readonly crawler;
    constructor(crawler: NestCrawlerService);
    getAll(word: string): Promise<any>;
}
