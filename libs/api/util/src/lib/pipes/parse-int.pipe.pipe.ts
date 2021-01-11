import { ApiException } from '@feelback-app/api/errors';
import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  ParseIntPipe as NestParseIntPipe,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe extends NestParseIntPipe {
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      throw new ApiException(
        {
          title: 'Validation Exception',
          message: 'Validation failed: Numeric input excepted.',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}
