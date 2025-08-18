import { useEffect } from "react";
import CommonFooter from "../common/CommonFooter";
import FAQPage from "./FAQPage";
import { FaRocket } from "react-icons/fa";
import { FaShieldAlt, FaUserFriends, FaEnvelope } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const HelpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Hide button when on /contact
  if (location.pathname === "/contact") return null;
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">Help Center</h1>
          <p className="text-gray-300 text-lg">
            Find answers to your questions and learn how to use SecretSpace
          </p>
        </div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#6486ab] transition-all cursor-pointer"
            onClick={() => navigate("/about")}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-[#297cd5] bg-opacity-20 rounded-xl flex items-center justify-center">
                <FaRocket className="text-[#6486ab] text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Getting Started
              </h3>
            </div>
            <p className="text-gray-300">
              Learn the basics of SecretSpace and how to set up your account
            </p>
          </div>

          <div
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#6486ab] transition-all cursor-pointer"
            onClick={() => navigate("/privacy-policy")}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-[#297cd5] bg-opacity-20 rounded-xl flex items-center justify-center">
                <FaShieldAlt className="text-[#6486ab] text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Privacy & Security
              </h3>
            </div>
            <p className="text-gray-300">
              Understand how we protect your data and maintain anonymity
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#6486ab] transition-all cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-[#297cd5] bg-opacity-20 rounded-xl flex items-center justify-center">
                <FaEnvelope className="text-[#6486ab] text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Sending Messages
              </h3>
            </div>
            <p className="text-gray-300">
              Learn how to send and manage your secret messages
            </p>
          </div>

          <div
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#6486ab] transition-all cursor-pointer"
            onClick={() => navigate("/community-guidelines")}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-[#297cd5] bg-opacity-20 rounded-xl flex items-center justify-center">
                <FaUserFriends className="text-[#6486ab] text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Community Guidelines
              </h3>
            </div>
            <p className="text-gray-300">
              Understand our community rules and best practices
            </p>
          </div>
        </div>

        <FAQPage />

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Still Need Help?
          </h2>
          <p className="text-gray-300 mb-6">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex items-center justify-center">
            <button
              className="contact-button flex items-center justify-center text-xl px-6 py-3 whitespace-nowrap"
              onClick={() => navigate("/contact")}
            >
              <MdContactSupport className="mr-2 text-3xl" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};

export default HelpPage;
