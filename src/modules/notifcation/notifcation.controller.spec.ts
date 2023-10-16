import { Test, TestingModule } from '@nestjs/testing';
import { NotifcationController } from './notifcation.controller';
import { NotifcationService } from './notifcation.service';

describe('NotifcationController', () => {
  let controller: NotifcationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifcationController],
      providers: [NotifcationService],
    }).compile();

    controller = module.get<NotifcationController>(NotifcationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
