import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { PasswordsAreNotEqualError } from '../erros';
import { Response } from 'express';

export class PasswordsAreNotEqualFilter implements ExceptionFilter {
  catch(exception: PasswordsAreNotEqualError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(401).json({
      statusCode: 401,
      message: exception.message,
    });
  }
}
