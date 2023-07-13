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
exports.ManagerService = void 0;
const common_1 = require("@nestjs/common");
const extraction_service_1 = require("../../api/extraction/extraction.service");
const extraction_dto_1 = require("../../dto/models/extraction.dto");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let ManagerService = class ManagerService {
    constructor(extractorService) {
        this.extractorService = extractorService;
    }
    async searchBy(wordSearch) {
        return this.extractorService.getAll(wordSearch);
    }
};
ManagerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [extraction_service_1.ExtractionService])
], ManagerService);
exports.ManagerService = ManagerService;
//# sourceMappingURL=manager.service.js.map