"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor() {
        this.capitalize = (s) => {
            if (typeof s !== 'string')
                return '';
            return s.charAt(0).toUpperCase() + s.slice(1);
        };
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let message = exception instanceof common_1.HttpException
            ? exception.message
            : exception;
        let status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.BAD_REQUEST;
        if (message == 'Cannot GET /' || exception['status'] == '404')
            message = 'Caminho procurado não foi encontrado, verifique a url da requisição.';
        else if (message == 'Unauthorized')
            message = 'Acesso não autorizado, faça login para continuar.';
        else if (exception['response']) {
            if (exception['response'].statusCode)
                status = exception['response'].statusCode;
            if (typeof exception['response'].message == typeof {})
                message = this.capitalize(exception['response'].message.join(' e ').toLowerCase());
        }
        response.json({
            success: false,
            message: message,
            statusCode: exception['status'] || status
        });
    }
};
AllExceptionsFilter = __decorate([
    common_1.Catch()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=all-exceptions.filter.js.map