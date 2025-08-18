import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import CryptoJS from "crypto-js";

const ViewSecretMessagePage = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(true);
  const [messageDeleted, setMessageDeleted] = useState(false);

  const secretMessage = useQuery(api.secretMessages.getSecretMessageByUuid, {
    uuid: uuid || "",
  });
  const deleteSecretMessage = useMutation(
    api.secretMessages.deleteSecretMessage
  );

  useEffect(() => {
    const decryptMessage = async () => {
      setIsDecrypting(true);
      setError(null);

      try {
        if (!user?.emailAddresses?.[0]?.emailAddress) {
          setError("Please sign in to view this message.");
          setIsDecrypting(false);
          return;
        }

        if (!secretMessage) {
          // Still loading or message not found
          return;
        }

        if (secretMessage === null) {
          setError("This message has expired or has already been viewed.");
          setIsDecrypting(false);
          return;
        }

        // Get user's email and normalize it
        const userEmail = user.emailAddresses[0].emailAddress
          .toLowerCase()
          .trim();

        // Check if this message is intended for this user
        if (secretMessage.recipientEmail !== userEmail) {
          setError(
            "This message is not for you! Only the intended recipient can view this message."
          );
          setIsDecrypting(false);
          return;
        }

        // Try to decrypt using the user's email as the key
        try {
          const bytes = CryptoJS.AES.decrypt(
            secretMessage.encryptedContent,
            userEmail
          );
          const decrypted = bytes.toString(CryptoJS.enc.Utf8);

          if (!decrypted) {
            setError(
              "Unable to decrypt the message. Please make sure you're using the correct email address."
            );
            setIsDecrypting(false);
            return;
          }

          setDecryptedMessage(decrypted);

          // Delete the message after it's been viewed
          await deleteSecretMessage({ messageId: secretMessage._id });
          setMessageDeleted(true);
        } catch (decryptError) {
          console.error("Decryption error:", decryptError);
          setError(
            "Unable to decrypt the message. Please make sure you're using the correct email address."
          );
        }
      } catch (error) {
        console.error("Error processing message:", error);
        setError("An error occurred while trying to process the message.");
      } finally {
        setIsDecrypting(false);
      }
    };

    if (secretMessage !== undefined) {
      decryptMessage();
    }
  }, [secretMessage, user, deleteSecretMessage]);

  const handleBackClick = () => {
    navigate("/inbox");
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#f5f6fa]">
          Secret Message
        </h2>
      </div>

      <div className="bg-[#18283b] rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
        {isDecrypting ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-purple-300">Decrypting message...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-red-400 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-red-300">Error</h3>
            <p className="text-purple-200 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={handleBackClick}
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition shadow-lg transform hover:scale-105"
            >
              Back
            </button>
          </div>
        ) : (
          <div className="py-2">
            <h3 className="text-xl font-semibold mb-6 text-white text-center">
              {messageDeleted
                ? "This message has been decrypted and will now self-destruct"
                : "Secret Message"}
            </h3>
            <div className="p-5 bg-gray-800 rounded-lg border border-[#2c3e50] shadow-inner mb-6 max-h-64 overflow-y-auto">
              <p className="text-white break-words whitespace-pre-wrap">
                {decryptedMessage}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#8392a5] mb-6">
                This message has been permanently deleted and cannot be viewed
                again.
              </p>
              <button
                onClick={handleBackClick}
                className="px-6 py-3 bg-purple-600 text-[#dae0e6] font-medium rounded-md hover:bg-purple-700 transition shadow-lg transform hover:scale-105"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSecretMessagePage;
