import { Inject, Injectable } from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import Harvest from './entities/harvest.entity';
import {
  validateHarvestCreate,
  validateHarvestUpdate,
} from '@src/utils/validations';
import { errorResponse, informationalResponse } from '@src/utils/HttpResponses';

@Injectable()
export class HarvestService {
  constructor(
    @Inject('HARVEST_REPOSITORY') private harvestRepository: typeof Harvest,
  ) {}

  /**
   * Creates a new instance of Harvest
   * @param createHarvestDto parms of new harvest
   * @returns HTTP Response
   */
  async create(createHarvestDto: CreateHarvestDto) {
    const validation = validateHarvestCreate(createHarvestDto);

    if (!validation.success) {
      return informationalResponse(400, validation.error.issues);
    }

    try {
      const res = await this.harvestRepository.create({
        year: createHarvestDto.year,
        culture: createHarvestDto.culture,
        farm: createHarvestDto.farm,
      });
      console.log(res);
      return informationalResponse(200, 'Harvest registered !');
    } catch (error) {
      console.log(error);
      return errorResponse(error, 500);
    }
    return 'This action adds a new harvest';
  }

  /**
   * Returns all instances of Harvest
   * @returns HTTP Response
   */
  async findAll() {
    try {
      const response = await this.harvestRepository.findAll();
      return informationalResponse(200, undefined, response);
    } catch (error) {
      errorResponse(error, 500);
    }
  }

  /**
   * Returns Harvest instance by Id
   * @param id Harvest Id
   * @returns HTTP Response
   */
  async findOne(id: number) {
    try {
      const response = await this.harvestRepository.findOne({
        where: { id: id },
      });

      if (!response) {
        return informationalResponse(404, 'Harvest Not Found');
      }

      return informationalResponse(200, undefined, response);
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  /**
   * Update Harvest instance
   * @param id Harvest Id
   * @param updateHarvestDto Data to be updated
   */
  async update(id: number, updateHarvestDto: UpdateHarvestDto) {
    const validation = validateHarvestUpdate(updateHarvestDto);

    if (!validation.success) {
      informationalResponse(400, validation.error.issues);
    }
    try {
      await this.harvestRepository.update(
        {
          year: updateHarvestDto.year,
          culture: updateHarvestDto.culture,
          farm: updateHarvestDto.farm,
        },
        { where: { id: id } },
      );

      return informationalResponse(200, 'Harvest register Updated !!');
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  async remove(id: number) {
    try {
      await this.harvestRepository.destroy({ where: { id: id } });

      return informationalResponse(200, 'Harvest register deleted !');
    } catch (error) {
      errorResponse(error, 500);
    }
  }
}
