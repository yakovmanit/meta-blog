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
      }),

    }),
  });

export const {
  useFetchPostsQuery,
} = postApi;