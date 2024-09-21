const LoadMoreButton = ({ onLoadMore }) => {
  return (
    <div className="flex justify-center w-full mt-4">
      <button
        className="bg-[#76c7c0] text-white px-4 py-2 my-6 rounded"
        onClick={onLoadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;
