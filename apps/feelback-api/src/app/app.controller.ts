import { Controller, Get, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import * as path from 'path';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('_schema')
  getSchema(@Res() res: Response) {
    const filePath = path.join(
      process.cwd(),
      'apps',
      'feelback-api',
      'src',
      'schema.gql',
    );

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Schema File not found');
    }

    return res.download(filePath, 'schema.gql');
  }
}
