import { Module } from '@nestjs/common';
import { NotifcationService } from './notifcation.service';
import { NotifcationController } from './notifcation.controller';

@Module({
  controllers: [NotifcationController],
  providers: [NotifcationService],
})
export class NotifcationModule {}
