import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Producer from './entities/producer.entity';

@Module({
  imports: [SequelizeModule.forFeature([Producer])],
  controllers: [ProducerController],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
