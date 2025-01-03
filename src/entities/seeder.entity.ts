import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('seeder')
export class SeederEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
