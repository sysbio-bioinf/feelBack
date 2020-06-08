import { Entity, Column } from 'typeorm';
import { VersionableEntity } from '@cancerlog/api/core';

@Entity('faqs', {})
export class FaqEntity extends VersionableEntity {
  @Column({ type: 'text', nullable: false })
  question!: string;

  @Column({ type: 'text', nullable: false })
  answer!: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isActive!: boolean;
}
