import {
  ParseUUIDPipe as NestUUIDPipe,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import { CoreException } from '@cancerlog/api/core';

@Injectable()
export class ParseUUIDPipe extends NestUUIDPipe {
  constructor() {
    super({ version: '4' });
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    try {
      return super.transform(value, metadata);
    } catch (error) {
      throw new CoreException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          detail: 'Validation failed! (UUID v4 expected)',
          source: {
            pointer: `request.${metadata.type}.${metadata.data}`,
          },
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}
