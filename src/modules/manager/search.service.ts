import { Injectable } from '@nestjs/common';
import { ExtractionService } from 'src/modules/extraction/extraction.service';
import { ExtractionDTO } from 'src/dto/extraction.dto';
import { FormDTO } from 'src/dto/form.dto';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable()
export class SearchService {

    constructor(
        private readonly extractorService: ExtractionService,
    ) { }

    async searchBy(wordSearch: FormDTO): Promise<ExtractionDTO[]> {
        return this.extractorService.getAll(wordSearch)
    }
}
