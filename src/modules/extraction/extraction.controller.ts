import { Controller, Get, Body, Delete, Put, Req, Param, Query, Post } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AnswerDTO } from 'src/dto/answer.dto';
import { ExtractionDTO } from 'src/dto/extraction.dto';
import { ExtractionService } from './extraction.service';
import { LinksDTO } from 'src/dto/links.dto';

@ApiTags('Extraction')
@Controller('api/extraction')
export class ApiExtractionController {

    constructor(
        private extractionService: ExtractionService
    ) { }

    /**
     * Get the Extraction by you userId
     */
    @Get('sol')
    @ApiQuery({ name: 'search', description: 'Selecione a busca', required: true })
    async get(@Query('search') search): Promise<AnswerDTO<ExtractionDTO[]>> {
        try {
            const data = await this.extractionService.getAll(search)
            return new AnswerDTO('Artigos lidos com sucesso!', 200, data);
        } catch (error) {
            throw error.message || error
        }
    }

    /**
     * Get the resume from Spriger
     */
    @Post('springer')
    async getResumeFromSpringerLinks(@Body() links: LinksDTO): Promise<AnswerDTO<ExtractionDTO[]>> {
        try {
            const data = await this.extractionService.getSpringer(links)
            return new AnswerDTO('Artigos lidos com sucesso!', 200, data);
        } catch (error) {
            throw error.message || error
        }
    }
}
