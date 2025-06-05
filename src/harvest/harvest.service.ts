import { Injectable } from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';

@Injectable()
export class HarvestService {
  create(createHarvestDto: CreateHarvestDto) {
    return 'This action adds a new harvest';
  }

  findAll() {
    return `This action returns all harvest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} harvest`;
  }

  update(id: number, updateHarvestDto: UpdateHarvestDto) {
    return `This action updates a #${id} harvest`;
  }

  remove(id: number) {
    return `This action removes a #${id} harvest`;
  }
}
