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
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Response } from 'express';

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  async create(@Res() res: Response, @Body() createFarmDto: CreateFarmDto) {
    const response = await this.farmService.create(createFarmDto);
    res.status(response.statusCode).send(response);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const response = await this.farmService.findAll();
    res.status(response.statusCode).send(response);
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const response = await this.farmService.findOne(+id);
    res.status(response.statusCode).send(response);
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateFarmDto: UpdateFarmDto,
  ) {
    const response = await this.farmService.update(+id, updateFarmDto);
    res.status(response.statusCode).send(response);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    const response = await this.farmService.remove(+id);
    res.status(response.statusCode).send(response);
  }
}
