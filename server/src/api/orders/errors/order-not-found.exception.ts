import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotFoundException extends HttpException {
    constructor() {
        super(
            {
                statusCode: HttpStatus.NOT_FOUND,
                errorCode: 'orders-001',
                message: 'Order Not Found',
                error: 'Not Found',
            },
            HttpStatus.NOT_FOUND,
        );
    }
}
