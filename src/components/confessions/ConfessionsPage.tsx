import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "../../context/UserContext";
import LikeButton from "../../common/LikeButton";
import CommentSection from "../../common/CommentSection";
import CommonFooter from "../../common/CommonFooter";
import ImageModal from "../../common/ImageModal";
import { FaArrowUp, FaPlus } from "react-icons/fa";
import Loader from "../../common/Loader";

type FilterOption = "recent" | "trending" | "mostCommented";

const ConfessionsPage = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useUser();

  const [filterOption, setFilterOption] = useState<FilterOption>("recent");

  const recentConfessions = useQuery(api.posts.getFeedPosts);
  const trendingConfessions = useQuery(api.posts.getFeedPostsByLikes);
  const mostCommentedConfessions = useQuery(api.posts.getFeedPostsByComments);

  // Select the appropriate confessions based on filter
  const confessions =
    filterOption === "trending"
      ? trendingConfessions
      : filterOption === "mostCommented"
        ? mostCommentedConfessions
        : recentConfessions;

  // State for managing comment visibility
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle comment toggle
  const handleCommentToggle = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleNewPostClick = () => {
    navigate("/post-confession");
  };

  // Handle scroll event to show/hide scroll-to-top message
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show message when scrolled past minimum screen height
      if (scrollY > windowHeight) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Format date as relative time
  const formatRelativeTime = (timestamp: number) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Handle case where client time is behind server time
    if (diffInSeconds < 0) {
      return "just now";
    }

    // Less than a minute
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
    }

    // Less than an hour
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    }

    // Less than a day
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    }

    // Less than a month (approx 30 days)
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }

    // Less than a year (approx 365 days)
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
    }

    // More than a year
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
  };

  // Function to handle filter change
  const handleFilterChange = (option: FilterOption) => {
    setFilterOption(option);
  };

  return (
    <div className="min-h-screen relative">
      {/* Share Confession Button - Responsive positioning */}
      <div className="absolute right-3 top-0 z-30 sm:right-5">
        <button
          onClick={handleNewPostClick}
          className="bg-[#226bb8] hover:bg-[#297cd5] text-white px-3 py-2 sm:px-6 sm:py-3 font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap shadow-lg text-sm sm:text-base"
        >
          <FaPlus className="inline mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Share Your Confession</span>
          <span className="sm:hidden">Share</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
            Confessions
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 pb-2 space-y-4 sm:space-y-0">
          <h3 className="text-lg sm:text-xl font-semibold text-[#acb3bc] text-center sm:text-left">
            {filterOption === "recent" && "Recent Confessions"}
            {filterOption === "trending" && "Trending Confessions"}
            {filterOption === "mostCommented" && "Most Commented Confessions"}
          </h3>

          {/* Filter options - Stack on mobile, horizontal on larger screens */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:space-x-2">
            <button
              onClick={() => handleFilterChange("recent")}
              className={`px-3 py-2 rounded-md text-sm ${filterOption === "recent" ? "bg-indigo-600 text-white" : "bg-gray-700 text-indigo-300 hover:bg-gray-600"}`}
            >
              Newest
            </button>
            <button
              onClick={() => handleFilterChange("trending")}
              className={`px-3 py-2 rounded-md text-sm ${filterOption === "trending" ? "bg-indigo-600 text-white" : "bg-gray-700 text-indigo-300 hover:bg-gray-600"}`}
            >
              Most Liked
            </button>
            <button
              onClick={() => handleFilterChange("mostCommented")}
              className={`px-3 py-2 rounded-md text-sm ${filterOption === "mostCommented" ? "bg-indigo-600 text-white" : "bg-gray-700 text-indigo-300 hover:bg-gray-600"}`}
            >
              Most Commented
            </button>
          </div>
        </div>

        {/* Confessions Feed */}
        <div className="space-y-6">
          {!confessions ? (
            // Loader while fetching confessions
            <div className="flex justify-center py-12 pb-48">
              <Loader size="120px" className="text-3xl" />
            </div>
          ) : confessions.length === 0 ? (
            <div className="text-center text-gray-400 py-8 pb-72 rounded-xl bg-gray-800 border border-gray-700">
              <p>No confessions found. Be the first to share!</p>
            </div>
          ) : (
            confessions.map((post) => (
              <div
                key={post._id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 break-words break-all whitespace-pre-wrap"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between space-x-2 mb-2">
                      <span className="text-gray-400 text-sm">
                        {currentUser && post.author?._id === currentUser._id
                          ? "You"
                          : "Anonymous User"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        • {formatRelativeTime(post._creationTime)}
                      </span>
                    </div>
                    {post.text && (
                      <p className="text-gray-300 mb-4 break-words whitespace-pre-wrap">
                        {post.text}
                      </p>
                    )}

                    {/* Image displayed below text */}
                    {post.imageUrl && (
                      <div className="mb-4">
                        <img
                          src={post.imageUrl}
                          alt="Confession Image"
                          className="w-full rounded-md cursor-pointer hover:opacity-90 transition object-contain"
                          style={{ maxHeight: "400px" }}
                          onClick={() =>
                            setSelectedImage(post.imageUrl || null)
                          }
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-6 pt-2 border-t border-gray-700">
                      {/* Like Button Component */}
                      <LikeButton
                        postId={post._id}
                        initialLikeCount={post.likes}
                      />

                      {/* Comment Toggle Button */}
                      <CommentSection
                        postId={post._id}
                        renderOnlyToggleButton={true}
                        onToggle={() => handleCommentToggle(post._id)}
                        showCommentsProp={showComments[post._id]}
                      />
                    </div>

                    {/* Comment Section */}
                    {showComments[post._id] && (
                      <CommentSection
                        postId={post._id}
                        showCommentsProp={true}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <CommonFooter />

      {/* Image Modal */}
      <ImageModal
        imageUrl={selectedImage || ""}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />

      {/* Scroll to top message */}
      {showScrollTop && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-6 
               right-28 
               sm:right-28 sm:left-auto 
               left-1/2 sm:translate-x-0 -translate-x-1/2
               flex items-center justify-center
               bg-[#226bb8] hover:bg-[#297cd5] text-white 
               p-3 rounded-full shadow-lg cursor-pointer"
          // className="fixed bottom-6 right-28 flex items-center bg-[#226bb8] hover:bg-[#297cd5] text-white p-3 rounded-full shadow-lg !rounded-button whitespace-nowrap cursor-pointer"
        >
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default ConfessionsPage;
