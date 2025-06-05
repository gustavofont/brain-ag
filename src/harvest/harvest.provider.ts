import Harvest from './entities/harvest.entity';

const harvestProvider = [
  {
    provide: 'HARVEST_REPOSITORY',
    useValue: Harvest,
  },
];

export default harvestProvider;
