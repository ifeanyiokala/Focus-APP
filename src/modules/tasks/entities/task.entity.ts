// src/tasks/task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  reminders: any 

  @Column()
  dueDate : Date;

  @Column()
  priority: string;

  @Column()
  status: Array<string>;

  @Column()
  category_id: string;

  @Column()
  categories: Array<string>;

  @Column()
  sharedWith: Array<string>;


  // Add more fields like dueDate, priority, etc. as needed

  @ManyToOne(() => User, user => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
