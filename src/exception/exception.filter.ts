import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';
import { ResponseRestaurant } from "src/dto/response.dto";
import { MelpError } from "./melp.exception";

/**
 * This class intercept all the exceptions and giving them
 * a standard pattern.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    //MelpErro are controlled exception
    if (exception instanceof MelpError) {
      const error = exception as MelpError;
      response
        .status(status)
        .json({
          statusCode: error.httpStatus,
          error: error.typeError || 'Unknow',
          message: [error.message]
        } as ResponseRestaurant);
    } else if (exception instanceof BadRequestException) {//Validation Exception
      response
      .status(status)
      .json({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Data',
        message: exception?.getResponse()['message']
      } as ResponseRestaurant);
    } else { //Uncontrolled Exception
      response
        .status(status)
        .json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Unknow',
          message: [exception.message]
        } as ResponseRestaurant);
    }

  }
}