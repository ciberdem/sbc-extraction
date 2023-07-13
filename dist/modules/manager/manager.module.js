"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerModule = void 0;
const common_1 = require("@nestjs/common");
const manager_service_1 = require("./manager.service");
const manager_controller_1 = require("./manager.controller");
const extraction_module_1 = require("../../api/extraction/extraction.module");
let ManagerModule = class ManagerModule {
};
ManagerModule = __decorate([
    common_1.Module({
        imports: [
            extraction_module_1.ApiExtractionModule
        ],
        providers: [manager_service_1.ManagerService],
        controllers: [manager_controller_1.ManagerController],
    })
], ManagerModule);
exports.ManagerModule = ManagerModule;
//# sourceMappingURL=manager.module.js.map