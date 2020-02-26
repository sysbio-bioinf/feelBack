import {
  ParseIntPipe as NestParseIntPipe,
  ArgumentMetadata,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CoreException } from '@cancerlog/api/core';

@Injectable()
export class ParseIntPipe extends NestParseIntPipe {
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    if (value === undefined) {
      return undefined;
    }

    try {
      return await super.transform(value, metadata);
    } catch (error) {
      throw new CoreException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          detail: 'Validation failed: numeric input expected',
          source: {
            pointer: `request.${metadata.type}.${metadata.data}`,
          },
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}
