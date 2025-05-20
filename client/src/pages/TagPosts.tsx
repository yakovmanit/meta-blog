import PostCardSkeleton from "../components/PostCard/PostCardSkeleton.tsx";
import PostCard from "../components/PostCard";
import {useAppSelector} from "../../redux/hooks.ts";
import {useParams} from "react-router-dom";

const TagPosts = () => {
  const { tagValue } = useParams();

  const posts = useAppSelector((state) => state.posts.items);
  const postsStatus = useAppSelector((state) => state.posts.loading);

  return (
    <div className="mt-6">
      <div className="custom-container">
        <h2 className="mb-4 text-xl font-bold md:text-2xl md:mb-6">
          Posts with "{tagValue}" tag
        </h2>
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {
            postsStatus === 'pending' || postsStatus ===  'failed' ? (
              [...new Array(5)].map((_, i) =>
                <PostCardSkeleton key={i} />
              )
            ) : (
              posts
                .filter(post => {
                  return post.tags.includes(tagValue as string);
                })
                .map(post =>
                  <PostCard key={post._id} {...post} />
                )
            )
          }
        </div>
      </div>
    </div>
  );
};

export default TagPosts;