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
exports.AnswerDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class AnswerDTO {
    constructor(message, statusCode = 200, data = undefined) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
    ;
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], AnswerDTO.prototype, "success", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AnswerDTO.prototype, "message", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], AnswerDTO.prototype, "statusCode", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], AnswerDTO.prototype, "data", void 0);
exports.AnswerDTO = AnswerDTO;
//# sourceMappingURL=answer.dto.js.map