class AnswerDTO {
    constructor(message, statusCode = 200, data = undefined) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
}

module.exports = AnswerDTO;
