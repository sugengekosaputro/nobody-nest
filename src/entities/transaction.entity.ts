import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AccountsEntity } from './accounts.entity';

@Entity('transactions')
export class TransactionEntity {
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

  @Index()
  @Column({ type: 'enum', enum: ['Debit', 'Credit'] })
  transactionType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  adminFee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  actualBalance: number; // Track the balance after the transaction

  @Column({ length: 255 })
  description: string;

  @ManyToOne(() => AccountsEntity, (account) => account.transactions)
  account: AccountsEntity; // The source account

  @Column({ nullable: true, length: 20 })
  destinationAccountNumber: string; // The account number of the destination

  @Column({ nullable: true, length: 10 })
  destinationCodeBank: string; // The bank code of the destination account

  constructor() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
