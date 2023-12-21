import { ApiProperty } from "@nestjs/swagger";

export class AnswerDTO<T> {
    @ApiProperty()
    success: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    data: T;

    constructor(message: string, statusCode = 200, data: T = undefined) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    };
}