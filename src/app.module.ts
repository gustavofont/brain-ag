import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import ProducerModule from './producer/producer.module';
import FarmModule from './farm/farm.module';
import { HarvestModule } from './harvest/harvest.module';

@Module({
  imports: [ProducerModule, FarmModule, HarvestModule],
  controllers: [AppController],
})
export class AppModule {}
