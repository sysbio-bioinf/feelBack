import { Controller, Get, NotFoundException, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { AppService } from './app.service';

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
      'feelback-identity',
      'src',
      'schema.gql',
    );

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Schema File not found');
    }

    return res.download(filePath, 'schema.gql');
  }
}
