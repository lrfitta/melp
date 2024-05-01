import { HttpException, HttpStatus } from "@nestjs/common";

export class MelpError extends HttpException {
  constructor(public message: string, public typeError: string, public httpStatus: HttpStatus) {
    super(message, httpStatus);
  }
}
