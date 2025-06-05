import { Module } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { HarvestController } from './harvest.controller';

@Module({
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
