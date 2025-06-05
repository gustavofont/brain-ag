import { Column, Model, Table } from 'sequelize-typescript';

@Table
export default class Farm extends Model {
  @Column
  producerName: string;
  @Column
  farmName: string;
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
}
