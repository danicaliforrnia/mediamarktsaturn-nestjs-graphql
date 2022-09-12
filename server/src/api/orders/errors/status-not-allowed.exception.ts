import { HttpException, HttpStatus } from '@nestjs/common';

export class StatusNotAllowedException extends HttpException {
    constructor() {
        super(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                errorCode: 'orders-002',
                message: 'Status Not Allowed',
                error: 'Bad Request',
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}
