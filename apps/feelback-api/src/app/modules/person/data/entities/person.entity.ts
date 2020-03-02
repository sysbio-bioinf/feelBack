import { VersionableEntity } from '@cancerlog/api/core';
import { Entity, Column, Index, OneToMany } from 'typeorm';
import { ScreeningEntity } from '../../../screening/data/entities/screening.entity';

@Entity('persons', {})
export class PersonEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190, nullable: false, unique: true })
  @Index({ unique: true })
  pseudonym: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  acceptedTOS: boolean;

  @Column({
    type: 'timestamp with time zone',
    default: null,
    nullable: true,
  })
  acceptedTOSAt: Date;

  @OneToMany(
    type => ScreeningEntity,
    screenings => screenings.person,
  )
  screenings: ScreeningEntity[];
}
