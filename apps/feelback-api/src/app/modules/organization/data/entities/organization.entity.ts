import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { VersionableEntity } from '@cancerlog/api/core';
import { DoctorEntity } from '../../../doctor/data/entities/doctor.entity';

@Entity({ name: 'organizations' })
export class OrganizationEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 190 })
  type: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  logo: string;

  @ManyToMany(
    type => DoctorEntity,
    member => member.organizations,
    {
      cascade: true,
      onDelete: 'CASCADE'
    }
  )
  @JoinTable({ name: 'organization_members' })
  members: DoctorEntity[];
}
