import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { Response } from 'express';

@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createHarvestDto: CreateHarvestDto,
  ) {
    const response = await this.harvestService.create(createHarvestDto);
    res.status(response.statusCode).send(response);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const response = await this.harvestService.findAll();
    res.status(response.statusCode).send(response);
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const response = await this.harvestService.findOne(+id);
    res.status(response.statusCode).send(response);
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateHarvestDto: UpdateHarvestDto,
  ) {
    const response = await this.harvestService.update(+id, updateHarvestDto);
    res.status(response.statusCode).send(response);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    const response = await this.harvestService.remove(+id);
    res.status(response.statusCode).send(response);
  }
}
