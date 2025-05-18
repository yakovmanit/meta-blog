import {Link, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {logout} from "../../redux/slices/authSlice.ts";
import PostCardSkeleton from "../components/PostCard/PostCardSkeleton.tsx";
import PostCard from "../components/PostCard";
import {fetchPosts} from "../../redux/slices/postsSlice.ts";
import {useEffect} from "react";

const Account = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => Boolean(state.auth.data));
  const currentUser = useAppSelector(state => state.auth.data);

  const posts = useAppSelector((state) => state.posts.items);
  const postsStatus = useAppSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="custom-container w-full">
      <h1 className="mb-8 mt-6 font-semibold text-2xl md:text-4xl md:mb-16">Your account</h1>
      {/* User block */}
      <div className="w-full flex flex-col gap-8 mb-8 md:mb-16 md:flex-row">
        {/* User avatar */}
        <div className="max-w-40 max-h-40 rounded-full overflow-hidden object-cover shrink-0">
          <img
            className="w-full h-full"
            src={`${
              currentUser?.avatarUrl 
                ? `http://localhost:4444${currentUser.avatarUrl}` 
                : 'https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'
            }`}
            alt="avatar anonymous"
          />
        </div>

        {/* User info */}
        <div>
          <h2 className="mb-2 text-2xl font-bold md:mb-4">
            {currentUser?.fullName}
          </h2>
          <p className="mb-6 text-xl font-bold md:mb-8">
            {currentUser?.email}
          </p>
          <p className="mb-1 md:mb-2 font-bold">
            Profile description:
          </p>
          <p>
            {currentUser?.description
              ? currentUser.description
              : (
                <>
                  Enter your description <Link to={"/account/edit"} className="text-primary underline">edit</Link>
                </>
              )
            }
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 h-max text-white ml-auto">
          <Link to={"/account/edit"} className="cursor-pointer w-max bg-primary py-2 px-4 rounded-md hover:bg-blue-800">Edit</Link>
          <button onClick={() => dispatch(logout())} className="cursor-pointer w-max bg-red-600 py-2 px-4 rounded-md hover:bg-red-800">Log out</button>
        </div>
      </div>

      <div className="flex justify-end">
        <Link className="text-white bg-primary py-2 px-4 rounded-md hover:bg-blue-800" to={"/posts/add-new"}>Add new post</Link>
      </div>

      {/* User posts block */}
      <div>
        <h2 className="mb-4 text-xl font-bold md:text-2xl md:mb-6">
          Your posts
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
                  return post.user._id === currentUser?._id;
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

export default Account;