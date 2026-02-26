import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'item',
})
export class ItemEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: ['FOUND', 'LOST'],
  })
  type: 'FOUND' | 'LOST';

  @Column({ type: String, length: 255 })
  title: string;

  @Column({ type: String, length: 1000 })
  description: string;

  @Column({ type: String })
  category: string;

  @Column({ type: 'simple-array' })
  images: string[];

  @Column({ type: 'timestamp' })
  foundLostDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  claimedAt: Date | null;

  @Column({ type: 'boolean', default: false })
  isClaimed: boolean;

  @Column({
    type: 'enum',
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
  })
  priority: 'LOW' | 'MEDIUM' | 'HIGH';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
