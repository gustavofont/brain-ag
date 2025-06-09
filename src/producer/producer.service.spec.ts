import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import Producer from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { producerMockData } from '@src/utils/mockData';

describe('ProducerService', () => {
  let service: ProducerService;
  let producerModel: typeof Producer;

  const mockProducerModel = {
    create: jest.fn(),
    findAll: jest.fn().mockResolvedValue(producerMockData.findAllMockResponse),
    findOne: jest.fn().mockRejectedValue(producerMockData.findOneMockResponse),
    update: jest.fn(),
    destroy: jest.fn(),
    // findByPk: jest.fn().mockResolvedValue(mockProducer),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: 'PRODUCER_REPOSITORY',
          useValue: mockProducerModel,
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    producerModel = module.get<typeof Producer>('PRODUCER_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Producer', () => {
    const createProducerDto =
      producerMockData.createProducerData as CreateProducerDto;

    it('Should send the right data', async () => {
      await service.create(createProducerDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(producerModel.create).toHaveBeenCalledWith({
        name: createProducerDto.name,
        cpfOrCnpj: createProducerDto.cpfOrCnpj,
      });
    });

    it('Should return a Http Response', async () => {
      const response = await service.create(createProducerDto);

      expect(response).toEqual({
        statusCode: 200,
        message: 'Producer registered !!!',
      });
    });
  });

  describe('Create Producer with wrong Data', () => {
    it('Should return a Http Response with an error message and status 400', async () => {
      const response = await service.create(
        producerMockData.createProducerDataWrong as unknown as CreateProducerDto,
      );

      expect(response.statusCode).toEqual(400);
      expect(typeof response.message).toEqual('object');
    });
  });

  describe('Find all producers', () => {
    it('Should return a Http Response', async () => {
      const response = await service.findAll();

      expect(response.statusCode).toEqual(200);
      expect(typeof response.data).toEqual('object');
    });
  });

  // describe('Find producer by Id', () => {
  //   it('Should return a Http Response', async () => {
  //     const id = 1;
  //     const response = await service.findOne(id);

  //     // eslint-disable-next-line @typescript-eslint/unbound-method
  //     // expect(producerModel.findOne).toHaveBeenCalledWith({ where: { id: id } });

  //     expect(response.statusCode).toEqual(200);
  //     expect(typeof response.data).toEqual('object');
  //   });
  // });

  describe('Update Producer by id', () => {
    it('Should return a Http Response', async () => {
      const id = 1;
      const response = await service.update(
        id,
        producerMockData.createProducerData,
      );

      expect(response).toEqual({
        statusCode: 200,
        message: 'Producer Updated !!!',
      });
    });
  });

  describe('Delete priducer by id', () => {
    it('Should return a Http Response', async () => {
      const id = 1;
      const response = await service.delete(id);

      expect(response).toEqual({
        statusCode: 200,
        message: 'Producer deleted',
      });
    });
  });
});
