import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UsersEmailExistsError } from '../erros';
import { Response } from 'express';

@Catch(UsersEmailExistsError)
export class UsersEmailExistsErrorFilter implements ExceptionFilter {
  catch(exception: UsersEmailExistsError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      message: exception.message,
    });
  }
}
