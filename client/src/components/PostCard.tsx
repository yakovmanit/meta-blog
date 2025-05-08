import banner from "../assets/img/banner.jpg";
import heroAvatar from "../assets/img/hero-avatar.jpg";
import {Link} from "react-router-dom";

const PostCard = () => {
  return (
    <div className="border border-gray-border p-3 rounded-xl">
      <div className="mb-4 h-[60vw] rounded-xl overflow-hidden md:h-[30vw] xl:h-[17vw] xl:max-h-60">
        <Link to={"/"}>
          <img className="h-full w-full object-cover" src={banner} alt="banner"/>
        </Link>
      </div>

      <div className="p-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Link to={"/"}>
            <div className="text-primary bg-gray-bg rounded-md max-w-fit py-1 px-2.5 hover:bg-primary hover:text-white transition-colors duration-300">
                Technology
            </div>
          </Link>
          <Link to={"/"}>
            <div className="text-primary bg-gray-bg rounded-md max-w-fit py-1 px-2.5 hover:bg-primary hover:text-white transition-colors duration-300">
                Science
            </div>
          </Link>
        </div>

        {/* Title */}
          <Link to={"/"}>
            <h1 className="mb-3 font-semibold text-xl md:text-2xl md:mb-6 hover:text-primary transition-colors duration-200">
              The Impact of Technology on the Workplace: How Technology is Changing
            </h1>
          </Link>

        {/* User */}
          <Link to={"/"}>
            <div className="text-sm flex items-center text-gray group md:text-base">
              <img className="rounded-full mr-3 w-8 h-8" src={heroAvatar} alt="avatar"/>
              <p className="mr-5 font-medium group-hover:text-black transition-colors duration-200">Tracey Wilson</p>
              <time className="group-hover:text-black transition-colors duration-200">August 20, 2022</time>
            </div>
          </Link>
      </div>
    </div>
  );
};

export default PostCard;