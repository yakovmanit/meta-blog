import React from 'react';
import PostCardSkeleton from "./PostCard/PostCardSkeleton.tsx";
import PostCard from "./PostCard";
import {PostType} from "../types.ts";

interface Props {
  title?: string;
  postsStatus: boolean;
  posts: PostType[];
  className?: string;
}

export const Posts: React.FC<Props> = ({ className, postsStatus, posts, title }) => {
  return (
    <div className={className}>
      <section>
        <div className="custom-container">
          {
            title && (
              <h2 className="mb-6 text-xl font-bold md:text-2xl md:mb-8">
                {title}
              </h2>
            )
          }

          <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {
              postsStatus ? (
                [...new Array(5)].map((_, i) =>
                  <PostCardSkeleton key={i} />
                )
              ) : (
                posts?.map(post =>
                  <PostCard key={post._id} {...post} />
                )
              )
            }
          </div>
        </div>
      </section>
    </div>
  );
};
