import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'producer',
})
export default class Producer extends Model {
  @Column
  name: string;

  @PrimaryKey
  @Column
  declare cpfOrCnpj: string;

  // @HasMany(() => Post)
  // posts: Post[];
}
