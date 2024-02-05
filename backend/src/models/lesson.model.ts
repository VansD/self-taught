import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasMany, Unique, ForeignKey, DeletedAt } from 'sequelize-typescript';
import { Task } from './task.model';

@Table({
  timestamps: true,
  tableName: "lessons",
  modelName: "Lesson"
})

export class Lesson extends Model<Lesson> {
  @ForeignKey(() => Lesson)
  @Column({
    primaryKey: true,
    type: DataType.NUMBER
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER
  })
  declare userId: number;

  @Column({
    type: DataType.STRING
  })
  declare middleName: string;

  @Column({
    type: DataType.STRING
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING
  })
  declare grade: string;

  @Column({
    type: DataType.STRING
  })
  declare authToken: string

  @CreatedAt
  declare createdAt?: Date;

  @UpdatedAt
  declare updatedAt?: Date;

  @DeletedAt
  declare deletedAt?: Date;

  @HasMany(() => Lesson)
  declare users: Lesson[];

  @HasMany(() => Task)
  declare tasks: Task[];
}
