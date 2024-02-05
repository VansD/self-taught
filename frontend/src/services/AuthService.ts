import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { IUser, ILoginRequest,  IRegisterRequest } from '../store/models/IUser';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_ENDPOINT}`
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IUser, ILoginRequest>({
      query: (loginModel) => ({
        url: '/api/login',
        method: 'POST',
        body: loginModel,
        credentials: 'same-origin',
        keepUnusedDataFor: 5
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected'
    }),
    register: builder.mutation<IUser, IRegisterRequest>({
      query: (registerModel) => ({
        url: '/api/register',
        method: 'POST',
        body: registerModel,
        keepUnusedDataFor: 5
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/api/logout',
        method: 'GET'
      })
    })
  }),
})

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user') || "{}");

  if (user && user.authToken) {
    return { Authorization: 'Bearer ' + user.authToken };
  } else {
    return {};
  }
}

export const { useLoginMutation, useProtectedMutation, useRegisterMutation, useLogoutMutation } = authApi;

