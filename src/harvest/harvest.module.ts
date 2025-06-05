import { Module } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { HarvestController } from './harvest.controller';
import { DatabaseModule } from '@src/database/database.module';
import harvestProvider from './harvest.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [HarvestController],
  providers: [HarvestService, ...harvestProvider],
  exports: [HarvestService],
})
export class HarvestModule {}
