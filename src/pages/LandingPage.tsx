import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../common/logo";
import {
  FaBars,
  FaCheck,
  FaDiscord,
  FaGithub,
  FaHeart,
  FaInstagram,
  FaPlay,
  FaShieldAlt,
  FaTelegram,
  FaTwitter,
  FaUserSecret,
  FaTimes,
} from "react-icons/fa";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const LandingPage = () => (
    <div className="min-h-screen bg-black">
      {/* Landing Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 mr-2">
                  <Logo />
                </div>
                <span className="text-white text-2xl font-bold">
                  SecretSpace
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              <button
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                onClick={() => navigate("/features")}
              >
                Features
              </button>
              <button
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                onClick={() => navigate("/about")}
              >
                About
              </button>
              <button
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                onClick={() => {
                  navigate("/contact");
                }}
              >
                Contact
              </button>
              <button
                className="codepen-button"
                onClick={() => navigate("/home")}
              >
                <span>Enter App</span>
              </button>
            </div>

            <div className="md:hidden">
              <button
                className="text-gray-300 hover:text-white p-2 cursor-pointer"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-700">
              <div className="py-4 space-y-3">
                <button
                  className="block w-full text-left text-gray-300 hover:text-white transition-colors cursor-pointer px-4 py-2"
                  onClick={() => {
                    navigate("/features");
                    setShowMobileMenu(false);
                  }}
                >
                  Features
                </button>
                <button
                  className="block w-full text-left text-gray-300 hover:text-white transition-colors cursor-pointer px-4 py-2"
                  onClick={() => {
                    navigate("/about");
                    setShowMobileMenu(false);
                  }}
                >
                  About
                </button>
                <button
                  className="block w-full text-left text-gray-300 hover:text-white transition-colors cursor-pointer px-4 py-2"
                  onClick={() => {
                    navigate("/contact");
                    setShowMobileMenu(false);
                  }}
                >
                  Contact
                </button>
                <button
                  className="mt-3 block w-full text-left font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md shadow-sm transition-colors"
                  onClick={() => {
                    navigate("/home");
                    setShowMobileMenu(false);
                  }}
                >
                  <span>Enter App</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-0"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=futuristic%20digital%20space%20with%20floating%20geometric%20shapes%20and%20particles%2C%20dark%20purple%20and%20black%20gradient%20background%2C%20ethereal%20lighting%20effects%2C%20modern%20minimalist%20design%2C%20high%20tech%20atmosphere%20with%20glowing%20elements%20and%20smooth%20transitions&width=1440&height=1024&seq=landing001&orientation=landscape')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black opacity-80"></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Secret
              </span>{" "}
              Space
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              A sanctuary for authentic expression where your thoughts,
              confessions, and secrets find a safe home in our anonymous digital
              realm.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              className="start-your-journey-button"
              onClick={() => navigate("/home")}
            >
              <svg
                className="start-your-journey-icon"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="start-your-journey-text">
                Start Your Journey
              </span>
            </button>

            <button
              className="watch-demo-button"
              onClick={() => setShowVideo(true)}
            >
              <span className="flex items-center">
                <FaPlay className="mr-2" />
                Watch Demo
              </span>
            </button>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-purple-400 border-opacity-30">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                10K+
              </div>
              <div className="text-gray-300 text-sm">Trusted Users</div>
            </div>
            <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-purple-400 border-opacity-30">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                50K+
              </div>
              <div className="text-gray-300 text-sm">Secrets Shared</div>
            </div>
            <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-purple-400 border-opacity-30">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                100K+
              </div>
              <div className="text-gray-300 text-sm">Connections Made</div>
            </div>
            <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-purple-400 border-opacity-30">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                24/7
              </div>
              <div className="text-gray-300 text-sm">Always Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Privacy
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the freedom of authentic expression with
              enterprise-grade security and complete anonymity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="group">
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaShieldAlt className="fas fa-shield-alt text-white  text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  End-to-End Encryption
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Military-grade encryption ensures your secrets remain truly
                  secret. Only you and your recipient can access your messages.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaUserSecret className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Complete Anonymity
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Share without fear. No personal information required, no
                  tracking cookies, no data harvesting. Just pure, authentic
                  expression.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FaHeart className="fas fa-heart text-white  text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Supportive Community
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Connect with others who understand. Our moderated community
                  provides a safe space for healing and growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  SecretSpace
                </span>
                ?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheck className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Zero Data Collection
                    </h3>
                    <p className="text-gray-400">
                      We don't store, sell, or analyze your personal data. Your
                      privacy is not our product.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheck className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Self-Destructing Messages
                    </h3>
                    <p className="text-gray-400">
                      Set expiration times for your messages and confessions.
                      Leave no digital footprint.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheck className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      AI-Powered Moderation
                    </h3>
                    <p className="text-gray-400">
                      Advanced AI keeps our community safe while preserving
                      complete anonymity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform rotate-6"></div>
              <img
                src="https://readdy.ai/api/search-image?query=modern%20smartphone%20displaying%20a%20secure%20messaging%20interface%20with%20dark%20theme%2C%20privacy%20icons%20and%20encryption%20symbols%2C%20clean%20minimal%20design%2C%20professional%20product%20photography%20with%20soft%20lighting%20on%20dark%20background&width=600&height=400&seq=about001&orientation=landscape"
                alt="SecretSpace App Interface"
                className="relative rounded-2xl w-full h-auto object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900 via-black to-pink-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Share Your Truth?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands who have found freedom in authentic, anonymous
            expression.
          </p>
          <div className="flex justify-center">
            <button
              className="start-your-journey-button"
              onClick={() => navigate("/home")}
              style={{
                backgroundImage:
                  "linear-gradient(50deg, #1900f5, #7c09a3, #a40675)",
              }}
            >
              <svg
                className="start-your-journey-icon"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="start-your-journey-text">Enter SecretSpace</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 mr-2">
                  <Logo />
                </div>
                <span className="text-white text-xl font-bold">
                  SecretSpace
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Your sanctuary for authentic, anonymous expression.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    className="text-gray-400 hover:text-white text-sm cursor-pointer"
                    onClick={() => navigate("/features")}
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    className="text-gray-400 hover:text-white text-sm cursor-pointer"
                    onClick={() => navigate("/security-center")}
                  >
                    Security
                  </button>
                </li>
                <li>
                  <button
                    className="text-gray-400 hover:text-white text-sm cursor-pointer"
                    onClick={() => navigate("/privacy-policy")}
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Support</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate("/help")}
                    className="text-gray-400 hover:text-white text-sm cursor-pointer"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    className="text-gray-400 hover:text-white text-sm cursor-pointer"
                    onClick={() => navigate("/community-guidelines")}
                  >
                    Community
                  </button>
                </li>
                <li>
                  <button
                    className="text-gray-400 hover:text-white text-sm cursor-pointer"
                    onClick={() => {
                      navigate("/contact");
                    }}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <div>
                <h4 className="text-white font-semibold mb-3">Connect</h4>
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-purple-400 text-xl">
                    <FaTwitter />
                  </button>
                  <button className="text-gray-400 hover:text-purple-400 text-xl">
                    <FaInstagram />
                  </button>
                  <button className="text-gray-400 hover:text-purple-400 text-xl">
                    <FaDiscord />
                  </button>
                  <button className="text-gray-400 hover:text-purple-400 text-xl">
                    <FaGithub />
                  </button>
                  <button className="text-gray-400 hover:text-purple-400 text-xl">
                    <FaTelegram />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 SecretSpace. All rights reserved. Your secrets are safe
              with us.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Video Popup */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-0 right-0 hover:cursor-pointer bg-gray-500 hover:bg-gray-600 text-gray-800 hover:text-black rounded-full w-6 h-6 flex items-center justify-center text-xl font-bold transition"
            >
              ×
            </button>

            {/* Video Player */}
            <video controls autoPlay className="w-full h-auto rounded-md">
              <source
                src="https://res.cloudinary.com/dzwwok8fj/video/upload/v1754466916/demo_g6rvyj.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <LandingPage />

      <style>{`
        .!rounded-button {
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};

export default LandingPage;
