import { OrganizationEntity } from './organization.entity';
import { VersionableEntity } from '@cancerlog/api/core';
import { Column, Entity, Index, ManyToMany } from 'typeorm';

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

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  phone?: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  email?: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  url?: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  picture?: string;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
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
