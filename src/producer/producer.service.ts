import { Injectable } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { InjectModel } from '@nestjs/sequelize';
import Producer from './entities/producer.entity';

@Injectable()
export class ProducerService {
  constructor(@InjectModel(Producer) private producerEntity: typeof Producer) {}

  async create(createProducerDto: CreateProducerDto) {
    try {
      const res = await this.producerEntity.create({
        name: 'tenste 1',
        cpforcnpj: '22222222222',
      });

      console.log(res)

      return `Producer ${createProducerDto.name} Creeated !!!`;
    } catch (error) {
      console.log(error);
      return {
        erro: 'deu erro',
      };
    }
  }

  findAll() {
    return `This action returns all producer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producer`;
  }

  update(id: number, updateProducerDto: UpdateProducerDto) {
    return `This action updates a #${id} producer`;
  }

  remove(id: number) {
    return `This action removes a #${id} producer`;
  }
}
