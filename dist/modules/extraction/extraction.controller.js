"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExtractionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const answer_dto_1 = require("../../dto/answer.dto");
const extraction_dto_1 = require("../../dto/extraction.dto");
const extraction_service_1 = require("./extraction.service");
const links_dto_1 = require("../../dto/links.dto");
let ApiExtractionController = class ApiExtractionController {
    constructor(extractionService) {
        this.extractionService = extractionService;
    }
    async get(search) {
        try {
            const data = await this.extractionService.getAll(search);
            return new answer_dto_1.AnswerDTO('Artigos lidos com sucesso!', 200, data);
        }
        catch (error) {
            throw error.message || error;
        }
    }
    async getResumeFromSpringerLinks(links) {
        try {
            const data = await this.extractionService.getSpringer(links);
            return new answer_dto_1.AnswerDTO('Artigos lidos com sucesso!', 200, data);
        }
        catch (error) {
            throw error.message || error;
        }
    }
};
__decorate([
    common_1.Get('sol'),
    swagger_1.ApiQuery({ name: 'search', description: 'Selecione a busca', required: true }),
    __param(0, common_1.Query('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiExtractionController.prototype, "get", null);
__decorate([
    common_1.Post('springer'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [links_dto_1.LinksDTO]),
    __metadata("design:returntype", Promise)
], ApiExtractionController.prototype, "getResumeFromSpringerLinks", null);
ApiExtractionController = __decorate([
    swagger_1.ApiTags('Extraction'),
    common_1.Controller('api/extraction'),
    __metadata("design:paramtypes", [extraction_service_1.ExtractionService])
], ApiExtractionController);
exports.ApiExtractionController = ApiExtractionController;
//# sourceMappingURL=extraction.controller.js.map