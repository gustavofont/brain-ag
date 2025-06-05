import { Inject, Injectable } from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import Harvest from './entities/harvest.entity';

@Injectable()
export class HarvestService {
  constructor(
    @Inject('HARVEST_REPOSITORY') private harvestRepository: typeof Harvest,
  ) {}
  async create(createHarvestDto: CreateHarvestDto) {
    try {
      const res = await this.harvestRepository.create({
        year: createHarvestDto.year,
        culture: createHarvestDto.culture,
        farm: createHarvestDto.farm,
      });
      console.log(res);
      return 'deu certo';
    } catch (error) {
      console.log(error);
      return 'nao deu certo';
    }
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
