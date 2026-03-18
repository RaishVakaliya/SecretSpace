import { SignInButton } from "@clerk/clerk-react";
import React from "react";

interface UnauthenticatedViewProps {
  pageTitle: string;
  pageDescription?: string;
  boxTitle?: string;
  boxDescription: string;
  buttonText?: string;
  buttonColorClass?: string;
  boxColorClass?: string;
  iconColorClass?: string;
}

const UnauthenticatedView: React.FC<UnauthenticatedViewProps> = ({
  pageTitle,
  pageDescription,
  boxTitle = "Authentication Required",
  boxDescription,
  buttonText = "Sign In to Continue",
  buttonColorClass = "bg-indigo-600 hover:bg-indigo-500",
  boxColorClass = "bg-[#0f111a] border-[#1e2235]",
  iconColorClass = "text-indigo-400",
}) => {
  return (
    <div className="flex-col min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-center mb-6 text-white tracking-tight">
            {pageTitle}
          </h2>
          {pageDescription && (
            <p className="text-center text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {pageDescription}
            </p>
          )}
        </div>

        <div
          className={`${boxColorClass} backdrop-blur-md rounded-2xl shadow-2xl p-8 border transition-all duration-300`}
        >
          <div className="text-center py-10">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-20 w-20 ${iconColorClass} mx-auto`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V9m0 0V7m0 2h2m-2 0H9"
                />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-4 italic ${iconColorClass}`}>
              {boxTitle}
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {boxDescription}
            </p>
            <SignInButton mode="modal">
              <button
                className={`px-8 py-3.5 text-white ${buttonColorClass} font-bold rounded-xl transition-all shadow-lg active:scale-95 transform hover:scale-105`}
              >
                {buttonText}
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthenticatedView;
