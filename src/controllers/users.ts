import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '@src/models/user';
import { BaseController } from '.';

@Controller('users')
export class UsersController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const beach = new User(req.body);
      const result = await beach.save();

      res.status(201).send(result);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}
