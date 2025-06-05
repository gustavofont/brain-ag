import Farm from '@src/farm/entities/farm.entity';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'harvest',
})
export default class Harvest extends Model {
  @PrimaryKey
  @Column
  year: number;

  @PrimaryKey
  @Column
  culture: string;

  @ForeignKey(() => Farm)
  @Column
  farm: number;

  @BelongsTo(() => Farm)
  FarmId: Farm;
}
