"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomHelpers {
    static formatDate(str) {
        const data = new Date(str), dia = data.getDate().toString().padStart(2, '0'), mes = (data.getMonth() + 1).toString().padStart(2, '0'), ano = data.getFullYear();
        return dia + "/" + mes + "/" + ano;
    }
    static contains(array, value, options) {
        if (array && array.indexOf(value) !== -1) {
            return options.fn(this);
        }
        else {
            return options.inverse(this);
        }
    }
}
exports.default = CustomHelpers;
//# sourceMappingURL=hbsHelpers.js.map