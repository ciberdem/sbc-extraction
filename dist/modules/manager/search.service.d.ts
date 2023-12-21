import { ExtractionService } from 'src/modules/extraction/extraction.service';
import { ExtractionDTO } from 'src/dto/extraction.dto';
import { FormDTO } from 'src/dto/form.dto';
export declare class SearchService {
    private readonly extractorService;
    constructor(extractorService: ExtractionService);
    searchBy(wordSearch: FormDTO): Promise<ExtractionDTO[]>;
}
