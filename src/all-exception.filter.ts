import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggerService } from './logger/logger.service';
import { PrismaClientValidationError } from 'generated/prisma/runtime/library';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
};

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new LoggerService(AllExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseBody: MyResponseObj = {
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: '',
    };
    if (exception instanceof HttpException) {
      responseBody.statusCode = exception.getStatus();
      responseBody.message = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      responseBody.statusCode = HttpStatus.BAD_REQUEST;
      responseBody.message = exception.message.replaceAll('\n/g', ' ');
    } else {
      responseBody.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody.message = 'Internal server error';
    }
    response.status(responseBody.statusCode).json(responseBody);
    this.logger.error(responseBody.message, AllExceptionFilter.name);
    super.catch(exception, host);
  }
}
