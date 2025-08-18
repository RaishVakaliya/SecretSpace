import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeFooter = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-gray-800 border-t border-gray-700 pt-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <button
                  className="text-gray-400 hover:text-white text-sm"
                  onClick={() => (window.location.href = "/about")}
                >
                  About Us
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white text-sm">
                  Blog
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white text-sm">
                  Careers
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white text-sm">
                  Press
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <button
                  className="text-gray-400 hover:text-white text-sm"
                  onClick={() => navigate("/help")}
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-white text-sm"
                  onClick={() => navigate("/security-center")}
                >
                  Safety Center
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-white text-sm"
                  onClick={() => navigate("/community-guidelines")}
                >
                  Community Guidelines
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-white text-sm"
                  onClick={() => navigate("/feedback")}
                >
                  Feedback
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  className="text-gray-400 hover:text-white text-sm"
                  onClick={() => navigate("/privacy-policy")}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-white text-sm"
                  onClick={() => navigate("/terms-of-service")}
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400 hover:text-white text-sm"
                  onClick={() => navigate("/cookie-policy")}
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
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
        <div className=" border-t border-gray-700 pt-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-x-6 sm:gap-y-2 text-gray-400 text-xs sm:text-sm">
              <span className="text-center sm:text-left">
                © 2025 SecretSpace. All rights reserved.
              </span>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                <button
                  className="hover:text-white"
                  onClick={() => navigate("/privacy-policy")}
                >
                  Privacy
                </button>
                <button
                  className="hover:text-white"
                  onClick={() => navigate("/security-center")}
                >
                  Security
                </button>
                <button
                  className="hover:text-white"
                  onClick={() => navigate("/features")}
                >
                  Features
                </button>
                <button
                  className="hover:text-white"
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
