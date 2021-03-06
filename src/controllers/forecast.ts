import { Controller, Get, ClassMiddleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Forecast } from '@src/services/forecast';
import { Beach } from '@src/models/beach';
import { AuthMiddleware } from '@src/middlewares/auth';
import logger from '@src/logger';
import { BaseController } from '.';
import ApiError from '@src/util/errors/api-error';

const forecast = new Forecast();

@Controller('forecast')
@ClassMiddleware(AuthMiddleware)
export class ForecastController extends BaseController {
  @Get('')
  public async getForecastForLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const beaches = await Beach.find({ user: req.decoded?.id });
      const forecastData = await forecast.processForecastForBeaches(beaches);
      res.status(200).send(forecastData);
    } catch (error) {
      this.sendErrorResponse(
        res,
        ApiError.format({ code: 500, message: 'Something went wrong' })
      );
    }
  }
}
