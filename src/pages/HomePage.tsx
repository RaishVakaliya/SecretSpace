import { FaComments, FaHeart, FaShieldAlt } from "react-icons/fa";
import HomeFooter from "./HomeFooter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Welcome to SecretSpace
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              A secure platform for sharing your thoughts, confessions, and
              secret messages in a safe, anonymous environment.
            </p>
            {/* Hero Section */}
            <div
              className="relative bg-gradient-to-br from-purple-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden mb-12"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20dark%20digital%20abstract%20background%20with%20subtle%20purple%20gradients%20and%20geometric%20patterns%2C%20minimalist%20design%20with%20soft%20lighting%20effects%2C%20futuristic%20atmosphere%2C%20clean%20and%20professional%20aesthetic%2C%20high%20tech%20ambiance%20with%20smooth%20textures%20and%20elegant%20shadows&width=1200&height=600&seq=hero001&orientation=landscape')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative z-10 px-8 py-16 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Share Your Secrets Safely
                </h2>
                <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto">
                  Express yourself freely in our secure, anonymous platform
                  designed for authentic connections and meaningful
                  conversations.
                </p>
                <div className="relative group">
                  <button
                    className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                    onClick={() => navigate("/confessions")}
                  >
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                    <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                      <div className="relative z-10 flex items-center space-x-2">
                        <span className="transition-all duration-500 group-hover:translate-x-1">
                          Let's get started
                        </span>
                        <MdOutlineKeyboardArrowRight
                          className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </div>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="w-16 h-16 bg-[#297cd5] bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="fas fa-shield-alt text-[#6486ab]  text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Secure & Anonymous
                </h3>
                <p className="text-gray-300">
                  Your privacy is our priority. Share your thoughts without
                  revealing your identity.
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="w-16 h-16 bg-[#297cd5] bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FaComments className="fas fa-comments text-[#6486ab]  text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Open Conversations
                </h3>
                <p className="text-gray-300">
                  Engage in meaningful discussions and connect with others
                  through shared experiences.
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="w-16 h-16 bg-[#297cd5] bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="fas fa-heart text-[#6486ab]  text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Supportive Community
                </h3>
                <p className="text-gray-300">
                  Find understanding and support from a community that values
                  authenticity and empathy.
                </p>
              </div>
            </div>
            {/* Stats Section */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#79a7d6] mb-2">
                    10K+
                  </div>
                  <div className="text-gray-300">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#79a7d6] mb-2">
                    50K+
                  </div>
                  <div className="text-gray-300">Confessions Shared</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#79a7d6] mb-2">
                    100K+
                  </div>
                  <div className="text-gray-300">Messages Sent</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#79a7d6] mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-300">Privacy Protected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default HomePage;
