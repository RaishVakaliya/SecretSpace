import { Link } from "react-router-dom";
import CommonFooter from "../common/CommonFooter";
import { useEffect } from "react";

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-[#e1e7ef] mb-6">
              About Secret Space
            </h1>
            <p className="text-xl text-[#9aa1ac] max-w-3xl mx-auto leading-relaxed">
              A modern platform for sharing anonymous confessions and
              self-destructing secret messages. Your thoughts, your privacy,
              your choice.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-elegant transition-all duration-300">
              <div className="text-contact-accent text-2xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-[#e1e7ef] mb-3">
                Anonymous Confessions
              </h3>
              <p className="text-[#9aa1ac]">
                Share your thoughts without revealing your identity. Your
                confessions remain completely anonymous.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-elegant transition-all duration-300">
              <div className="text-contact-accent text-2xl mb-4">💫</div>
              <h3 className="text-xl font-semibold text-[#e1e7ef] mb-3">
                Self-Destructing Messages
              </h3>
              <p className="text-[#9aa1ac]">
                Create messages that disappear forever after being viewed once.
                Perfect for sensitive communications.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-elegant transition-all duration-300">
              <div className="text-contact-accent text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-[#e1e7ef] mb-3">
                Real-time Updates
              </h3>
              <p className="text-[#9aa1ac]">
                Experience instant updates with our real-time database powered
                by Convex technology.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-elegant transition-all duration-300">
              <div className="text-contact-accent text-2xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-[#e1e7ef] mb-3">
                End-to-End Encryption
              </h3>
              <p className="text-[#9aa1ac]">
                All secret messages are encrypted using CryptoJS for maximum
                security and privacy.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-elegant transition-all duration-300">
              <div className="text-contact-accent text-2xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-[#e1e7ef] mb-3">
                Responsive Design
              </h3>
              <p className="text-[#9aa1ac]">
                Works seamlessly on desktop and mobile devices for the best user
                experience.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-elegant transition-all duration-300">
              <div className="text-contact-accent text-2xl mb-4">👤</div>
              <h3 className="text-xl font-semibold text-[#e1e7ef] mb-3">
                User Profiles
              </h3>
              <p className="text-[#9aa1ac]">
                Track your confessions and sent messages with secure user
                authentication via Clerk.
              </p>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-gradient-to-r from-[#232934] to-[#2e3c51] border border-gray-700 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-[#e1e7ef] mb-6 text-center">
              Privacy & Security First
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#6e86f2] mb-3">
                  🔒 Your Data is Protected
                </h4>
                <ul className="space-y-2 text-[#9aa1ac]">
                  <li>• End-to-end encryption for all secret messages</li>
                  <li>• Anonymous confession posting</li>
                  <li>• Secure authentication via Clerk</li>
                  <li>• No tracking or data mining</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#6e86f2] mb-3">
                  💫 Self-Destructing Content
                </h4>
                <ul className="space-y-2 text-[#9aa1ac]">
                  <li>• Messages disappear after one view</li>
                  <li>• No permanent storage of sensitive content</li>
                  <li>• Customizable expiration times</li>
                  <li>• Complete digital anonymity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#e1e7ef] mb-6">
              Ready to Share Anonymously?
            </h2>
            <p className="text-xl text-[#9aa1ac] mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust SecretSpace for their anonymous
              confessions and secret messages.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/confessions">
                <button className="inline-flex items-center justify-center px-6 py-3 bg-[#6e86f2] text-[#22262a] font-semibold rounded-md hover:bg-contact-accent/90 focus:ring-2 focus:ring-contact-accent focus:ring-offset-2 focus:ring-offset-contact-bg transition-colors">
                  Get Started
                </button>
              </Link>
              <Link to="/contact">
                <button className="inline-flex items-center justify-center px-6 py-3 border border-[#6e86f2] text-[#6e86f2] bg-transparent font-semibold rounded-md hover:bg-[#6e86f2] hover:text-[#22262a] focus:ring-2 focus:ring-contact-accent focus:ring-offset-2 focus:ring-offset-contact-bg transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};

export default AboutUsPage;
