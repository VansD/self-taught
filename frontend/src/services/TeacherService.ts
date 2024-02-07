import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { ITask, ITaskListRequest, ITaskListResponse } from '../store/models/ITask';
import { RootState } from '../store/store';

export const teacherApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_ENDPOINT}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      let token = (getState() as RootState).auth?.authToken || localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
    }
  }),
  reducerPath: "teacherApi",
  endpoints: (builder) => ({
    createTask: builder.mutation<ITask, ITask>({
      query: (taskModel) => ({
        url: '/api/teacher/tasks',
        method: 'POST',
        body: taskModel,
        credentials: 'same-origin'
      }),
    }),
    updateTask: builder.mutation<ITask, ITask>({
      query: (taskModel) => ({
        url: `/api/teacher/tasks/${taskModel.id}`,
        method: 'PUT',
        body: taskModel,
        credentials: 'same-origin'
      }),
    }),
    getTask: builder.mutation<ITask, number>({
      query: (taskId) => ({
        url: `/api/teacher/tasks/${taskId}`,
        method: 'GET',
        credentials: 'same-origin'
      }),
    }),
    getTasks: builder.mutation<ITaskListResponse, ITaskListRequest>({
      query: (model) => ({
        url: `/api/teacher/tasks?page=${model.page}&pageLimit=${model.pageLimit}`,
        method: 'GET',
        credentials: 'same-origin'
      }),
    }),
  }),
})

export const { useCreateTaskMutation, useUpdateTaskMutation, useGetTaskMutation, useGetTasksMutation } = teacherApi;

