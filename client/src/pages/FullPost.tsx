import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../axios.ts";
import {PostType} from "../types.ts";
import heroAvatar from "../assets/img/hero-avatar.jpg";

const FullPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<PostType>();

  // TODO: remove to separate file
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    try {
      const getPostParams = async () => {
        const res = await axios.get(`posts/${id}`);

        const postData: PostType = res.data;

        setPostData(postData);
      }

      getPostParams();

    } catch (err) {
      console.warn(err);
    }
  }, [id]);

  console.log(postData);

  if (!postData) {
    return 'Loading';
  }

  return (
    <div className="max-w-200 w-full mx-auto mt-4 md:mt-8">
      <div className="custom-container">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {
            postData.tags.map(tag =>
              <Link to={`/tags/${tag}`} key={tag}>
                <div
                  className="text-primary bg-gray-bg rounded-md max-w-fit py-1 px-2.5 hover:bg-primary hover:text-white transition-colors duration-300">
                  {tag}
                </div>
              </Link>
            )
          }
        </div>

        {/* Title */}
        <h1 className="mb-6 font-semibold text-2xl md:text-4xl">{postData.title}</h1>

        {/* User */}
        <Link to={`/users/${postData.user._id}`}>
          <div className="text-sm flex items-center text-gray group md:text-base">
            <img className="rounded-full mr-3 w-8 h-8" src={heroAvatar} alt="avatar"/>
            <p className="mr-5 font-medium group-hover:text-black transition-colors duration-200">{postData.user.fullName}</p>
            <time className="group-hover:text-black transition-colors duration-200">{formatDate(postData.createdAt)}</time>
          </div>
        </Link>

        {/* Image */}
        <img className="max-h-[460px] h-full w-full object-cover mb-8 mt-8 rounded-xl" src={`http://localhost:4444${postData.imageUrl}`} alt="banner"/>

        {/* Text */}
        <div>
          <p className="text-xl ">{postData.text}</p>
        </div>
      </div>
    </div>
  );
};

export default FullPost;