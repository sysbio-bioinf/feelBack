import { VersionableEntity } from '@cancerlog/api/core';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  RelationId,
} from 'typeorm';
import { ScreeningEntity } from './screening.entity';
import { OrganizationEntity } from './organization.entity';

@Entity('persons', {})
export class PersonEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190, nullable: false, unique: true })
  @Index({ unique: true })
  pseudonym!: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive!: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  acceptedTOS!: boolean;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  acceptedTOSAt!: Date | null;

  @OneToMany((type) => ScreeningEntity, (screening) => screening.person)
  screenings!: ScreeningEntity[];

  @RelationId((person: PersonEntity) => person.screenings)
  _screenings!: string[];

  @ManyToMany(
    (type) => OrganizationEntity,
    (organization) => organization.persons,
  )
  organizations!: OrganizationEntity[];
}
