import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
@Catch(UnauthorizedException)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Check if the exception is specifically related to JWT (optional tag or message check)
    const customMessage = exception.getResponse() as Record<string, any>;

    if (
      customMessage?.message === 'Token is invalid or expired' || // Custom JWT message
      customMessage?.error === 'Unauthorized' // Or a specific JWT-related tag
    ) {
      // Format for JWT-related errors
      return response.status(401).json({
        statusCode: 401,
        message: 'Token is invalid or expired',
        error: 'Unauthorized',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    // For other UnauthorizedException instances, default behavior
    response.status(401).json({
      statusCode: 401,
      message: customMessage?.message || 'Unauthorized',
      error: 'Client Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
