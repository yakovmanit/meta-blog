const PostCardSkeleton = () => {
  return (
    <div className="bg-gray-bg p-3 rounded-xl hover:border-gray transition-colors">
      <div className="mb-4 h-[60vw] bg-gray-skeleton rounded-xl md:h-[30vw] xl:h-[17vw] xl:max-h-60"></div>

      <div className="p-3">
        {/* Title */}
        <h1 className="h-4 mb-3 md:mb-6 rounded-xl bg-gray-skeleton"></h1>

        {/* User */}
        <div className="bg-gray-skeleton h-8 rounded-xl"></div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;