import { IdentifiableEntity } from './identifiable.entity';
import { VersionColumn, DeleteDateColumn } from 'typeorm';

export abstract class VersionableEntity extends IdentifiableEntity {
  @VersionColumn({ default: 1 })
  version!: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
