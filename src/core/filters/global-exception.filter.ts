import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal Server Error' };

    // Handle different formats of exception messages
    let errorMessage: string | string[] | Record<string, any>;
    if (typeof exceptionResponse === 'string') {
      errorMessage = exceptionResponse; // String message
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      errorMessage = exceptionResponse['message'] || exceptionResponse; // Object or array
    } else {
      errorMessage = 'An unknown error occurred';
    }

    // Format the final error response
    response.status(status).json({
      statusCode: status,
      error: HttpStatus[status] || 'Error',
      message: errorMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
