import { Response } from 'express';
import mongoose from 'mongoose';
import { CUSTOM_VALIDATION } from '@src/models/user';

export abstract class BaseController {
  protected sendCreateUpdateErrorResponse(
    res: Response,
    error: mongoose.Error.ValidationError | Error
  ): void {
    if (error instanceof mongoose.Error.ValidationError) {
      const clientError = this.handleClientErrors(error);

      res
        .status(clientError.code)
        .send({ code: clientError.code, error: clientError.error });
    }
  }

  private handleClientErrors(
    error: mongoose.Error.ValidationError
  ): { code: number; error: string } {
    const duplicatedErrors = Object.values(error.errors).filter(
      (err) => err.kind == CUSTOM_VALIDATION.DUPLICATED
    );
    if (duplicatedErrors.length) {
      return { code: 409, error: error.message };
    }
    return { code: 422, error: error.message };
  }
}
