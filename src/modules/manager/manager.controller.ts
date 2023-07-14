import { Controller, Get, Res, Render, Request, Req, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { ManagerService } from './manager.service';
import { ApiTags } from '@nestjs/swagger';
import { FormDTO } from 'src/dto/models/form.dto';

@ApiTags('Views')
@Controller()
export class ManagerController {
    constructor(
        private service: ManagerService,
    ) { }

    @Get('/')
    index(@Res() res) {
        res.render('pages/modules/extraction/search')
    }

    @Post('/')
    async postSearch(@Req() req, @Res() res) {
        const forms: FormDTO = req.body;
        const results = await this.service.searchBy(forms)
        res.render('pages/modules/extraction/search', { results, forms })
    }

    // PAGES
    @Get('dashboard')
    @Render('pages/modules/dashboard/dashboard')
    getHome() {
        return {};
    }
}


