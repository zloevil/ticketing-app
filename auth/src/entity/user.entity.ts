import {
  Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  @Index({ unique: true })
  email: string;

  @Column({
    nullable: false,
  })
  @Exclude()
  hash: string;

  @Column({
    nullable: false,
  })
  @Exclude()
  salt: string;

  @Column({ default: true })
  @Exclude()
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  created: string;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updated: string;

  @Column({ default: false })
  @Exclude()
  isReadOnly: boolean;

  @Column({ default: false })
  @Exclude()
  isDeleted: boolean;
}
