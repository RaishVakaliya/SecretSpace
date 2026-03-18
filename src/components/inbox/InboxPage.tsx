import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useConvexAuth } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import CommonFooter from "../../common/CommonFooter";
import Loader from "../../common/Loader";
import useScrollToTop from "../../hooks/useScrollToTop";
import UnauthenticatedView from "../../common/UnauthenticatedView";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTrigger((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useScrollToTop();

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

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [inboxMessages, refreshTrigger]);

  const formatExpiryTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", {
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const viewMessage = (uuid: string) => {
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
              <div className="bg-[#0f1f2e] rounded-lg shadow-xl p-6 border border-teal-800">
                {inboxMessages.length === 0 ? (
                  <p className="text-center text-teal-300 py-4">
                    You don't have any secret messages in your inbox.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {inboxMessages.map((message: Message) => (
                      <div
                        key={message._id}
                        className="p-4 bg-gray-800 rounded-lg border border-teal-900 hover:border-teal-600 cursor-pointer transition-colors"
                        onClick={() => viewMessage(message.uuid)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-teal-300 font-medium">
                            Secret Message
                          </div>
                          <div className="text-sm text-teal-400">
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
                                    className="animate-spin h-4 w-4 text-teal-400 ml-1"
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
        <UnauthenticatedView
          pageTitle="Your Inbox"
          pageDescription="View and manage your received secret messages in one place."
          boxDescription="You need to sign in to view your inbox messages. Sign in to continue."
          boxColorClass="bg-gradient-to-br from-[#060b0d] via-[#0d1c1f] to-[#060b0d] border-teal-800/60 shadow-teal-900/10"
          buttonColorClass="bg-teal-700 hover:bg-teal-600 shadow-teal-900/40"
          iconColorClass="text-teal-400"
        />
        <CommonFooter />
      </Unauthenticated>
    </>
  );
};

export default InboxPage;
