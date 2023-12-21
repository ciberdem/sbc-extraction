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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractionDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class ExtractionDTO {
    constructor() {
        this.title = '';
        this.year = '';
        this.authors = '';
        this.abstract = '';
        this.url = '';
        this.DOI = '';
        this.PDF = '';
        this.type = '';
        this.publicated = '';
    }
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ExtractionDTO.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ExtractionDTO.prototype, "year", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ExtractionDTO.prototype, "authors", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ExtractionDTO.prototype, "abstract", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ExtractionDTO.prototype, "url", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ExtractionDTO.prototype, "DOI", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ExtractionDTO.prototype, "PDF", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ExtractionDTO.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ExtractionDTO.prototype, "publicated", void 0);
exports.ExtractionDTO = ExtractionDTO;
//# sourceMappingURL=extraction.dto.js.map