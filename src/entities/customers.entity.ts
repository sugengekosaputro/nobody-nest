import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AccountsEntity } from './accounts.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'customers' })
export class CustomersEntity {
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

  @Index()
  @Column({ length: 15 })
  phoneNumber: string;

  @Column({ type: 'enum', enum: ['L', 'P'] })
  gender: string;

  @Column({ type: 'varchar', length: 61 })
  appPin: string;

  @OneToMany(() => AccountsEntity, (account) => account.customer)
  accounts: AccountsEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.customers)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  constructor() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
