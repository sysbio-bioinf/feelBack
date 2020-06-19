import {
  EC_VALIDATION_FAILED,
  ExceptionMessageModel,
} from '@cancerlog/api/errors';
import {
  ArgumentMetadata,
  Injectable,
  ParseUUIDPipe as NestUUIDPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ParseUUIDPipe extends NestUUIDPipe {
  constructor() {
    super({ version: '4' });
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    try {
      return super.transform(value, metadata);
    } catch (error) {
      throw new UnprocessableEntityException({
        title: 'Validation Exception',
        message: 'Validation failed: UUID v4 expected',
        code: EC_VALIDATION_FAILED.code,
        source: `request.${metadata.type}.${metadata.data}`,
      } as ExceptionMessageModel);
    }
  }
}
