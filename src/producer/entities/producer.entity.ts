import { Column, Model, Table } from 'sequelize-typescript';

@Table
export default class Producer extends Model {
  @Column
  name: string;

  @Column
  declare cpforcnpj: string;

  @Column
  createdat: string;

  @Column
  updatedat: string;

  // @HasMany(() => Post)
  // posts: Post[];
}
