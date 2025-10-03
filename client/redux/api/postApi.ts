import {api} from "./api";
import {PostType} from "../../src/types.ts";

const postApi = api
  .injectEndpoints({
    endpoints: (build) => ({
      fetchPosts: build.query<
        PostType[],
        void
      >({
        query: () => ({
          url: 'posts',
        }),
        providesTags: ['Posts'],
      }),

      deletePost: build.mutation({
        query: (id) => ({
          url: `posts/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Posts'],
      }),

      createPost: build.mutation({
        query: (fields) => ({
          url: 'posts',
          method: 'POST',
          body: fields,
        }),
        invalidatesTags: ['Posts'],
      }),

      updatePost: build.mutation({
        query: ({id, fields}) => ({
          url: `posts/${id}`,
          method: 'PATCH',
          body: fields,
        }),
        invalidatesTags: ['Posts'],
      }),

    }),
  });

export const {
  useFetchPostsQuery,
  useDeletePostMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
} = postApi;