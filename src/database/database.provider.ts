import { Sequelize } from 'sequelize-typescript';
import Producer from '@src/producer/entities/producer.entity';
import Farm from '@src/farm/entities/farm.entity';
import Harvest from '@src/harvest/entities/harvest.entity';

const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'brain_ag',
      });
      sequelize.addModels([Producer, Farm, Harvest]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

export default databaseProvider;
