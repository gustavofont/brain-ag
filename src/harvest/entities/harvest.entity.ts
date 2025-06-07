import Farm from '@src/farm/entities/farm.entity';
import {
  AutoIncrement,
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
  @AutoIncrement
  @Column
  declare id: number;

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
