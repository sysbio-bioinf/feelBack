import {
  EC_VALIDATION_FAILED,
  ExceptionMessageModel,
} from '@cancerlog/api/errors';
import {
  ArgumentMetadata,
  Injectable,
  ParseIntPipe as NestParseIntPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe extends NestParseIntPipe {
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    try {
      return super.transform(value, metadata);
    } catch (error) {
      throw new UnprocessableEntityException({
        title: 'Validation Exception',
        message: 'Validation failed: numeric input excepted',
        code: EC_VALIDATION_FAILED.code,
        source: `request.${metadata.type}.${metadata.data}`,
      } as ExceptionMessageModel);
    }
  }
}
