import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import CryptoJS from "crypto-js";
import { useSuccessStore } from "../../stores/successStore";

interface SecretLinkDisplayProps {
  showLink: boolean;
  setShowLink: (show: boolean) => void;
  secretLink: string;
  expirationHours: number;
  setExpirationHours: (hours: number) => void;
  recipientEmail: string;
  message: string;
  setRecipientEmail: (email: string) => void;
  setSearchQuery: (query: string) => void;
  showPasteSection: boolean;
  setShowPasteSection: (show: boolean) => void;
  setMessage: (message: string) => void;
}

const SecretLinkDisplay = ({
  showLink,
  setShowLink,
  secretLink,
  expirationHours,
  setExpirationHours,
  recipientEmail,
  message,
  setRecipientEmail,
  setSearchQuery,
  showPasteSection,
  setShowPasteSection,
  setMessage,
}: SecretLinkDisplayProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [showCopiedPopup, setShowCopiedPopup] = useState(false);
  const { setSuccessLink } = useSuccessStore();
  const createSecretMessage = useMutation(
    api.secretMessages.createSecretMessage
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secretLink);
    setShowCopiedPopup(true);
    setTimeout(() => {
      setShowCopiedPopup(false);
    }, 1000);
  };

  const handleSendLink = async () => {
    if (!recipientEmail) {
      setError("Please select a recipient");
      return;
    }

    if (secretLink) {
      const uuid = secretLink.split("/").pop();

      if (uuid) {
        try {
          setIsSending(true);
          // Use recipient's email as the encryption key
          const encryptionKey = recipientEmail.toLowerCase().trim();

          // Encrypt the message using AES with recipient's email as key
          const encryptedMessage = CryptoJS.AES.encrypt(
            message,
            encryptionKey
          ).toString();

          // Calculate expiration time
          const expiresAt = Date.now() + expirationHours * 60 * 1000;

          // Save the encrypted message to the database
          await createSecretMessage({
            encryptedContent: encryptedMessage,
            uuid,
            expiresAt,
            recipientEmail: encryptionKey,
          });

          setRecipientEmail("");
          setSearchQuery("");
          setShowPasteSection(false);
          setError(null);
          setMessage("");
          setExpirationHours(1440); // Reset to 24 hours (in minutes)
          setShowLink(false);
          setSuccessLink(true);
        } catch (error) {
          console.error("Error creating secret message:", error);
          setError("Failed to create secret message. Please try again.");
        } finally {
          setIsSending(false);
        }
      }
    }
  };

  if (!showLink) return null;

  return (
    <div className="mt-6 p-3 sm:p-5 bg-gray-800 rounded-lg border border-purple-700 shadow-inner">
      <div className="flex flex-col sm:flex-row items-center relative gap-2 sm:gap-0">
        <input
          type="text"
          className="w-full sm:flex-grow bg-gray-700 text-white p-2 sm:p-3 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none border border-purple-600 sm:border-r-0 text-sm sm:text-base overflow-hidden text-ellipsis"
          value={secretLink}
          readOnly
        />
        <button
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 sm:py-3 rounded-md sm:rounded-l-none sm:rounded-r-md border border-purple-600 text-sm sm:text-base"
          onClick={copyToClipboard}
        >
          {showCopiedPopup ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="mt-3 text-sm text-purple-400 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Expires in: </span>
        <span className="font-mono ml-1">
          {expirationHours < 60
            ? `${expirationHours} minutes`
            : `${expirationHours / 60} hours`}
        </span>
      </div>

      <div className="mt-6 border-t border-purple-700 pt-4">
        {showPasteSection && (
          <div className="space-y-3">
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <div className="flex justify-center sm:justify-end">
              <button
                type="button"
                onClick={handleSendLink}
                disabled={isSending}
                className={`relative bottom-0 flex justify-center items-center gap-2 border border-purple-600 rounded-xl font-black uppercase px-4 sm:px-8 py-3 sm:py-4 z-10 overflow-hidden ease-in-out duration-700 group isolation-auto w-full sm:w-auto
    ${
      isSending
        ? "bg-purple-100 text-purple-700"
        : "bg-purple-600 text-white hover:text-purple-100 hover:bg-purple-700 active:scale-95 active:duration-0 focus:bg-purple-700 focus:text-purple-100"
    }
    before:absolute before:w-full before:transition-all before:duration-700 before:-left-full before:rounded-full before:bg-purple-700 before:-z-10 before:aspect-square
    ${!isSending ? "before:hover:w-full before:hover:left-0 before:hover:scale-150" : ""}
  `}
                style={{ minWidth: "150px", minHeight: "48px" }}
              >
                {/* Text (kept invisible when loading to avoid shrink) */}
                <span
                  className={`truncate ease-in-out duration-300 text-sm sm:text-base ${
                    isSending
                      ? "opacity-0 pointer-events-none"
                      : "group-active:-translate-x-96 group-focus:translate-x-96"
                  }`}
                >
                  Send Link
                </span>

                {/* Loader + processing text */}
                <div
                  className={`absolute flex flex-row justify-center items-center gap-2 ease-in-out duration-300 text-sm sm:text-base ${
                    isSending
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-96 opacity-0 group-active:translate-x-0 group-focus:translate-x-0"
                  }`}
                >
                  <div className="animate-spin size-4 border-2 border-purple-700 border-t-transparent rounded-full"></div>
                  Sending...
                </div>

                {/* Icon */}
                {!isSending && (
                  <svg
                    className="fill-white group-hover:fill-purple-100 ease-in-out duration-700 group-hover:-translate-x-0 group-active:translate-x-96 group-active:duration-0 group-focus:translate-x-96 group-focus:fill-purple-100"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretLinkDisplay;
