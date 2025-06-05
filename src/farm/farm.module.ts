import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { DatabaseModule } from '@src/database/database.module';
import farmProvider from './farm.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FarmController],
  providers: [FarmService, ...farmProvider],
  exports: [FarmService],
})
export default class FarmModule {}
