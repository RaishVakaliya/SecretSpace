import {
  MessageCircle,
  Timer,
  Filter,
  Bell,
  Lock,
  ExternalLink,
  Clock,
  User,
} from "lucide-react";
import { HeroSection } from "./HeroSection";
import { Footer } from "./Footer";
import CommonFooter from "../../common/CommonFooter";
import { useEffect } from "react";

const FeaturesPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: "Anonymous Confessions",
      description:
        "Share confessions without logging in. See and comment on others anonymously.",
      highlight: "No Registration Required",
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description:
        "Filter confessions by Newest, Most Liked, and Most Commented for discovery.",
      highlight: "Advanced Sorting",
    },
    {
      icon: Timer,
      title: "Message Timer",
      description:
        "Messages with expiry time under 10 minutes display a live countdown timer.",
      highlight: "Real-time Countdown",
    },

    {
      icon: ExternalLink,
      title: "Unique Secret Links",
      description:
        "Secret message links work only for the intended recipient - maximum security.",
      highlight: "Recipient-Only Access",
    },
    {
      icon: Timer,
      title: "One-Time Viewing",
      description:
        "Secret messages auto-delete after reading. View once, then it's gone forever.",
      highlight: "Self-Destructing Messages",
    },
    {
      icon: Bell,
      title: "Push Notifications",
      description:
        "Get instant notifications for new secret messages in your inbox.",
      highlight: "Never Miss a Message",
    },
    {
      icon: Clock,
      title: "Custom Expiration",
      description:
        "Set your own expiration times for messages. Control how long your secrets remain accessible.",
      highlight: "Expire on Your Terms",
    },
    {
      icon: Lock,
      title: "Privacy Settings",
      description:
        "Control who can send you secret messages with customizable privacy settings.",
      highlight: "Your Privacy, Your Control",
    },

    {
      icon: User,
      title: "Profile Management",
      description:
        "Customize your profile with username, full name, and profile image. Make your space truly yours.",
      highlight: "Make It Truly Yours",
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      <section className="pt-10 pb-15 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-whisper-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-whisper-purple/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-[#8a70ff]">
                Revolutionary Features
              </span>
            </h2>
            <p className="text-xl text-[#9a94ab] max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of anonymous communication with
              cutting-edge privacy features and seamless user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-[#15121d] border border-[#2d213d] transition-all duration-300 hover:border-[#a678f1] shadow-[0_0_20px_0_rgba(166,120,241,0.3)] hover:shadow-[0_0_40px_10px_rgba(166,120,241,0.4)]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#2f2642] to-[#231e31] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-[#bf80ff]" />
                  </div>
                  {/* New Badge */}
                  <div className="absolute -top-2 -right-2 px-3 py-1 bg-[#a678f1] text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    New
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#f0e6ff] group-hover:text-[#d1a9ff] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-[#a097b4] leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Highlight Banner */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#a678f1]/10 text-[#a678f1] text-sm font-medium rounded-lg border border-[#a678f1]/20">
                    <div className="w-2 h-2 bg-[#a678f1] rounded-full animate-pulse" />
                    {feature.highlight}
                  </div>
                </div>

                {/* Glowing Hover Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#a678f1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#211d2f] to-[#191824] border border-[#392d4f] backdrop-blur-lg">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#403157] flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-[#bf80ff]" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#50396d] flex items-center justify-center">
                  <Timer className="w-4 h-4 text-[#bf80ff]" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#614481] flex items-center justify-center">
                  <Lock className="w-4 h-4 text-[#bf80ff]" />
                </div>
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#f0edf1]">
                  Ready to experience anonymous communication?
                </p>
                <p className="text-sm text-[#9a94ab]">
                  Join thousands sharing secrets safely
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <CommonFooter />
    </div>
  );
};

export default FeaturesPage;
