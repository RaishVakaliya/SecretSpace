import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useConvexAuth } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import CommonFooter from "../../common/CommonFooter";
import Loader from "../../common/Loader";

interface Message {
  _id: Id<"secret_messages">;
  uuid: string;
  expiresAt: number;
}

const InboxPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { isLoading } = useConvexAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});

  // Force refresh every minute to check for newly expired messages
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTrigger((prev) => prev + 1);
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  const inboxMessages =
    useQuery(api.secretMessages.getInboxMessages, isSignedIn ? {} : "skip") ||
    [];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const newTimeLeft: Record<string, string> = {};

      inboxMessages.forEach((message: Message) => {
        const difference = message.expiresAt - now;

        if (difference <= 0) {
          newTimeLeft[message._id] = "Expired";
        } else {
          const tenMinutesInMs = 10 * 60 * 1000;

          if (difference <= tenMinutesInMs) {
            const minutes = Math.floor(difference / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            newTimeLeft[message._id] =
              minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
          } else {
            newTimeLeft[message._id] = formatExpiryTime(message.expiresAt);
          }
        }
      });

      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft(); // Run once on load
    const timer = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(timer);
  }, [inboxMessages, refreshTrigger]);

  const formatExpiryTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", {
      hour12: false, // Use 24-hour format
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const viewMessage = (uuid: string) => {
    // Simply navigate to the message - email-based decryption will happen there
    navigate(`/secret-messages/${uuid}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen">
        <Loader size="120px" className="text-3xl" />
      </div>
    );
  }

  return (
    <>
      <Authenticated>
        <div className="flex flex-col min-h-screen">
          <div className="container mx-auto px-4 py-12 flex-grow">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
              Your Inbox
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="bg-[#18283b] rounded-lg shadow-xl p-6 border border-gray-700">
                {inboxMessages.length === 0 ? (
                  <p className="text-center text-indigo-200 py-4">
                    You don't have any secret messages in your inbox.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {inboxMessages.map((message: Message) => (
                      <div
                        key={message._id}
                        className="p-4 bg-gray-800 rounded-lg border border-[#2c3e50] hover:border-[#425c76] cursor-pointer transition-colors"
                        onClick={() => viewMessage(message.uuid)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-indigo-300 font-medium">
                            Secret Message
                          </div>
                          <div className="text-sm text-indigo-400">
                            <div className="flex items-center">
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
                              <span className="flex items-center gap-1">
                                Expires in:{" "}
                                {timeLeft[message._id] ? (
                                  <span
                                    className={
                                      timeLeft[message._id].includes("s")
                                        ? "text-red-400 font-medium"
                                        : ""
                                    }
                                  >
                                    {timeLeft[message._id]}
                                  </span>
                                ) : (
                                  <svg
                                    className="animate-spin h-4 w-4 text-indigo-400 ml-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                  </svg>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-gray-300">
                          <span className="flex items-center">
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
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Click to view (will self-destruct after viewing)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <CommonFooter />
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
              Your Inbox
            </h2>
            <p className="text-center text-white max-w-2xl mx-auto">
              View and manage your received secret messages in one place.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-xl p-6 max-w-4xl mx-auto">
            <div className="text-center py-10">
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V9m0 0V7m0 2h2m-2 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Authentication Required
              </h3>
              <p className="text-white mb-6 max-w-md mx-auto">
                You need to sign in to view your inbox messages. Sign in to
                continue.
              </p>
              <SignInButton mode="modal">
                <button className="px-6 py-3 text-black bg-white  hover:bg-gray-400 font-medium rounded-md transition-colors shadow-lg">
                  Sign In to Continue
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
        <CommonFooter />
      </Unauthenticated>
    </>
  );
};

export default InboxPage;
