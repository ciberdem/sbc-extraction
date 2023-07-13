export declare class AnswerDTO<T> {
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
    constructor(message: string, statusCode?: number, data?: T);
}
