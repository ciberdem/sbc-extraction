import { ExtractionService } from 'src/api/extraction/extraction.service';
import { ExtractionDTO } from 'src/dto/models/extraction.dto';
import { FormDTO } from 'src/dto/models/form.dto';
export declare class ManagerService {
    private readonly extractorService;
    constructor(extractorService: ExtractionService);
    searchBy(wordSearch: FormDTO): Promise<ExtractionDTO[]>;
}
