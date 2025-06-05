import Farm from '@src/farm/entities/farm.entity';
import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'producer',
})
export default class Producer extends Model {
  @Column
  name: string;

  @PrimaryKey
  @Column
  declare cpfOrCnpj: string;

  @HasMany(() => Farm)
  farms: Farm[];
}
