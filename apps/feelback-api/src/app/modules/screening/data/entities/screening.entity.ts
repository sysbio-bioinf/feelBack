import { VersionableEntity } from '@cancerlog/api/core';
import { Entity, Column, ManyToOne, RelationId, Index } from 'typeorm';
import { InstrumentEntity } from '../../../instrument/data/entities/instrument.entity';
import { UserAgentModel } from '../models/user-agent.model';
import { PersonEntity } from '../../../person/data/entities/person.entity';

@Entity({ name: 'screenings' })
export class ScreeningEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190, nullable: false, unique: true })
  @Index({ unique: true })
  instanceId: string;

  @Column({ type: 'timestamp with time zone', nullable: false })
  collectedAt: Date;

  @Column({ type: 'varchar', length: 10, nullable: false })
  language: string;

  @Column({ type: 'json', nullable: false, default: {} })
  payload: object; // TODO better typings

  @Column({ type: 'json', nullable: false, default: [] })
  rules: object;

  @Column({ type: 'json', nullable: true })
  userAgent?: UserAgentModel;

  @Column({ type: 'boolean', nullable: true })
  isResolved: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true, default: null })
  resolvedAt: Date;

  @Column({ type: 'text', nullable: true })
  resolveComment: string;

  // relationships
  @ManyToOne(
    type => PersonEntity,
    person => person.screenings,
    {
      nullable: true,
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  person: PersonEntity;

  @ManyToOne(
    type => InstrumentEntity,
    instrument => instrument.screenings,
    {
      nullable: true,
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  instrument?: InstrumentEntity;

  @RelationId((screening: ScreeningEntity) => screening.instrument)
  _instrumentId?: string;
}
