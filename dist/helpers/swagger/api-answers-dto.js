"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiAnswersDto = void 0;
const answer_dto_1 = require("../../dto/answer.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
exports.ApiAnswersDto = (model) => {
    return common_1.applyDecorators(swagger_1.ApiOkResponse({
        schema: {
            allOf: [
                { $ref: swagger_1.getSchemaPath(answer_dto_1.AnswerDTO) },
                {
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: swagger_1.getSchemaPath(model) },
                        },
                    },
                },
            ],
        },
    }));
};
//# sourceMappingURL=api-answers-dto.js.map