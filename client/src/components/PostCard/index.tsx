import {Link} from "react-router-dom";
import {PostType} from "../../types.ts";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks.ts";
import {deletePost} from "../../../redux/slices/postsSlice.ts";

const PostCard: React.FC<PostType> = ({ title, tags, _id, user, imageUrl, createdAt }) => {
  const currentUser = useAppSelector(state => state.auth.data);
  const dispatch = useAppDispatch();

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(_id));
  }

  return (
    <div className="border border-gray-border p-3 rounded-xl hover:border-gray transition-colors">
      <div className="relative mb-4 h-[60vw] rounded-xl overflow-hidden md:h-[30vw] xl:h-[17vw] xl:max-h-60">
        {
          currentUser?._id === user._id && (
            <>
              <button onClick={() => deletePostHandler()} className="absolute top-2 right-22 text-white cursor-pointer w-max bg-red-600 py-2 px-4 rounded-md hover:bg-red-800">Delete</button>
              <Link
                className="text-white bg-primary py-2 px-4 rounded-md absolute top-2 right-2 hover:bg-blue-800"
                to={`/posts/edit/${_id}`}
              >
                Edit
              </Link>
            </>
          )
        }

        <Link to={`/posts/${_id}`}>
          <img className="h-full w-full object-cover" src={`http://localhost:4444${imageUrl}`} alt="banner"/>
        </Link>
      </div>

      <div className="p-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {
            tags.map(tag =>
              <Link to={`/tags/${tag}`} key={tag}>
                <div className="text-primary bg-gray-bg rounded-md max-w-fit py-1 px-2.5 hover:bg-primary hover:text-white transition-colors duration-300">
                  {tag}
                </div>
              </Link>
            )
          }
        </div>

        {/* Title */}
          <Link to={`/posts/${_id}`}>
            <h1 className="mb-3 font-semibold text-xl md:text-2xl md:mb-6 hover:text-primary transition-colors duration-200">
              {title}
            </h1>
          </Link>

        {/* User */}
          <Link to={`/users/${user._id}`}>
            <div className="text-sm flex items-center text-gray group md:text-base">
              <img className="rounded-full mr-3 w-8 h-8" src={`${
                user.avatarUrl 
                  ? `http://localhost:4444${user.avatarUrl}`
                  : 'https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'
              }`} alt="avatar"/>
              <p className="mr-5 font-medium group-hover:text-black transition-colors duration-200">{user.fullName}</p>
              <time className="group-hover:text-black transition-colors duration-200">{formatDate(createdAt)}</time>
            </div>
          </Link>
      </div>
    </div>
  );
};

export default PostCard;