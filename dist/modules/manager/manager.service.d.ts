import { ExtractionService } from 'src/api/extraction/extraction.service';
import { ExtractionDTO } from 'src/dto/models/extraction.dto';
export declare class ManagerService {
    private readonly extractorService;
    constructor(extractorService: ExtractionService);
    searchBy(wordSearch: string): Promise<ExtractionDTO[]>;
}
