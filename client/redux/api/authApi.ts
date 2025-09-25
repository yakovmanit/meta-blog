import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterValuesType, UserType} from "../../src/types";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4444',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers
    }
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    fetchRegister: builder.mutation<{token: string, user: UserType}, RegisterValuesType>({
      query: (params) => ({
        url: 'auth/register',
        method: 'POST',
        body: params,
      }),
    }),

  }),
});

export const {
  useFetchRegisterMutation,
} = authApi