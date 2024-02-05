import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasMany, Unique, ForeignKey } from 'sequelize-typescript';
import { Lesson } from './lesson.model';

@Table({
  timestamps: true,
  tableName: "tasks",
  modelName: "Task"
})

// order of InferAttributes & InferCreationAttributes is important.
export class Task extends Model<Task> {
  @ForeignKey(() => Lesson)
  @Column({
    primaryKey: true,
    type: DataType.NUMBER
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare userId: number;

  @Column({
    type: DataType.STRING
  })
  declare title?: string
  

  @Column({
    type: DataType.STRING
  })
  declare text?: string

  @Column({
    type: DataType.INTEGER
  })
  declare score: number;

  @Column({
    type: DataType.STRING
  })
  declare imgUrl?: string;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER
  })
  declare taskType: TaskType;

  @Column({
    type: DataType.JSON
  })
  declare answers: string;

  @CreatedAt
  declare createdAt?: Date;

  @UpdatedAt
  declare updatedAt?: Date;
}

export enum TaskType {
    SingleAnswer = 0,
    MultipleAnswer = 1,
    TextAnswer = 2
}