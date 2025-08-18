import { ArrowRight, Shield, Timer, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className="pt-20 pb-8 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Subtle Purple Background Glow */}
          <div className="absolute inset-0 bg-[#a678f1] opacity-10 blur-3xl rounded-full" />
          <div className="relative bg-[#1a1428] border border-[#a678f1]/20 rounded-2xl p-12 backdrop-blur-lg shadow-[0_0_30px_0_rgba(166,120,241,0.1)]">
            {/* Top Icons */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-[#a678f1]/20">
                  <Shield className="w-6 h-6 text-[#a678f1]" />
                </div>
                <div className="p-2 rounded-full bg-[#7e6eea]/20">
                  <Timer className="w-6 h-6 text-[#7e6eea]" />
                </div>
                <div className="p-2 rounded-full bg-[#cc66d3]/20">
                  <MessageCircle className="w-6 h-6 text-[#cc66d3]" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#f3ecff]">
              Ready to{" "}
              <span className="bg-gradient-to-r from-[#a678f1] to-[#7e6eea] bg-clip-text text-transparent">
                Share Anonymously
              </span>
              ?
            </h2>

            {/* Subheading */}
            <p className="text-lg text-[#b6accf] mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Whisper Secrets for anonymous
              confessions and secure messaging. Your privacy is our priority.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-gradient-to-r from-[#bd7fff] to-[#7e6eea] hover:opacity-90 text-white font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#a678f1]/50 group flex items-center justify-center"
                onClick={() => navigate("/post-confession")}
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="border border-[#a678f1]/40 text-[#a678f1] hover:bg-[#a678f1]/10 bg-transparent font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#a678f1]/50"
                onClick={scrollToTop}
              >
                Explore Features
              </button>
            </div>

            {/* Bottom Features */}
            <div className="mt-8 text-sm text-[#9c8dbd]">
              <p>
                🔒 End-to-end encrypted • 👻 Completely anonymous • ⚡ Real-time
                updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
