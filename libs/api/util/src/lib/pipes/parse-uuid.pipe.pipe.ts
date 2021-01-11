import { ApiException } from '@feelback-app/api/errors';
import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  ParseUUIDPipe as NestUUIDPipe,
} from '@nestjs/common';

@Injectable()
export class ParseUUIDPipe extends NestUUIDPipe {
  constructor() {
    super({ version: '4' });
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      throw new ApiException(
        {
          title: 'Validation Exception',
          message: 'Validation failed: UUID v4 input excepted.',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}
