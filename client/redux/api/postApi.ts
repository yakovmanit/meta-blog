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
      }),

    }),
  });

export const {
  useFetchPostsQuery,
} = postApi;