import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { ITask } from '../store/models/ITask';
import { IUser, IUserListRequest, IUserListResponse } from '../store/models/IUser';
import { RootState } from '../store/store';
import { authHeader } from './AuthService';

export const adminApi = createApi({
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
  tagTypes: ['users', 'tasks'],
  reducerPath: "adminApi",
  endpoints: (builder) => ({
    getUsers: builder.mutation<IUserListResponse, IUserListRequest>({
      query: (model) => ({
        url: `/api/admin/users?page=${model.page}&pageLimit=${model.pageLimit}`,
        method: 'GET',
        credentials: 'same-origin',
        // providesTags: (result => result ? : {type: ""})
      }),
    }),

    getUser: builder.mutation<IUser, number>({
      query: (id) => ({
        url: `/api/admin/users/${id}`,
        method: 'GET',
        credentials: 'same-origin',
        keepUnusedDataFor: 5
      }),
    }),

    updateUser: builder.mutation<IUser, IUser>({
      query: (userModel) => ({
        url: `/api/admin/users/${userModel.id}`,
        method: 'PUT',
        credentials: 'same-origin',
        body: userModel,
        keepUnusedDataFor: 5
      }),
    }),

    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/api/admin/users/${userId}`,
        method: 'DELETE',
        credentials: 'same-origin',
      }),
    }),

    getTasks: builder.mutation<ITask, void>({
      query: () => ({
        url: '/api/admin/tasks',
        method: 'GET',
        credentials: 'same-origin'
      }),
    }),

    getTask: builder.mutation<IUser, number>({
      query: (id) => ({
        url: `/api/admin/tasks/${id}`,
        method: 'GET',
        credentials: 'same-origin',
        keepUnusedDataFor: 5
      }),
    }),

    updateTask: builder.mutation<IUser, IUser>({
      query: (userModel) => ({
        url: `/api/admin/tasks/${userModel.id}`,
        method: 'PUT',
        credentials: 'same-origin',
        body: userModel,
        keepUnusedDataFor: 5
      }),
    }),

    deleteTask: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/api/admin/tasks/${userId}`,
        method: 'DELETE',
        credentials: 'same-origin',
      }),
    }),
  }),
})

export const { useGetUsersMutation, useGetTasksMutation, useGetUserMutation, useUpdateUserMutation, useDeleteUserMutation } = adminApi;

