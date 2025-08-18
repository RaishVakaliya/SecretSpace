import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { FaRegComment, FaSignInAlt } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { SignInButton } from "@clerk/clerk-react";

interface CommentSectionProps {
  postId: Id<"posts">;
  renderOnlyToggleButton?: boolean;
  onToggle?: () => void;
  showCommentsProp?: boolean;
}

const CommentSection = ({
  postId,
  renderOnlyToggleButton,
  onToggle,
  showCommentsProp,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user: currentUser } = useUser();
  const [showCommentsInternal, setShowCommentsInternal] = useState(false);

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

  // Determine which showComments state to use
  const showComments =
    showCommentsProp !== undefined ? showCommentsProp : showCommentsInternal;

  // Get comments for this post
  const comments = useQuery(api.comments.getComments, { postId }) || [];
  const commentCount =
    useQuery(api.comments.getPostCommentCount, { postId }) || 0;

  // Add comment mutation
  const addComment = useMutation(api.comments.addComment);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      await addComment({ content: newComment, postId });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComments = () => {
    if (onToggle) {
      onToggle(); // Use parent's toggle function
    } else {
      setShowCommentsInternal(!showCommentsInternal); // Use internal toggle
    }
  };

  if (renderOnlyToggleButton) {
    return (
      <div className="flex items-center">
        <button
          onClick={handleToggleComments}
          className="flex items-center text-indigo-300 hover:text-indigo-200 transition-colors"
        >
          <FaRegComment className="mr-2" />
          <span>
            {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="">
      {showComments && (
        <div className="mt-3">
          {/* Comment list */}
          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-gray-400 text-sm italic">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-start space-x-2 p-2 bg-gray-700 bg-opacity-30 rounded"
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-1 justify-between">
                      <span className="text-indigo-300 text-sm font-medium">
                        {currentUser && comment.userId === currentUser._id
                          ? "You"
                          : comment.isPostCreator
                            ? "Confessor"
                            : "Anonymous"}
                      </span>
                      <span className="text-gray-400 text-xs ml-2">
                        {formatRelativeTime(comment._creationTime)}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Comment form */}
          {currentUser ? (
            <form onSubmit={handleSubmitComment} className="mt-3">
              <div className="flex">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-gray-700 text-white border border-gray-700 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white 
             px-3 sm:px-4 py-2 rounded-r-md transition-colors 
             disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center
             whitespace-nowrap text-sm sm:text-base w-16 sm:w-24 text-center"
                  disabled={isSubmitting || !newComment.trim()}
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-3 p-3 bg-gray-800 rounded-md border border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-gray-300 text-sm">
                  Please sign in to leave a comment
                </p>
                <SignInButton mode="modal">
                  <button className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                    <FaSignInAlt className="mr-1" /> Sign In
                  </button>
                </SignInButton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
