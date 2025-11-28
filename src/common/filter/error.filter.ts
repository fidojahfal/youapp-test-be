import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException, JsonWebTokenError)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else if (exception instanceof ZodError) {
      response.status(403).json({
        errors: 'Validation error!',
      });
    } else if (exception instanceof JsonWebTokenError) {
      response.status(401).json({
        errors: exception.message,
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
