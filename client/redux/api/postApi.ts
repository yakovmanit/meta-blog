import {api} from "./api";
import {PostType} from "../../src/types.ts";

const postApi = api
  .injectEndpoints({
    endpoints: (build) => ({
      // TODO: when new post created - refresh fetching of posts
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

    }),
  });

export const {
  useFetchPostsQuery,
  useDeletePostMutation,
} = postApi;