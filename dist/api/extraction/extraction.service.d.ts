import { ExtractionDTO } from 'src/dto/models/extraction.dto';
import { NestCrawlerService } from 'nest-crawler';
import { FormDTO } from 'src/dto/models/form.dto';
import { LinksDTO } from 'src/dto/models/links.dto';
export declare class ExtractionService {
    private readonly crawler;
    constructor(crawler: NestCrawlerService);
    getAll(data: FormDTO): Promise<ExtractionDTO[]>;
    createURL(data: FormDTO): string;
    createArchives(data: FormDTO): string | string[];
    createDate(data: FormDTO): string;
    createLanguages(data: FormDTO): string | string[];
    getNumberOfPages(URL: string): Promise<number>;
    getAllFromPage(URL: string, page: Number): Promise<ExtractionDTO[]>;
    getSpringer(data: LinksDTO): Promise<ExtractionDTO[]>;
    getResume(URL: string): Promise<ExtractionDTO[]>;
}
