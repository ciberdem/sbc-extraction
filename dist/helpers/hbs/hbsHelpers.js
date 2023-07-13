"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomHelpers {
    static formatDate(str) {
        const data = new Date(str), dia = data.getDate().toString().padStart(2, '0'), mes = (data.getMonth() + 1).toString().padStart(2, '0'), ano = data.getFullYear();
        return dia + "/" + mes + "/" + ano;
    }
}
exports.default = CustomHelpers;
//# sourceMappingURL=hbsHelpers.js.map