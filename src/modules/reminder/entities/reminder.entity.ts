// src/reminders/reminder.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Task } from 'src/modules/tasks/entities/task.entity';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reminderDate: Date;

  @ManyToOne(() => Task, task => task.reminders)
  @JoinColumn({ name: 'task_id' })
  task: Task;
}
