import React from 'react';
import banner from '../assets/img/banner.jpg';
import heroAvatar from '../assets/img/hero-avatar.jpg';
import PostCard from "../components/PostCard/index.tsx";
import PostCardSkeleton from "../components/PostCard/PostCardSkeleton.tsx";
import {useFetchPostsQuery} from "../../redux/api/postApi.ts";

const Home: React.FC = () => {
  const { data: posts, isLoading: postsStatus } = useFetchPostsQuery();

  return (
    <div>
      {/* Hero */}
      <section className="mt-6 mb-16 md:mb-36">
        <div className="custom-container">
          {/* Hero wrapper */}
          <div className="wrapper relative">
            <div className="h-[300px] rounded-xl overflow-hidden md:h-[600px]">
              <img className="h-full w-full object-cover" src={banner} alt="banner"/>
            </div>
            <div className="mt-5 md:mt-0 md:absolute md:-bottom-16 md:left-16 md:max-w-[600px] md:p-10 md:bg-white md:shadow-md md:rounded-xl transition-colors dark:bg-black">
              <div className="text-white bg-primary rounded-md max-w-fit py-1 px-2.5 mb-4">Technology</div>
              <h1 className="mb-6 font-semibold text-2xl md:text-4xl">The Impact of Technology on the Workplace: How Technology is Changing</h1>
              <div className="flex items-center text-gray">
                <img className="rounded-full mr-3 w-8 h-8" src={heroAvatar} alt="avatar"/>
                <p className="mr-5 font-medium">Jason Francisco</p>
                <time>August 20, 2022</time>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section>
        <div className="custom-container">
          <h2 className="mb-6 text-xl font-bold md:text-2xl md:mb-8">
            Latest Post
          </h2>

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

export default Home;