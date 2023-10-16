import { Injectable } from '@nestjs/common';
import { CreateNotifcationDto } from './dto/create-notifcation.dto';
import { UpdateNotifcationDto } from './dto/update-notifcation.dto';

@Injectable()
export class NotifcationService {
  create(createNotifcationDto: CreateNotifcationDto) {
    return 'This action adds a new notifcation';
  }

  findAll() {
    return `This action returns all notifcation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notifcation`;
  }

  update(id: number, updateNotifcationDto: UpdateNotifcationDto) {
    return `This action updates a #${id} notifcation`;
  }

  remove(id: number) {
    return `This action removes a #${id} notifcation`;
  }
}
