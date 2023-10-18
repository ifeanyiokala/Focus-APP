import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifcationService } from './notifcation.service';
import { Notification } from "./notification.model"
import { CreateNotifcationDto } from './dto/create-notifcation.dto';
import { UpdateNotifcationDto } from './dto/update-notifcation.dto';
import { notifcation } from './entities/notifcation.entity';

@Controller('notifcation')
export class NotifcationController {
  constructor(private readonly notifcationService: NotifcationService) {}

  @Get()
  async getAllNotifications(): Promise<Notification[]> {
    return this.notifcationService.getAllNotifications();
  }

  @Patch('mark-read/id')
  async markNotificationAsRead(@Param('id') id: string): Promise<Notification> {
    return this.notifcationService.markNotificationAsRead(id);
  }
}
