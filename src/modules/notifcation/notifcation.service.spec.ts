import { Test, TestingModule } from '@nestjs/testing';
import { NotifcationService } from './notifcation.service';

describe('NotifcationService', () => {
  let service: NotifcationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifcationService],
    }).compile();

    service = module.get<NotifcationService>(NotifcationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
