import { RoleUser } from "../enums/RoleUser";

export enum TaskType {
  "Одиночный ответ" = 0,
  "Несколько ответов" = 1,
  "Текстовый ответ" = 2
}


export interface ITask {
  id: number;
  title: string;
  text: string;
  type: TaskType;
  score: number;
  imgUrl?: string;
  userId: number; 
  answers: IAnswer[];
}

export interface IAnswer {
  id: number;
  text?: string;
  imgUrl?: string;
  isRight: boolean;
}

export interface ITaskCreateRequest {

}

export interface ITaskListRequest {
  page: number;
  pageLimit: number;
}

export interface ITaskListResponse {
  rows: ITask[];
  count: number;
}
