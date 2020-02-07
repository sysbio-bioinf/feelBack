import { IdentifiableEntity } from './identifiable.entity';
import { VersionColumn } from 'typeorm';

export abstract class VersionableEntity extends IdentifiableEntity {
  @VersionColumn({ default: 1 })
  version: number;
}
