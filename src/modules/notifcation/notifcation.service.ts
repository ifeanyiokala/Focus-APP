import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './notification.model';
import { CreateNotifcationDto } from './dto/create-notifcation.dto';
import { UpdateNotifcationDto } from './dto/update-notifcation.dto';

@Injectable()
export class NotifcationService {
  constructor(
    @InjectModel('Notification') private readonly notificationModel: Model<Notification>,
  ) {}

  async getAllNotifications(): Promise<Notification[]> {
    return await this.notificationModel.find().exec();
  }
 
  async markNotificationAsRead( id: string): Promise< Notification > {
    return await this.notificationModel.findByIdAndUpdate(id, {isRead: true}, {new:true});

  }
  
  }
