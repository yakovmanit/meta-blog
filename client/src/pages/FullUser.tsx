import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../axios.ts";
import {PostType, UserType} from "../types.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {logout} from "../../redux/slices/authSlice.ts";
import {useFetchPostsQuery} from "../../redux/api/postApi.ts";
import {Posts} from "../components/Posts.tsx";

const FullUser = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.auth.data);

  const [userData, setUserData] = useState<UserType>();

  const { data, isLoading } = useFetchPostsQuery();

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
        <div className="px-4 pt-16 pb-8 bg-[#F6F6F7] rounded-xl mb-12 relative md:py-12">
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
        <Posts
          title={"User's posts"}
          posts={data as PostType[]}
          postsStatus={isLoading}
        />
      </div>
    </div>
  );
};

export default FullUser;