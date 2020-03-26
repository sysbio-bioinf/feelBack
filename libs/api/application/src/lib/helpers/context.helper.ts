import { ArgumentsHost } from '@nestjs/common';
import { HttpTypeEnum } from '../enums/http-type.enum';

export class ContextHelper {
  static determineHttpContext(host: ArgumentsHost): HttpTypeEnum {
    if (host.getArgs().length === 4) {
      return HttpTypeEnum.GRAPHQL;
    }

    return HttpTypeEnum.HTTP;
  }
}
