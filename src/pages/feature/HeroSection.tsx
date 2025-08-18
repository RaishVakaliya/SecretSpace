import { MessageSquare, Shield, Timer, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#212529]">
      {/* Radial Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-[#ac7aff]/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-pulse">
        {/* Icon Glow */}
        <div className="flex justify-center mb-8">
          <div className="p-5 rounded-full bg-gradient-to-r from-[#ac7aff] to-[#7b6cff] shadow-2xl shadow-black">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-[#ac7aff]">
          Whisper Secrets
        </h1>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-[#b8aee0] mb-10 max-w-2xl mx-auto leading-relaxed">
          Share your deepest thoughts anonymously. Create self-destructing
          messages that vanish forever. Experience the freedom of true digital
          privacy.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <button
            className="bg-[#ac7aff] hover:opacity-90 text-white font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/post-confession")}
          >
            Start Confessing
          </button>
          <button
            className="border border-[#ac7aff]/60 text-[#ac7aff] hover:bg-[#ac7aff]/10 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { icon: Shield, label: "Anonymous" },
            { icon: Timer, label: "Self-Destructing" },
            { icon: Zap, label: "Real-time" },
            { icon: MessageSquare, label: "Secure" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-4 rounded-lg border border-[#ac7aff]/20 backdrop-blur-sm bg-[#ffffff0a] hover:border-[#ac7aff]/50 transition-all duration-300"
            >
              <item.icon className="w-8 h-8 text-[#ac7aff]" />
              <span className="text-sm font-medium text-white">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
