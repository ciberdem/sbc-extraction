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
exports.ManagerController = void 0;
const common_1 = require("@nestjs/common");
const manager_service_1 = require("./manager.service");
const swagger_1 = require("@nestjs/swagger");
const form_dto_1 = require("../../dto/models/form.dto");
let ManagerController = class ManagerController {
    constructor(service) {
        this.service = service;
    }
    index(res) {
        res.render('pages/modules/extraction/search');
    }
    async postSearch(req, res) {
        const forms = req.body;
        const results = await this.service.searchBy(forms);
        res.render('pages/modules/extraction/search', { results, forms });
    }
    getHome() {
        return {};
    }
};
__decorate([
    common_1.Get('/'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "index", null);
__decorate([
    common_1.Post('/'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManagerController.prototype, "postSearch", null);
__decorate([
    common_1.Get('dashboard'),
    common_1.Render('pages/modules/dashboard/dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "getHome", null);
ManagerController = __decorate([
    swagger_1.ApiTags('Views'),
    common_1.Controller(),
    __metadata("design:paramtypes", [manager_service_1.ManagerService])
], ManagerController);
exports.ManagerController = ManagerController;
//# sourceMappingURL=manager.controller.js.map