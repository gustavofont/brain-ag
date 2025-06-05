import { Test, TestingModule } from '@nestjs/testing';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';

describe('HarvestController', () => {
  let controller: HarvestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [HarvestService],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
