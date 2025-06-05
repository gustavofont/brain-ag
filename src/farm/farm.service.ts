import { Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

@Injectable()
export class FarmService {
  private farms = [
    {
      id: 1,
      producerName: 'Gustavo Machado',
      farmName: 'GustFarm',
      city: 'Belem',
      state: 'Para',
      fieldSize: 10000,
      cultivableField: 9000,
      vegetationField: 1000,
    },
  ];

  create(createFarm: CreateFarmDto) {
    return `${createFarm.farmName} created`;
  }

  findAll() {
    return `This action returns all farm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farm`;
  }

  update(id: number, updateFarmDto: UpdateFarmDto) {
    return `This action updates a #${id} farm`;
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
