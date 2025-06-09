import { Test, TestingModule } from '@nestjs/testing';
import { FarmService } from './farm.service';
import Farm from './entities/farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { farmMockData } from '@src/utils/mockData';

describe('FarmService', () => {
  let service: FarmService;
  let farmModel: typeof Farm;

  const mockFarmModel = {
    create: jest.fn(),
    findAll: jest
      .fn()
      .mockResolvedValueOnce(farmMockData.findAllMockResponse)
      .mockResolvedValueOnce(farmMockData.findAllMockResponseDashboard),
    findOne: jest.fn().mockRejectedValue(farmMockData.findOneMockResponse),
    update: jest.fn(),
    destroy: jest.fn(),
    // findByPk: jest.fn().mockResolvedValue(mockFarm),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        {
          provide: 'FARM_REPOSITORY',
          useValue: mockFarmModel,
        },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);
    farmModel = module.get<typeof Farm>('FARM_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Farm', () => {
    const createFarmDto = farmMockData.createFarmData as CreateFarmDto;

    it('Should send the right data', async () => {
      await service.create(createFarmDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(farmModel.create).toHaveBeenCalledWith({
        name: createFarmDto.name,
        city: createFarmDto.city,
        state: createFarmDto.state,
        fieldSize: createFarmDto.fieldSize,
        cultivableField: createFarmDto.cultivableField,
        vegetationField: createFarmDto.vegetationField,
        owner: createFarmDto.owner,
      });
    });

    it('Should return a Http Response', async () => {
      const response = await service.create(createFarmDto);

      expect(response).toEqual({
        statusCode: 200,
        message: 'Farm Registered !!',
      });
    });
  });

  describe('Create Farm with wrong Data', () => {
    it('Should return a Http Response with an error message and status 400', async () => {
      const response = await service.create(
        farmMockData.createFarmDataWrong as unknown as CreateFarmDto,
      );

      expect(response.statusCode).toEqual(400);
      expect(typeof response.message).toEqual('object');
    });
  });

  describe('Find all farms', () => {
    it('Should return a Http Response', async () => {
      const response = await service.findAll();

      expect(response.statusCode).toEqual(200);
      expect(typeof response.data).toEqual('object');
    });
  });

  // describe('Find farm by Id', () => {
  //   it('Should return a Http Response', async () => {
  //     const id = 1;
  //     const response = await service.findOne(id);

  //     // eslint-disable-next-line @typescript-eslint/unbound-method
  //     // expect(farmModel.findOne).toHaveBeenCalledWith({ where: { id: id } });

  //     expect(response.statusCode).toEqual(200);
  //     expect(typeof response.data).toEqual('object');
  //   });
  // });

  describe('Update farm by id', () => {
    it('Should return a Http Response', async () => {
      const id = 1;
      const response = await service.update(id, farmMockData.createFarmData);

      expect(response).toEqual({
        statusCode: 200,
        message: 'Farm register updated',
      });
    });
  });

  describe('Delete farm by id', () => {
    it('Should return a Http Response', async () => {
      const id = 1;
      const response = await service.remove(id);

      expect(response).toEqual({
        statusCode: 200,
        message: 'Farn register deleted !',
      });
    });
  });

  describe('Dashboard', () => {
    it('Should return a Http Response', async () => {
      const response = await service.dashboard();

      expect(response).toEqual({
        statusCode: 200,
        message: undefined,
        data: {
          totalFarms: 1,
          totalHectares: 10000,
          percentageByState: {
            'Sao Paulo': 100,
          },
          percentageByCultureByYear: {
            '2023': {
              Tomato: 100,
            },
            '2024': {
              Potato: 100,
            },
            '2025': {
              Potato: 100,
            },
          },
          percentageLandUse: {
            cultivable: 50,
            vegetation: 20,
            unused: 30,
          },
        },
      });
    });
  });
});
