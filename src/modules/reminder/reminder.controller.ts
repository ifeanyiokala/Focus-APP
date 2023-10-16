import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { parse } from 'path';




@Controller('reminder')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Post('id')
  createReminder(@Param('id') id: string, @Body() body:{ remindAt: Date}): string {
    const parsedTaskId = parseInt(id, 10);
    const { remindAt } = body;
    this.reminderService.createReminder(parsedTaskId, remindAt);
    return 'Reminder set for task ${parsedTaskId} at ${remindAt}';

  }

  @Get('id')
  getReminder(@Param('id') id: string): Date {
    const parsedTaskId = parseInt(id, 10); 
    return this.reminderService.getReminder(parsedTaskId);
  }



  @Put('id/update')
  updateReminder(@Param('id') id: string, @Body() body: {remindAt: Date }): string { 
    const parsedTaskId = parseInt(id, 10); 
    const { remindAt } = body; 
    this.reminderService.updateReminder(parsedTaskId, remindAt);
    return 'Reminder for task ${parsedTaskId} updated to ${remindAt}.';

  }

  @Delete('id/delete')
  clearReminder(@Param('id') id: string): string {
    const parsedTaskId = parseInt(id, 10);
    this.reminderService.clearReminder(parsedTaskId);
    return " Return for task ${parsedTaskId} deleted.";
  }
}
