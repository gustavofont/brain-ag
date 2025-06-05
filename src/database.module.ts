import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Producer from '@src/producer/entities/producer.entity';
import Farm from './farm/entities/farm.entity';
import Harvest from './harvest/entities/harvest.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'brain_ag',
      models: [Producer, Farm, Harvest],
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule {}
