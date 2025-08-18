import { useNavigate } from "react-router-dom";

const CommonFooter = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-x-6 sm:gap-y-2 text-gray-400 text-xs sm:text-sm">
          <span className="text-center sm:text-left">
            © 2025 SecretSpace. All rights reserved.
          </span>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            <button
              className="hover:text-white transition-colors"
              onClick={() => navigate("/privacy-policy")}
            >
              Privacy
            </button>
            <button
              className="hover:text-white transition-colors"
              onClick={() => navigate("/security-center")}
            >
              Security
            </button>
            <button
              className="hover:text-white transition-colors"
              onClick={() => navigate("/features")}
            >
              Features
            </button>
            <button
              className="hover:text-white transition-colors"
              onClick={() => navigate("/contact")}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CommonFooter;
