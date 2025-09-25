// redux/api/postsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PostType } from '../../src/types'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4444', // Base URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // Get all posts
    fetchPosts: builder.query<PostType[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),

    // Delete post
    deletePost: builder.mutation<any, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'], // Refresh posts
    }),
  }),
})

export const {
  useFetchPostsQuery,
  useDeletePostMutation,
} = postsApi