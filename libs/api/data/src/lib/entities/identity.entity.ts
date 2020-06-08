import { VersionableEntity } from '@cancerlog/api/core';
import { Entity, Column, Index } from 'typeorm';

@Entity({ name: 'identities' })
export class IdentityEntity extends VersionableEntity {
  @Column({ type: 'varchar', length: 190, unique: true, nullable: false })
  @Index({ unique: true })
  pseudonym!: string;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  title!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  firstname!: string | null;

  @Column({ type: 'varchar', length: 190, nullable: true, default: null })
  lastname!: string | null;
}
