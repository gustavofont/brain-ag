import { Inject, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import Farm from './entities/farm.entity';
import { validateFarmCreate, validateFarmUpdate } from '@src/utils/validations';
import { errorResponse, informationalResponse } from '@src/utils/HttpResponses';
import { HttpResponse } from '@src/utils/types';
import Harvest from '@src/harvest/entities/harvest.entity';
import { farmStatistics } from './farmUtils';

/**
 * Validates farm fields entries
 * @param createFarmDto Farm entries
 * @returns Validation Boolean
 */
function validateFarmField(createFarmDto: CreateFarmDto) {
  if (
    createFarmDto.cultivableField + createFarmDto.vegetationField >
    createFarmDto.fieldSize
  ) {
    return false;
  }
  return true;
}
@Injectable()
export class FarmService {
  constructor(@Inject('FARM_REPOSITORY') private farmRepository: typeof Farm) {}

  /**
   * Creates a new instance of Farm
   * @param createFarmDto Farm params
   * @returns HTTP Response
   */
  async create(createFarmDto: CreateFarmDto): Promise<HttpResponse> {
    if (!validateFarmField(createFarmDto)) {
      return informationalResponse(
        400,
        'Field validation error: sum of cultivableField and vegetationField is greater than fieldSize',
      );
    }

    const validation = validateFarmCreate(createFarmDto);

    if (!validation.success) {
      return informationalResponse(400, validation.error.issues);
    }

    try {
      await this.farmRepository.create({
        name: createFarmDto.name,
        city: createFarmDto.city,
        state: createFarmDto.state,
        fieldSize: createFarmDto.fieldSize,
        cultivableField: createFarmDto.cultivableField,
        vegetationField: createFarmDto.vegetationField,
        owner: createFarmDto.owner,
      });

      return informationalResponse(200, 'Farm Registered !!');
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  /**
   * Rreturns all Farms
   * @returns HTTP Response
   */
  async findAll(): Promise<HttpResponse> {
    try {
      const response = await this.farmRepository.findAll();
      return informationalResponse(200, undefined, response);
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  /**
   * Returns Farm data by uid
   * @param id Farm id
   * @returns HTTP Response
   */
  async findOne(id: number): Promise<HttpResponse> {
    try {
      const response = await this.farmRepository.findOne({ where: { id: id } });

      if (!response) {
        return informationalResponse(404, 'Farm Not Found');
      }

      return informationalResponse(200, undefined, response);
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  /**
   * Updates Farm by Id
   * @param id Farm Id
   * @param updateFarmDto Data to be updated
   * @returns HTTP Response
   */
  async update(
    id: number,
    updateFarmDto: UpdateFarmDto,
  ): Promise<HttpResponse> {
    const validation = validateFarmUpdate(updateFarmDto);

    if (!validation.success) {
      return informationalResponse(400, validation.error.issues);
    }

    try {
      await this.farmRepository.update(
        {
          name: updateFarmDto.name,
          city: updateFarmDto.city,
          state: updateFarmDto.state,
          fieldSize: updateFarmDto.fieldSize,
          cultivableField: updateFarmDto.cultivableField,
          vegetationField: updateFarmDto.vegetationField,
          owner: updateFarmDto.owner,
        },
        { where: { id: id } },
      );

      return informationalResponse(200, 'Farm register updated');
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  /**
   * Delete farm by Id
   * @param id Farm Id
   * @returns HTTP Response
   */
  async remove(id: number): Promise<HttpResponse> {
    try {
      await this.farmRepository.destroy({ where: { id: id } });

      return informationalResponse(200, 'Farn register deleted !');
    } catch (error) {
      return errorResponse(error, 500);
    }
  }

  async dashboard(): Promise<HttpResponse> {
    try {
      const farms = await this.farmRepository.findAll({
        include: [{ model: Harvest }],
      });

      const data = farmStatistics(farms as any);

      return informationalResponse(200, undefined, data);
    } catch (error) {
      return errorResponse(error, 500);
    }
  }
}
