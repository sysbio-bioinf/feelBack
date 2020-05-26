import { VersionableEntity } from '@cancerlog/api/core';
import { Column, Entity, OneToMany, RelationId } from 'typeorm';
import { ScreeningEntity } from './screening.entity';
import { RuleEntity } from './rule.entity';

@Entity({ name: 'instruments' })
export class InstrumentEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190 })
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ type: 'varchar', length: 190, nullable: false })
  type: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  image: string;

  @Column({ type: 'json', nullable: false, default: {} })
  payload: object; // TODO: can we better type this in order to use surveyjs models?

  @Column({ type: 'json', nullable: false, default: [] })
  rules: RuleEntity[];

  @Column({ type: 'json', nullable: false, default: {} })
  diagram: object; // TODO: maybe we can have a better typing for this?

  @Column({ type: 'text', nullable: false, default: '' })
  changelog: string;

  @Column({ type: 'text', nullable: false, default: '' })
  xState: string; // the serialized xState object

  // relationships
  @OneToMany((type) => ScreeningEntity, (screening) => screening.instrument, {
    onDelete: 'SET NULL',
  })
  screenings: ScreeningEntity[];

  @RelationId((instrument: InstrumentEntity) => instrument.screenings)
  _screenings: string[];
}
