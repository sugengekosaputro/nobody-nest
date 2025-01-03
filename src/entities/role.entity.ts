import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  Index,
  DeleteDateColumn,
} from 'typeorm';
import { AdminEntity } from './admin.entity';
import { CustomersEntity } from './customers.entity';
import { v4 as uuidv4 } from 'uuid';
import { PermissionEntity } from './permission.entity';

export enum RoleType {
  internal = 'internal',
  public = 'public',
}

@Entity('roles')
export class RoleEntity {
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

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: RoleType })
  type: string;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions', //column name
    joinColumn: { name: 'role_id', referencedColumnName: 'id' }, //role_id is target column relation
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: PermissionEntity[];

  @OneToMany(() => CustomersEntity, (customer) => customer.role)
  customers: CustomersEntity[];

  @OneToMany(() => AdminEntity, (admin) => admin.role)
  admin: AdminEntity[];

  constructor() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
