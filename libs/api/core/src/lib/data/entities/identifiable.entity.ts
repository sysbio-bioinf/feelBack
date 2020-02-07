import { CoreEntity } from './core.entity';
import {
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Index
} from 'typeorm';

export abstract class IdentifiableEntity extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index({ unique: true })
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
