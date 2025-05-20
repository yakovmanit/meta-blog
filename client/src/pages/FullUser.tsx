import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../axios.ts";
import {UserType} from "../types.ts";
import PostCardSkeleton from "../components/PostCard/PostCardSkeleton.tsx";
import PostCard from "../components/PostCard";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {fetchPosts} from "../../redux/slices/postsSlice.ts";
import {logout} from "../../redux/slices/authSlice.ts";

const FullUser = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.items);
  const postsStatus = useAppSelector((state) => state.posts.loading);
  const currentUser = useAppSelector(state => state.auth.data);

  const [userData, setUserData] = useState<UserType>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`/user/${id}`)

        setUserData(data);

      } catch (err) {
        console.warn(err);
      }
    }

    fetchUserData();
  }, [id]);

  if (!userData) {
    return 'Loading';
  }

  return (
    <div className="mt-6">
      <div className="custom-container">
        <div className="p-12 bg-[#F6F6F7] rounded-xl mb-12 relative">
          {/* Buttons */}
          {
            currentUser?._id === userData._id && (
              <div className="flex gap-2 h-max text-white ml-auto absolute top-1 right-1">
                <Link to={"/account/edit"} className="cursor-pointer w-max bg-primary py-2 px-4 rounded-md hover:bg-blue-800">Edit</Link>
                <Link to={"/posts/add-new"} className="cursor-pointer w-max bg-blue-900 py-2 px-4 rounded-md hover:bg-blue-950">Add new post</Link>
                <button onClick={() => dispatch(logout())} className="cursor-pointer w-max bg-red-600 py-2 px-4 rounded-md hover:bg-red-800">Log out</button>
              </div>
            )
          }

          <div className="max-w-165 mx-auto">
            {/* User image and name */}
            <div className="flex gap-4 items-center justify-center mb-6">
              <img className="rounded-full w-16 h-16" src={`${
                userData.avatarUrl
                  ? `http://localhost:4444${userData.avatarUrl}`
                  : 'https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'
              }`} alt="avatar"/>
              <p className="text-xl font-semibold">
                {userData.fullName}
              </p>
            </div>

            {/* User descr */}
            <div className="text-lg mb-6 text-center">
              {userData.description}
            </div>
          </div>
        </div>

        {/* User posts block */}
        <div>
          <h2 className="mb-4 text-xl font-bold md:text-2xl md:mb-6">
            User posts
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
                    return post.user._id === userData._id;
                  })
                  .map(post =>
                    <PostCard key={post._id} {...post} />
                  )
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullUser;