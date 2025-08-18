import { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { RiCloseLargeFill } from "react-icons/ri";
import { useUser } from "../../context/UserContext";

const CreateConfession = () => {
  const { user } = useUser();
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Regular authenticated mutations
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const createPost = useMutation(api.posts.createPost);
  const createTextPost = useMutation(api.posts.createTextPost);

  // Anonymous mutations
  const generateAnonymousUploadUrl = useMutation(
    api.posts.generateAnonymousUploadUrl
  );
  const createAnonymousPost = useMutation(api.posts.createAnonymousPost);
  const createAnonymousTextPost = useMutation(
    api.posts.createAnonymousTextPost
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Create a preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleImageButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!text && !image) {
      setError("Please provide either text or an image for your confession");
      return;
    }

    try {
      setIsSubmitting(true);

      if (image) {
        // Handle image upload - use appropriate function based on auth status
        const uploadUrl = user
          ? await generateUploadUrl()
          : await generateAnonymousUploadUrl();

        // Upload the image
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        });

        if (!result.ok) {
          throw new Error("Failed to upload image");
        }

        // Get the storage ID from the upload response
        const { storageId } = await result.json();

        // Create the post with the image - use appropriate function based on auth status
        if (user) {
          await createPost({
            storageId,
            text: text || undefined,
          });
        } else {
          await createAnonymousPost({
            storageId,
            text: text || undefined,
          });
        }
      } else {
        // Text-only confession - use appropriate function based on auth status
        if (user) {
          await createTextPost({
            text,
          });
        } else {
          await createAnonymousTextPost({
            text,
          });
        }
      }

      // Reset form
      setText("");
      setImage(null);
      setPreviewUrl(null);
      setSuccess(true);
    } catch (err) {
      console.error("Error creating confession:", err);
      setError("Failed to create confession. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-lg shadow-xl p-6 border border-indigo-700 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-indigo-300">
        Share Your Confession
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-md text-green-200 flex justify-between items-center">
          Your confession has been posted successfully!
          <button
            onClick={() => setSuccess(false)}
            className="text-2xl text-green-200 hover:text-green-400"
          >
            <RiCloseLargeFill />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-4 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none border border-indigo-800 shadow-inner"
            rows={4}
            placeholder="Share your confession anonymously..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && (text.trim() || image)) {
                e.preventDefault(); // prevent newline
                handleSubmit(e);
              }
            }}
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label className="block text-indigo-300 mb-2">
              Add an Image (Optional)
            </label>
            {previewUrl && (
              <button
                type="button"
                className="text-red-400 hover:text-red-300 text-sm"
                onClick={() => {
                  setImage(null);
                  setPreviewUrl(null);
                }}
              >
                Remove Image
              </button>
            )}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isSubmitting}
          />

          {previewUrl ? (
            <div className="mt-2 relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 rounded-md mx-auto border border-indigo-700"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={handleImageButtonClick}
              className="w-full p-3 bg-gray-800 rounded-lg text-indigo-300 border border-indigo-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
              disabled={isSubmitting}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Choose an Image
            </button>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700  w-full sm:w-auto text-white font-medium py-2 px-6 rounded-md transition-colors shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || (!text && !image)}
          >
            {isSubmitting ? "Posting..." : "Post Anonymously"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateConfession;
