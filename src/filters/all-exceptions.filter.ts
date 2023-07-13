import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    capitalize = (s: string) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let message =
            exception instanceof HttpException
                ? exception.message
                : exception;
        let status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.BAD_REQUEST;

        if (message == 'Cannot GET /' || exception['status'] == '404') message = 'Caminho procurado não foi encontrado, verifique a url da requisição.'
        else if (message == 'Unauthorized') message = 'Acesso não autorizado, faça login para continuar.'
        else if (exception['response']) {
            if (exception['response'].statusCode) status = exception['response'].statusCode
            if (typeof exception['response'].message == typeof {}) message = this.capitalize(exception['response'].message.join(' e ').toLowerCase())
        }

        response.render(
            'pages/404',
            {
                fullBody: false
            }
        )

        // response.json({
        //     success: false,
        //     message: message,
        //     statusCode: exception['status'] || status
        // });
    }
}