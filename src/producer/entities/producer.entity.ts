import Farm from '@src/farm/entities/farm.entity';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'producer',
})
export default class Producer extends Model {
  @Column
  name: string;

  @Column
  declare cpfOrCnpj: string;

  @HasMany(() => Farm)
  farms: Farm[];
}
