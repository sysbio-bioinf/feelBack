import { Entity, Column } from 'typeorm';
import { VersionableEntity } from '@cancerlog/api/core';

@Entity({ name: 'instruments' })
export class InstrumentEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190 })
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  image: string;

  @Column({ type: 'json', nullable: false, default: {} })
  instrument: object; // TODO: can we better type this in order to use surveyjs models?
}
