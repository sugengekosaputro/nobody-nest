import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CustomersEntity } from './customers.entity';
import { v4 as uuidv4 } from 'uuid';
import { TransactionEntity } from './transaction.entity';
import { AdminEntity } from "./admin.entity";

@Entity('accounts')
export class AccountsEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'uuid', unique: true, nullable: false })
  uuid: string;

  @Index()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Column({ unique: true, length: 20 })
  accountNumber: string;

  @Column({ length: 10 })
  codeBank: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'varchar', length: 61 })
  pin: string;

  @ManyToOne(() => CustomersEntity, (customer) => customer.accounts)
  customer: CustomersEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions: TransactionEntity[];

  constructor() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
