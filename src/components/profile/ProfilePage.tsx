import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import DeleteConfirmationModal from "./DeleteConfessionsConfirmationModals";
import CommentSection from "../../common/CommentSection";
import LikeButton from "../../common/LikeButton";
import CommonFooter from "../../common/CommonFooter";
import ImageModal from "../../common/ImageModal";

// Define the Post type
interface Post {
  _id: Id<"posts">;
  _creationTime: number;
  text?: string;
  imageUrl?: string;
  likes?: number;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { user: clerkUser } = useClerkUser();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Id<"posts"> | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const userPosts = useQuery(api.posts.getUserPosts) || ([] as Post[]);

  const userSecretMessages =
    useQuery(api.secretMessages.getUserSecretMessages) || [];
  const secretMessagesCount = userSecretMessages.length;

  const [isDeletingAllPosts, setIsDeletingAllPosts] = useState(false);
  const [showDeleteAllConfirmation, setShowDeleteAllConfirmation] =
    useState(false);
  const [showAllConfessions, setShowAllConfessions] = useState(false);

  const [commentSectionStates, setCommentSectionStates] = useState<{
    [postId: string]: boolean;
  }>({});

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Calculate visible confessions
  const visibleConfessions = showAllConfessions
    ? userPosts
    : userPosts.slice(0, 4);
  const remainingConfessions = userPosts.length - 4;

  const deletePost = useMutation(api.posts.deletePost);

  // Add the new mutation for deleting all posts
  const deleteAllPosts = useMutation(api.posts.deleteAllUserPosts);

  const handleDeleteAllPosts = () => {
    setShowDeleteAllConfirmation(true);
  };

  const toggleShowAllConfessions = () => {
    setShowAllConfessions(!showAllConfessions);
  };

  const confirmDeleteAllPosts = async () => {
    setIsDeletingAllPosts(true);
    try {
      await deleteAllPosts();
    } catch (error) {
      console.error("Error deleting all posts:", error);
    } finally {
      setIsDeletingAllPosts(false);
      setShowDeleteAllConfirmation(false);
    }
  };

  const cancelDeleteAllPosts = () => {
    setShowDeleteAllConfirmation(false);
  };

  // Format the date when the user was created
  const memberSince = new Date(
    clerkUser?.createdAt || Date.now()
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId as Id<"posts">);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      setIsDeleting(true);
      try {
        await deletePost({ postId: postToDelete });
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        setIsDeleting(false);
        setShowDeleteConfirmation(false);
        setPostToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setPostToDelete(null);
  };

  const handleShareConfessionClick = () => {
    navigate("/post-confession");
  };

  const handleSendSecretMessageClick = () => {
    navigate("/secret-messages");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6">
          Your Profile
        </h2>

        {/* Profile Card */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-8 border border-gray-700 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-6 border-4 border-[#79a7d6]">
              {user?.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-indigo-700 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 sm:h-16 sm:w-16 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="text-center space-y-4 w-full">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {user?.fullname}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base break-all">
                  {user?.email}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-[#79a7d6] mb-1">
                    Member Since
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">
                    {memberSince}
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-[#79a7d6] mb-1">
                    {user?.posts}
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">
                    Confessions Sent
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-[#79a7d6] mb-1">
                    {secretMessagesCount}
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">
                    Secret Messages
                  </div>
                </div>
              </div>

              {/* Add buttons below the 3-stat grid */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={handleShareConfessionClick}
                  className="bg-[#226bb8] hover:bg-[#297cd5] text-white px-4 sm:px-6 py-2 sm:py-3 font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap w-full sm:flex-1 sm:max-w-[45%]"
                >
                  Send Confession
                </button>
                <button
                  onClick={handleSendSecretMessageClick}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap w-full sm:flex-1 sm:max-w-[45%]"
                >
                  Send Secret Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User's Confessions Section */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-8 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-300">
              Your Confessions
            </h4>
            {/* Add Delete All Confessions button */}
            {userPosts.length > 0 && (
              <button
                onClick={handleDeleteAllPosts}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition w-full sm:w-auto"
              >
                Delete All Confessions
              </button>
            )}
          </div>

          {userPosts.length === 0 ? (
            <p className="text-gray-400 text-center italic">
              You haven't posted any confessions yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Keep the existing confessions display code */}
              {visibleConfessions.map((post) => (
                <div
                  key={post._id}
                  className="break-words break-all whitespace-pre-wrap bg-gray-800 rounded-lg p-4 border border-gray-500 relative min-h-[120px] flex flex-col"
                >
                  {post.text && (
                    <p className="text-gray-300 mb-3 break-words whitespace-pre-wrap text-sm sm:text-base">
                      {post.text}
                    </p>
                  )}
                  {post.imageUrl && post.imageUrl !== "" && (
                    <div className="mt-2 mb-3 flex justify-center">
                      <img
                        src={post.imageUrl}
                        alt="Confession"
                        className="max-h-24 sm:max-h-32 max-w-full rounded-md cursor-pointer object-contain"
                        onClick={() => setSelectedImage(post.imageUrl || null)}
                      />
                    </div>
                  )}

                  {/* Add Like Button and Comment Toggle in a single row */}
                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-[#2c3e50]">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <LikeButton
                        postId={post._id}
                        initialLikeCount={post.likes || 0}
                      />
                      <CommentSection
                        postId={post._id}
                        renderOnlyToggleButton={true}
                        onToggle={() =>
                          setCommentSectionStates((prev) => ({
                            // Use functional update
                            ...prev,
                            [post._id]: !prev[post._id],
                          }))
                        }
                      />
                    </div>
                    <button
                      className="flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 cursor-pointer rounded-md text-white text-xs sm:text-sm font-semibold 
             bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] 
             shadow-md hover:shadow-top hover:shadow-red-500
             duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                      onClick={() => handleDeleteClick(post._id)}
                    >
                      <svg
                        viewBox="0 0 15 15"
                        className="w-4 sm:w-5 fill-white"
                      >
                        <svg
                          className="w-4 h-4 sm:w-6 sm:h-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                      </svg>
                    </button>
                  </div>

                  {/* Render full CommentSection based on state */}
                  {commentSectionStates[post._id] && (
                    <div className="mt-4 pt-2 border-t border-[#2c3e50]">
                      <CommentSection
                        postId={post._id}
                        showCommentsProp={true}
                        onToggle={() =>
                          setCommentSectionStates((prev) => ({
                            // Allow toggling off
                            ...prev,
                            [post._id]: !prev[post._id],
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* Show more/less button */}
          {userPosts.length > 4 && (
            <div className="mt-4 text-center">
              <button
                onClick={toggleShowAllConfessions}
                className="px-4 py-2 bg-[#00c3ff] text-white rounded-md hover:bg-[#36c7f3] transition text-sm sm:text-base"
              >
                {showAllConfessions
                  ? "Show Less"
                  : `Show More (+${remainingConfessions})`}
              </button>
            </div>
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

      {/* Delete Confession Modal  */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Confirm Post Deletion"
        message="Are you sure you want to delete this confession? This action cannot be undone."
        confirmLabel="Delete"
      />

      {/* Delete All Confession Modal  */}
      <DeleteConfirmationModal
        isOpen={showDeleteAllConfirmation}
        onCancel={cancelDeleteAllPosts}
        onConfirm={confirmDeleteAllPosts}
        isDeleting={isDeletingAllPosts}
        title="Confirm Delete All Confessions"
        message="Are you sure you want to delete all your confessions? This action cannot be undone."
        confirmLabel="Delete All"
      />
    </div>
  );
};

export default ProfilePage;
