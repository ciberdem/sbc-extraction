import { Controller, Get, Body, Delete, Put, Req, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AnswerDTO } from 'src/dto/answer/answer.dto';
import { ExtractionDTO } from 'src/dto/models/extraction.dto';
import { ExtractionService } from './extraction.service';

@ApiTags('Extraction')
@Controller('api/extraction')
export class ApiExtractionController {

    constructor(
        private extractionService: ExtractionService
    ) { }

    /**
     * Get the Extraction by you userId
     */
    @Get()
    @ApiQuery({ name: 'search', description: 'Selecione a busca', required: true })
    async get(@Query('search') search): Promise<AnswerDTO<ExtractionDTO[]>> {
        try {
            const data = await this.extractionService.getAll(search)
            return new AnswerDTO('Resumos lidos com sucesso!', 200, data);
        } catch (error) {
            throw error.message || error
        }
    }
}
