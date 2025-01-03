import {
  Column,
  DeleteDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RoleEntity } from './role.entity';

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'uuid', unique: true, nullable: false })
  uuid: string;

  @Index()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Index()
  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 61 })
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.admin)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  constructor() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
