import Harvest from '@src/harvest/entities/harvest.entity';
import Producer from '@src/producer/entities/producer.entity';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'farm',
})
export default class Farm extends Model {
  @Column
  name: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  fieldSize: number;

  @Column
  cultivableField: number;

  @Column
  vegetationField: number;

  @Column
  @ForeignKey(() => Producer)
  owner: number;

  @BelongsTo(() => Producer)
  producer: Producer;

  @HasMany(() => Harvest)
  harvests: Harvest[];
}
