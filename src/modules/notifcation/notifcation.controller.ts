import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifcationService } from './notifcation.service';
import { CreateNotifcationDto } from './dto/create-notifcation.dto';
import { UpdateNotifcationDto } from './dto/update-notifcation.dto';

@Controller('notifcation')
export class NotifcationController {
  constructor(private readonly notifcationService: NotifcationService) {}

  @Post()
  create(@Body() createNotifcationDto: CreateNotifcationDto) {
    return this.notifcationService.create(createNotifcationDto);
  }

  @Get()
  findAll() {
    return this.notifcationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notifcationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotifcationDto: UpdateNotifcationDto) {
    return this.notifcationService.update(+id, updateNotifcationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notifcationService.remove(+id);
  }
}
