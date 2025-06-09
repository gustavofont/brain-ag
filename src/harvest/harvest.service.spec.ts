import { Test, TestingModule } from '@nestjs/testing';
import { HarvestService } from './harvest.service';
import Harvest from './entities/harvest.entity';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { harvestMockData } from '@src/utils/mockData';

describe('HarvestService', () => {
  let service: HarvestService;
  let harvestModel: typeof Harvest;

  const mockHarvestModel = {
    create: jest.fn(),
    findAll: jest.fn().mockResolvedValue(harvestMockData.findAllMockResponse),
    findOne: jest.fn().mockRejectedValue(harvestMockData.findOneMockResponse),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        {
          provide: 'HARVEST_REPOSITORY',
          useValue: mockHarvestModel,
        },
      ],
    }).compile();

    service = module.get<HarvestService>(HarvestService);
    harvestModel = module.get<typeof Harvest>('HARVEST_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Harvest', () => {
    const createHarvestDto =
      harvestMockData.createHarvestData as CreateHarvestDto;

    it('Should send the right data', async () => {
      await service.create(createHarvestDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(harvestModel.create).toHaveBeenCalledWith({
        year: createHarvestDto.year,
        culture: createHarvestDto.culture,
        farm: createHarvestDto.farm,
      });
    });

    it('Should return a Http Response', async () => {
      const response = await service.create(createHarvestDto);

      expect(response).toEqual({
        statusCode: 200,
        message: 'Harvest registered !',
      });
    });
  });

  describe('Create Harvest with wrong Data', () => {
    it('Should return a Http Response with an error message and status 400', async () => {
      const response = await service.create(
        harvestMockData.createHarvestDataWrong as unknown as CreateHarvestDto,
      );

      expect(response.statusCode).toEqual(400);
      expect(typeof response.message).toEqual('object');
    });
  });

  describe('Find all Harvests', () => {
    it('Should return a Http Response', async () => {
      const response = await service.findAll();

      expect(response.statusCode).toEqual(200);
      expect(typeof response.data).toEqual('object');
    });
  });

  // describe('Find harvest by Id', () => {
  //   it('Should return a Http Response', async () => {
  //     const id = 1;
  //     const response = await service.findOne(id);

  //     // eslint-disable-next-line @typescript-eslint/unbound-method
  //     // expect(harvestModel.findOne).toHaveBeenCalledWith({ where: { id: id } });

  //     expect(response.statusCode).toEqual(200);
  //     expect(typeof response.data).toEqual('object');
  //   });
  // });

  describe('Update Harvest by id', () => {
    it('Should return a Http Response', async () => {
      const id = 1;
      const response = await service.update(
        id,
        harvestMockData.createHarvestData,
      );

      expect(response).toEqual({
        statusCode: 200,
        message: 'Harvest register Updated !!',
      });
    });
  });

  describe('Delete Harvest by id', () => {
    it('Should return a Http Response', async () => {
      const id = 1;
      const response = await service.remove(id);

      expect(response).toEqual({
        statusCode: 200,
        message: 'Harvest register deleted !',
      });
    });
  });
});
