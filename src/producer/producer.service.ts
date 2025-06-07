import { Inject, Injectable } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import Producer from './entities/producer.entity';
import {
  validateProducerCreate,
  validateProducerUpdate,
} from '@src/utils/validations';
import { errorResponse, informationalResponse } from '@src/utils/HttpResponses';
import { HttpResponse } from '@src/utils/types';

function cpfOrCnpjFormatter(cpfOrCnpj: string) {
  return cpfOrCnpj.replace(/[^\d]/g, '');
}

@Injectable()
export class ProducerService {
  constructor(
    @Inject('PRODUCER_REPOSITORY') private producerRepository: typeof Producer,
  ) {}

  /**
   * Creates a new instance of Producer
   * @param createProducerDto Producer params
   * @returns HTTP Response
   */
  async create(createProducerDto: CreateProducerDto): Promise<HttpResponse> {
    // Data formatter
    createProducerDto.cpfOrCnpj = cpfOrCnpjFormatter(
      createProducerDto.cpfOrCnpj,
    );

    const validation = validateProducerCreate(createProducerDto);

    if (!validation.success) {
      return informationalResponse(400, validation.error.issues);
    }

    try {
      await this.producerRepository.create({
        name: createProducerDto.name,
        cpfOrCnpj: createProducerDto.cpfOrCnpj,
      });

      return informationalResponse(200, 'Producer registered !!!');
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  /**
   * Returns all producers
   * @returns HTTP Response
   */
  async findAll(): Promise<HttpResponse> {
    try {
      const response = await this.producerRepository.findAll();
      return informationalResponse(200, undefined, response);
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  /**
   * Retuns Producer data by Id
   * @param id Producer Id
   * @returns HTTP Response
   */
  async findOne(id: number): Promise<HttpResponse> {
    try {
      const response = await this.producerRepository.findOne({
        where: { id: id },
      });

      if (!response) {
        return informationalResponse(404, 'Producer Not Found');
      }

      return informationalResponse(200, undefined, response);
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  /**
   * Updates Producer Data
   * @param id Producer Id
   * @param updateProducerDto Data to be updated
   * @returns HTTP Response
   */
  async update(
    id: number,
    updateProducerDto: UpdateProducerDto,
  ): Promise<HttpResponse> {
    // Data formatter
    if (updateProducerDto.cpfOrCnpj) {
      updateProducerDto.cpfOrCnpj = cpfOrCnpjFormatter(
        updateProducerDto.cpfOrCnpj,
      );
    }

    const validation = validateProducerUpdate(updateProducerDto);

    if (!validation.success) {
      return informationalResponse(400, validation.error.issues);
    }

    try {
      await this.producerRepository.update(
        {
          name: updateProducerDto.name,
          cpfOrCnpj: updateProducerDto.cpfOrCnpj,
        },
        {
          where: { id: id },
        },
      );
      return informationalResponse(200, `Producer Updated !!!`);
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  /**
   * Deletes a Produce by id
   * @param id Producer id
   * @returns HTTP Response
   */
  async delete(id: number): Promise<HttpResponse> {
    try {
      await this.producerRepository.destroy({ where: { id: id } });
      return informationalResponse(200, 'Producer deleted');
    } catch (error) {
      return errorResponse(error, 500);
    }
  }
}
