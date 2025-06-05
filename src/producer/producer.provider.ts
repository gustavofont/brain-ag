import Producer from './entities/producer.entity';

const producerProvider = [
  {
    provide: 'PRODUCER_REPOSITORY',
    useValue: Producer,
  },
];

export default producerProvider;
