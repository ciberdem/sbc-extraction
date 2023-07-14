import { ExtractionDTO } from 'src/dto/models/extraction.dto';
import { NestCrawlerService } from 'nest-crawler';
import { FormDTO } from 'src/dto/models/form.dto';
export declare class ExtractionService {
    private readonly crawler;
    constructor(crawler: NestCrawlerService);
    getAll(data: FormDTO): Promise<ExtractionDTO[]>;
    createURL(data: FormDTO): string;
    createArchives(data: FormDTO): string | string[];
    createDate(data: FormDTO): string;
    getNumberOfPages(URL: string): Promise<number>;
    getAllFromPage(URL: string, page: Number): Promise<ExtractionDTO[]>;
}
