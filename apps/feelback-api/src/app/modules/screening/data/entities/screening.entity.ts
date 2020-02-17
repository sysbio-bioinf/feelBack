import { VersionableEntity } from '@cancerlog/api/core';
import { Entity, Column, ManyToOne, RelationId } from 'typeorm';
import { InstrumentEntity } from '../../../instrument/data/entities/instrument.entity';
import { UserAgentModel } from './models/user-agent.model';

@Entity({ name: 'screenings' })
export class ScreeningEntity extends VersionableEntity {
  @Column({ type: 'timestamp with time zone', nullable: false })
  collectedAt: Date;

  @Column({ type: 'varchar', length: 10, nullable: false })
  language: string;

  @Column({ type: 'json', nullable: false, default: {} })
  payload: object; // TODO better typings

  @Column({ type: 'json', nullable: true })
  userAgent?: UserAgentModel;

  // relationships
  // @ManyToOne(
  //   type => PersonEntity,
  //   person => person.screenings,
  //   {
  //     nullable: true,
  //     cascade: true,
  //     onDelete: 'SET NULL'
  //   }
  // )
  // person: PersonEntity;

  @ManyToOne(
    type => InstrumentEntity,
    instrument => instrument.screenings,
    {
      nullable: true,
      cascade: true,
      onDelete: 'SET NULL'
    }
  )
  instrument?: InstrumentEntity;

  @RelationId((screening: ScreeningEntity) => screening.instrument)
  _instrumentId?: string;
}
