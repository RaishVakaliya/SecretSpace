import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import AuthenticatedContent from "./AuthenticatedContent";
import Loader from "../../common/Loader";
import CommonFooter from "../../common/CommonFooter";

const SecretMessagesPage = () => {
  const { isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="120px" className="text-3xl" />
      </div>
    );
  }

  return (
    <>
      <Authenticated>
        <AuthenticatedContent />
      </Authenticated>
      <Unauthenticated>
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
              Secret Messages
            </h2>
            <p className="text-center text-white max-w-2xl mx-auto">
              Create self-destructing messages that can only be viewed once
              before they disappear forever.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-lg shadow-xl p-6 border border-purple-700">
            <div className="text-center py-10">
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-purple-400 mx-auto"
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
              <h3 className="text-xl font-semibold mb-4 text-purple-300">
                Authentication Required
              </h3>
              <p className="text-purple-200 mb-6 max-w-md mx-auto">
                You need to sign in to create and manage secret messages. Sign
                in to continue.
              </p>
              <SignInButton mode="modal">
                <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition shadow-lg transform hover:scale-105">
                  Sign In to Continue
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </Unauthenticated>
      <CommonFooter />
    </>
  );
};

export default SecretMessagesPage;
