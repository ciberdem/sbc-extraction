import { Controller, Get, Res, Render, Request, Req, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { ManagerService } from './manager.service';
import { ApiTags } from '@nestjs/swagger';

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
        const searchWord = req.body.searchWord
        const results = await this.service.searchBy(searchWord)
        res.render('pages/modules/extraction/search', { results, searchWord })
    }

    // PAGES
    @Get('dashboard')
    @Render('pages/modules/dashboard/dashboard')
    getHome() {
        return {};
    }
}


