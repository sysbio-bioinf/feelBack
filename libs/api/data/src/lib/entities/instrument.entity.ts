import { VersionableEntity } from '@cancerlog/api/core';
import { Column, Entity, OneToMany, RelationId } from 'typeorm';
import { ScreeningEntity } from './screening.entity';
import { RuleClass } from '../classes/rule.class';
import { DiagramClass } from '../classes/diagram.class';

@Entity({ name: 'instruments' })
export class InstrumentEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190 })
  name!: string;

  @Column({ type: 'text', nullable: false })
  description!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: false })
  type!: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  image!: string | null;

  @Column({ type: 'json', nullable: false, default: {} })
  payload!: object; // TODO: can we better type this in order to use surveyjs models?

  @Column({ type: 'json', nullable: false, default: [] })
  rules!: RuleClass[];

  @Column({ type: 'json', nullable: false, default: {} })
  diagram!: DiagramClass;

  @Column({ type: 'text', nullable: false, default: '' })
  changelog!: string;

  @Column({ type: 'text', nullable: true, default: null })
  xState!: string | null; // the serialized xState object

  // relationships
  @OneToMany((type) => ScreeningEntity, (screening) => screening.instrument, {
    onDelete: 'SET NULL',
  })
  screenings!: ScreeningEntity[];

  @RelationId((instrument: InstrumentEntity) => instrument.screenings)
  _screenings!: string[];
}
