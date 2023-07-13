import { AnswerDTO } from 'src/dto/answer/answer.dto';
import { ExtractionDTO } from 'src/dto/models/extraction.dto';
import { ExtractionService } from './extraction.service';
export declare class ApiExtractionController {
    private extractionService;
    constructor(extractionService: ExtractionService);
    get(search: any): Promise<AnswerDTO<ExtractionDTO[]>>;
}
