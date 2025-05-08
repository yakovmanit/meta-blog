import React from 'react';
import banner from '../assets/img/banner.jpg';
import heroAvatar from '../assets/img/hero-avatar.jpg'

const Home: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="mt-6">
        {/* Hero wrapper */}
        <div className="relative">
          <div className="h-[300px] rounded-xl overflow-hidden md:h-[600px]">
            <img className="h-full w-full object-cover" src={banner} alt="banner"/>
          </div>
          <div className="mt-5 md:mt-0 md:absolute md:-bottom-16 md:left-16 md:max-w-[600px] md:p-10 md:bg-white md:shadow-md md:rounded-xl">
            <div className="text-white bg-primary rounded-md max-w-fit py-1 px-2.5 mb-4">Technology</div>
            <h1 className="mb-6 font-semibold text-2xl md:text-4xl">The Impact of Technology on the Workplace: How Technology is Changing</h1>
            <div className="flex items-center text-gray">
              <img className="rounded-full mr-3 w-8 h-8" src={heroAvatar} alt="avatar"/>
              <p className="mr-5 font-medium">Jason Francisco</p>
              <time className="">August 20, 2022</time>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;