import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Task } from '../tasks/entities/task.entity';


@Injectable()
export class ReminderService {
  private reminders: Map<number, Date> = new Map();

  createReminder(id: number, reminderAt: Date): void {
    this.reminders.set(id, reminderAt);
  }

  updateReminder(id: number, remindAt: Date): void {
    if (!this.reminders.has(id)) {
      throw new NotFoundException('Reminder for task with ID ${id} not found.');
    }
    this.reminders.set(id, remindAt);
  }
  
  getReminder(id: number): Date {
    return this.reminders.get(id);
  }

  clearReminder(id: number): void {
    this.reminders.delete(id);
  }
}
