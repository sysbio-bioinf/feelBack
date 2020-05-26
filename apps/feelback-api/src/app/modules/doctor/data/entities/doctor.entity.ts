import { Entity, Column, Index, ManyToMany } from 'typeorm';
import { VersionableEntity } from '@cancerlog/api/core';
import { OrganizationEntity } from '../../../organization/data/entities/organization.entity';

@Entity('doctors', {})
export class DoctorEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190, unique: true, nullable: false })
  @Index({ unique: true })
  keycloakId!: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  title?: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  firstname?: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  lastname?: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  url?: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  picture?: string;

  @Column({ type: 'timestamp with time zone', default: null, nullable: true })
  lastLoginAt?: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  acceptedTOS!: boolean;

  @Column({ type: 'json', nullable: false, default: {} })
  settings!: object;

  @ManyToMany(
    (type) => OrganizationEntity,
    (organization) => organization.members,
  )
  organizations!: OrganizationEntity[];
}
