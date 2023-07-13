import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    capitalize: (s: string) => string;
    catch(exception: unknown, host: ArgumentsHost): void;
}
