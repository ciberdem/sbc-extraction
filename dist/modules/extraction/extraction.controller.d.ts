import { AnswerDTO } from 'src/dto/answer.dto';
import { ExtractionDTO } from 'src/dto/extraction.dto';
import { ExtractionService } from './extraction.service';
import { LinksDTO } from 'src/dto/links.dto';
export declare class ApiExtractionController {
    private extractionService;
    constructor(extractionService: ExtractionService);
    get(search: any): Promise<AnswerDTO<ExtractionDTO[]>>;
    getResumeFromSpringerLinks(links: LinksDTO): Promise<AnswerDTO<ExtractionDTO[]>>;
}
