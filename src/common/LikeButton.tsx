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

  const hasLiked = useQuery(api.posts.hasUserLikedPost, { postId }) || false;

  const currentLikeCount = useQuery(api.posts.getPostLikeCount, { postId });

  useEffect(() => {
    if (currentLikeCount !== undefined) {
      setLikeCount(currentLikeCount);
    }
  }, [currentLikeCount]);

  const toggleLike = useMutation(api.posts.toggleLike);

  const handleLikeClick = async () => {
    if (!currentUser) return;

    try {
      await toggleLike({ postId });
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
