import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { VersionableEntity } from '@cancerlog/api/core';
import { DoctorEntity } from './doctor.entity';

@Entity({ name: 'organizations' })
export class OrganizationEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190, nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  description!: string;

  @Column({ type: 'varchar', length: 190, nullable: false })
  type!: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  address?: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  phone?: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  email?: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  url?: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  logo?: string;

  @ManyToMany((type) => DoctorEntity, (member) => member.organizations, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'organization_members' })
  members!: DoctorEntity[];
}
