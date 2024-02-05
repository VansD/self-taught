import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { ITask } from '../store/models/ITask';
import { IUser, ILoginRequest, IRegisterRequest } from '../store/models/IUser';
import ILogin from '../store/models/pages/Login';
import { AppStore, RootState } from '../store/store';

export const studentApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_ENDPOINT}`,
  }),
  reducerPath: "studentApi",
  endpoints: (builder) => ({
    startTest: builder.mutation<void, void>({
      query: (registerModel) => ({
        url: '/api/student/startTest',
        method: 'POST',
        body: registerModel
      }),
    }),
  }),
})

export const { useStartTestMutation } = studentApi;

