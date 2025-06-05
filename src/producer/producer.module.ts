import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { DatabaseModule } from '@src/database/database.module';
import producerProvider from './producer.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ProducerController],
  providers: [ProducerService, ...producerProvider],
  exports: [ProducerService],
})
export default class ProducerModule {}
