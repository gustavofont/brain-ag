import { Test, TestingModule } from '@nestjs/testing';
import { FarmService } from './farm.service';
import Farm from './entities/farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';

describe('FarmService', () => {
  let service: FarmService;
  let farmModel: typeof Farm;

  const createFarmData: CreateFarmDto = {
    name: 'Cambota Farm',
    city: 'Belem',
    state: 'Para',
    fieldSize: 20000,
    cultivableField: 7000,
    vegetationField: 5000,
    owner: 1,
  };

  const createFarmDataWrong = {
    name: 'Cambota Farm',
    city: 'Belem',
    state: 'Para',
    fieldSize: 20000,
    cultivableField: 7000,
    vegetationField: 5000,
    ownerr: 1,
  };

  const findAllMockResponse = [
    {
      id: 1,
      name: 'Venus Farm',
      city: 'Sao Paulo',
      state: 'Sao Paulo',
      fieldSize: 10000,
      cultivableField: 5000,
      vegetationField: 2000,
      owner: 1,
      createdAt: '2025-06-06T18:49:19.688Z',
      updatedAt: '2025-06-06T22:45:51.449Z',
    },
  ];

  const farmFromDb = {
    id: 1,
    name: 'Venus Farm',
    city: 'Sao Paulo',
    state: 'Sao Paulo',
    fieldSize: 10000,
    cultivableField: 5000,
    vegetationField: 2000,
    owner: 1,
    createdAt: '2025-06-06T18:49:19.688Z',
    updatedAt: '2025-06-06T22:45:51.449Z',
  };

  const farmsForDashboard = [
    {
      dataValues: {
        id: 1,
        name: 'Venus Farm',
        city: 'Sao Paulo',
        state: 'Sao Paulo',
        fieldSize: 10000,
        cultivableField: 5000,
        vegetationField: 2000,
        owner: 1,
        createdAt: '2025-06-06T18:49:19.688Z',
        updatedAt: '2025-06-06T22:45:51.449Z',
        harvests: [
          {
            dataValues: {
              id: 1,
              year: 2025,
              culture: 'Potato',
              farm: 1,
              createdAt: '2025-06-07T20:20:42.996Z',
              updatedAt: '2025-06-07T20:20:42.996Z',
            },
          },
          {
            dataValues: {
              id: 4,
              year: 2024,
              culture: 'Potato',
              farm: 1,
              createdAt: '2025-06-07T20:27:55.461Z',
              updatedAt: '2025-06-07T20:27:55.461Z',
            },
          },
          {
            dataValues: {
              id: 7,
              year: 2023,
              culture: 'Tomato',
              farm: 1,
              createdAt: '2025-06-07T20:28:24.429Z',
              updatedAt: '2025-06-07T20:28:24.429Z',
            },
          },
        ],
      },
    },
  ];

  const mockFarmModel = {
    create: jest.fn(),
    findAll: jest
      .fn()
      .mockResolvedValueOnce(findAllMockResponse)
      .mockResolvedValueOnce(farmsForDashboard),
    findOne: jest.fn().mockRejectedValue(farmFromDb),
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
    it('Should send the right data', async () => {
      await service.create(createFarmData);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(farmModel.create).toHaveBeenCalledWith({
        name: createFarmData.name,
        city: createFarmData.city,
        state: createFarmData.state,
        fieldSize: createFarmData.fieldSize,
        cultivableField: createFarmData.cultivableField,
        vegetationField: createFarmData.vegetationField,
        owner: createFarmData.owner,
      });
    });

    it('Should return a Http Response', async () => {
      const response = await service.create(createFarmData);

      expect(response).toEqual({
        statusCode: 200,
        message: 'Farm Registered !!',
      });
    });
  });

  describe('Create Farm with wrong Data', () => {
    it('Should return a Http Response with an error message and status 400', async () => {
      const response = await service.create(
        createFarmDataWrong as unknown as CreateFarmDto,
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
      const response = await service.update(id, createFarmData);

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
