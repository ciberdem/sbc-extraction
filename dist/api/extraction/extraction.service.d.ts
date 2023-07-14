import { ExtractionDTO } from 'src/dto/models/extraction.dto';
import { NestCrawlerService } from 'nest-crawler';
export declare class ExtractionService {
    private readonly crawler;
    constructor(crawler: NestCrawlerService);
    getAll(word: string): Promise<ExtractionDTO[]>;
    getNumberOfPages(URL: string): Promise<number>;
    getAllFromPage(URL: string, page: Number): Promise<ExtractionDTO[]>;
}
