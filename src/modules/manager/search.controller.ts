import { Controller, Get, Res, Render, Request, Req, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { SearchService } from './search.service';
import { ApiTags } from '@nestjs/swagger';
import { FormDTO } from 'src/dto/form.dto';

@ApiTags('Views')
@Controller()
export class SearchController {
    constructor(
        private service: SearchService,
    ) { }

    @Get('/sbc-extraction/')
    index(@Res() res) {
        res.render('pages/search')
    }

    @Post('/sbc-extraction/')
    async postSearch(@Req() req, @Res() res) {
        const forms: FormDTO = req.body;
        console.log(forms)
        const results = await this.service.searchBy(forms)
        res.render('pages/search', { results, forms })
    }
}


