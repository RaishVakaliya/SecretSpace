import { useState, useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { RiCloseLargeFill } from "react-icons/ri";
import { useSuccessStore } from "../../stores/successStore";
import SecretLinkDisplay from "./SecretLinkDisplay";

const AuthenticatedContent = () => {
  const [message, setMessage] = useState("");
  const [expirationHours, setExpirationHours] = useState(1440); // 24 hours in minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [secretLink, setSecretLink] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { successLink, setSuccessLink } = useSuccessStore();
  const [, setSuccess] = useState(false);

  const [recipientEmail, setRecipientEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const [showPasteSection, setShowPasteSection] = useState(false);

  const searchUsers =
    useQuery(api.users.searchUsersByEmail, {
      searchQuery: searchQuery.length > 2 ? searchQuery : "",
    }) || [];

  // Update search results visibility when query changes
  useEffect(() => {
    setShowSearchResults(searchQuery.length > 2);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setShowLink(false);

    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    if (!recipientEmail.trim()) {
      setError("Please select a recipient email first");
      return;
    }

    try {
      setIsSubmitting(true);

      // Generate a UUID for the message
      const uuid = uuidv4();

      // Generate the secret link (no need to include encryption key in URL)
      const baseUrl = window.location.origin;
      const secretLink = `${baseUrl}/secret-messages/${uuid}`;

      setSecretLink(secretLink);
      setShowLink(true);
      setSuccess(true);
      setShowPasteSection(true);
    } catch (error) {
      console.error("Error generating link:", error);
      setError("Failed to generate link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (successLink) {
      const timer = setTimeout(() => {
        setSuccessLink(false);
      }, 3000);
      // Cleanup if the component unmounts or success changes early
      return () => clearTimeout(timer);
    }
  }, [successLink]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          Secret Messages
        </h2>
        <p className="text-center text-white max-w-2xl mx-auto">
          Create self-destructing messages that can only be viewed once before
          they disappear forever.
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-lg shadow-xl p-6 border border-purple-700">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#acb3bc]">
            Create Secret Message
          </h3>

          {successLink && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded-md text-green-200 flex justify-between items-center">
              Your secret message has been sent successfully!
              <button
                onClick={() => setSuccessLink(false)}
                className="text-2xl text-green-200 hover:text-green-400"
              >
                <RiCloseLargeFill />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <textarea
                className="w-full p-4 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none border border-purple-800 shadow-inner"
                rows={4}
                placeholder="Type your secret message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
              ></textarea>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Message expires after:
                </label>
                <select
                  className="bg-gray-800 text-white rounded-md px-3 py-2 w-full border border-purple-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={expirationHours}
                  onChange={(e) => setExpirationHours(parseInt(e.target.value))}
                  disabled={isSubmitting}
                >
                  <option value={1}>1 minute</option>
                  <option value={10}>10 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={720}>12 hours</option>
                  <option value={1440}>24 hours</option>
                  <option value={2880}>48 hours</option>
                </select>
              </div>

              {/* Recipient Selection */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Send to (required):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none border border-purple-800 shadow-inner"
                    placeholder="Search by email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                  />
                  {showSearchResults &&
                    searchUsers.length > 0 &&
                    !recipientEmail && (
                      <div
                        ref={searchResultsRef}
                        className="absolute z-10 mt-1 w-full bg-gray-800 border border-purple-700 rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {searchUsers.map((user) => (
                          <div
                            key={user._id}
                            className="p-3 hover:bg-gray-700 cursor-pointer flex items-center"
                            onClick={() => {
                              setRecipientEmail(user.email);
                              setSearchQuery(user.email);
                              setShowSearchResults(false);
                            }}
                          >
                            {user.image && (
                              <img
                                src={user.image}
                                alt={user.fullname}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                            )}
                            <div>
                              <div className="text-white">{user.fullname}</div>
                              <div className="text-gray-400 text-sm">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
                {recipientEmail && (
                  <div className="mt-2 p-2 bg-gray-700 rounded-md flex justify-between items-center">
                    <span className="text-white">{recipientEmail}</span>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white"
                      onClick={() => {
                        setRecipientEmail("");
                        setSearchQuery("");
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 text-red-400 text-sm">{error}</div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-lg transform sm:hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || !recipientEmail || !message}
                >
                  {isSubmitting ? "Generating..." : "Generate Secret Link"}
                </button>
              </div>
            </div>
          </form>

          <SecretLinkDisplay
            showLink={showLink}
            setShowLink={setShowLink}
            secretLink={secretLink}
            expirationHours={expirationHours}
            setExpirationHours={setExpirationHours}
            recipientEmail={recipientEmail}
            message={message}
            setMessage={setMessage}
            setRecipientEmail={setRecipientEmail}
            setSearchQuery={setSearchQuery}
            showPasteSection={showPasteSection}
            setShowPasteSection={setShowPasteSection}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedContent;
