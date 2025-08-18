import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../context/UserContext";

interface LikeButtonProps {
  postId: Id<"posts">;
  initialLikeCount: number;
}

const LikeButton = ({ postId, initialLikeCount }: LikeButtonProps) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const { user: currentUser } = useUser();

  // Check if the current user has liked this post
  const hasLiked = useQuery(api.posts.hasUserLikedPost, { postId }) || false;

  // Get real-time like count
  const currentLikeCount = useQuery(api.posts.getPostLikeCount, { postId });

  // Update like count when it changes in the database
  useEffect(() => {
    if (currentLikeCount !== undefined) {
      setLikeCount(currentLikeCount);
    }
  }, [currentLikeCount]);

  // Toggle like mutation
  const toggleLike = useMutation(api.posts.toggleLike);

  // Handle like button click
  const handleLikeClick = async () => {
    if (!currentUser) return; // Do nothing if not logged in

    try {
      await toggleLike({ postId });
      // Note: We don't need to manually update the count here anymore
      // as the subscription will handle it
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleLikeClick}
        disabled={!currentUser}
        className="flex items-center text-indigo-300 hover:text-indigo-200 transition-colors"
        aria-label={hasLiked ? "Unlike" : "Like"}
      >
        {hasLiked ? (
          <FaHeart className="mr-2 ml-1 text-green-500" />
        ) : (
          <FaRegHeart className="mr-2 ml-1 text-indigo-300 hover:text-indigo-200 border-indigo-300" />
        )}
        <span>{likeCount}</span>
      </button>
    </div>
  );
};

export default LikeButton;
