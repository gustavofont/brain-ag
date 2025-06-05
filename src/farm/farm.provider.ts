import Farm from './entities/farm.entity';

const producerProvider = [
  {
    provide: 'FARM_REPOSITORY',
    useValue: Farm,
  },
];

export default producerProvider;
