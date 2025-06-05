import { Inject, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import Farm from './entities/farm.entity';

@Injectable()
export class FarmService {
  constructor(@Inject('FARM_REPOSITORY') private farmRepository: typeof Farm) {}

  async create(createFarm: CreateFarmDto) {
    try {
      await this.farmRepository.create({
        name: createFarm.name,
        city: createFarm.city,
        state: createFarm.state,
        fieldSize: createFarm.fieldSize,
        cultivableField: createFarm.cultivableField,
        vegetationField: createFarm.vegetationField,
        owner: createFarm.owner,
      });
    } catch (error) {
      console.log(error);
      return 'deu erro';
    }
    return `Farm created`;
  }

  findAll() {
    return `This action returns all farm`;
  }

  findOne(id: number) {
    try {
      const res = this.farmRepository.findOne({ where: { id: id } });
      console.log(res);
      return 'deu certo';
    } catch (error) {
      return 'deu erro';
    }

    return `This action returns a #${id} farm`;
  }

  update(id: number, updateFarmDto: UpdateFarmDto) {
    return `This action updates a #${id} farm`;
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
