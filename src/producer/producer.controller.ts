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
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Response } from 'express';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createProducerDto: CreateProducerDto,
  ) {
    const response = await this.producerService.create(createProducerDto);
    res.status(response.statusCode).send(response);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const response = await this.producerService.findAll();
    res.status(response.statusCode).send(response);
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const response = await this.producerService.findOne(+id);
    res.status(response.statusCode).send(response);
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    const response = await this.producerService.update(+id, updateProducerDto);
    res.status(response.statusCode).send(response);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    const response = await this.producerService.delete(+id);
    res.status(response.statusCode).send(response);
  }
}
