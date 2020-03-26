import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/_schema')
  getSchema(@Res() res: Response) {
    return res.download(
      path.join(
        process.cwd(),
        'apps',
        'feelback-identity',
        'src',
        'schema.gql',
      ),
      'schema.gql',
    );
  }
}
