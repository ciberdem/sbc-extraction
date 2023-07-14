import { ExtractionDTO } from 'src/dto/models/extraction.dto';
import { NestCrawlerService } from 'nest-crawler';
export declare class ExtractionService {
    private readonly crawler;
    constructor(crawler: NestCrawlerService);
    getAll(word: string): Promise<ExtractionDTO[]>;
}
