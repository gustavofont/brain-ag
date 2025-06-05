import { Column, Model, Table } from 'sequelize-typescript';

@Table
export default class Harvest extends Model {
  @Column
  year: number;

  @Column
  culture: string;

  @Column
  farm: number;

  @Column
  createdat: Date;

  @Column
  updatedat: Date;
}
