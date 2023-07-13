"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExtractionModule = void 0;
const common_1 = require("@nestjs/common");
const extraction_controller_1 = require("./extraction.controller");
const extraction_service_1 = require("./extraction.service");
const nest_crawler_1 = require("nest-crawler");
let ApiExtractionModule = class ApiExtractionModule {
};
ApiExtractionModule = __decorate([
    common_1.Module({
        imports: [
            nest_crawler_1.NestCrawlerModule,
        ],
        providers: [extraction_service_1.ExtractionService],
        controllers: [extraction_controller_1.ApiExtractionController],
        exports: [extraction_service_1.ExtractionService]
    })
], ApiExtractionModule);
exports.ApiExtractionModule = ApiExtractionModule;
//# sourceMappingURL=extraction.module.js.map