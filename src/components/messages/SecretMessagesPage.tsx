import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import AuthenticatedContent from "./AuthenticatedContent";
import Loader from "../../common/Loader";
import CommonFooter from "../../common/CommonFooter";
import useScrollToTop from "../../hooks/useScrollToTop";
import UnauthenticatedView from "../../common/UnauthenticatedView";

const SecretMessagesPage = () => {
  const { isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="120px" className="text-3xl" />
      </div>
    );
  }

  useScrollToTop();

  return (
    <>
      <Authenticated>
        <AuthenticatedContent />
      </Authenticated>
      <Unauthenticated>
        <UnauthenticatedView
          pageTitle="Secret Messages"
          pageDescription="Create self-destructing messages that can only be viewed once before they disappear forever."
          boxDescription="You need to sign in to create and manage your secret messages. Sign in to continue."
          boxColorClass="bg-gradient-to-br from-[#060b0d] via-[#0d1c1f] to-[#060b0d] border-teal-800/60 shadow-teal-900/10"
          buttonColorClass="bg-teal-700 hover:bg-teal-600 shadow-teal-900/40"
          iconColorClass="text-teal-400"
        />
      </Unauthenticated>
      <CommonFooter />
    </>
  );
};

export default SecretMessagesPage;
