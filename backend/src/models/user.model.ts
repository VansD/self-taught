import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasMany, Unique, ForeignKey, DeletedAt } from 'sequelize-typescript';
import { Task } from './task.model';
import { Lesson } from './lesson.model';

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "User"
})

// order of InferAttributes & InferCreationAttributes is important.
export class User extends Model<User> {
  @ForeignKey(() => User)
  @Column({
    primaryKey: true,
    type: DataType.NUMBER
  })
  declare id: number;

  @Unique
  @Column({
    type: DataType.STRING
  })
  declare email: string

  @Column({
    type: DataType.STRING
  })
  declare password: string
  

  @Column({
    type: DataType.STRING
  })
  declare firstName: string

  @Column({
    type: DataType.STRING
  })
  declare middleName: string;

  @Column({
    type: DataType.STRING
  })
  declare lastName: string;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER
  })
  declare role: Role;

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

  // @UpdatedAt
  // declare updatedAt?: Date;

  @DeletedAt
  declare deletedAt?: Date;

  @HasMany(() => User)
  declare users: User[];

  @HasMany(() => Task, {
    foreignKey: "userId"
  })
  declare tasks: Task[];

  @HasMany(() => Lesson, {
    foreignKey: "userId"
  })
  declare lessons: Lesson[];
}






export enum Role {
    Admin = 0,
    Teacher = 1,
    Student = 2
}

// export default interface User extends RowDataPacket {
//   id?: number;
//   fisrtName: string;
//   middleName?: string;
//   lastName: string;
//   role: Role;
//   grade: string;
// }