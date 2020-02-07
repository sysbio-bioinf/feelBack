import { VersionableEntity } from '@cancerlog/api/core';
import { Entity, Column, Index } from 'typeorm';

@Entity({ name: 'identites' })
export class IdentityEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190, unique: true, nullable: false })
  @Index({ unique: true })
  pseudonym: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  title: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  firstname: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  lastname: string;
}
