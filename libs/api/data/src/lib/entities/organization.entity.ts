import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { VersionableEntity } from '@feelback-app/api/core';
import { DoctorEntity } from './doctor.entity';
import { PersonEntity } from './person.entity';

@Entity({ name: 'organizations' })
export class OrganizationEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190, nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  description!: string;

  @Column({ type: 'varchar', length: 190, nullable: false })
  type!: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  address!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  phone!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  email!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  url!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  logo!: string | null;

  @ManyToMany((type) => DoctorEntity, (member) => member.organizations, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'organization_members' })
  members!: DoctorEntity[];

  @ManyToMany((type) => PersonEntity, (person) => person.organizations, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'organization_persons' })
  persons!: PersonEntity[];
}
