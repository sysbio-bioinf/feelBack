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
  title!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  firstname!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  lastname!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  phone!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  email!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  url!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  picture!: string | null;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  lastLoginAt!: Date | null;

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
