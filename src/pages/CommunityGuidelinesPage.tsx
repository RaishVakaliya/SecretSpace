import { useEffect, useState } from "react";
import {
  Shield,
  MessageCircle,
  AlertTriangle,
  Users,
  Lock,
  Flag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import CommonFooter from "../common/CommonFooter";
import { useNavigate } from "react-router-dom";

export default function CommunityGuidelinesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState(
    new Set(["overview"])
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const guidelines = [
    {
      id: "overview",
      title: "Welcome to SecretSpace",
      icon: <Shield className="w-6 h-6" />,
      color: "from-blue-500 to-purple-600",
      content: (
        <div className="space-y-4">
          <p className="text-[#A0A0A0] dark:text-[#A0A0A0] leading-relaxed">
            SecretSpace is a platform where you can share confessions
            anonymously and send secret messages through unique IDs. Our
            community thrives on trust, respect, and understanding. These
            guidelines help maintain a safe space for everyone.
          </p>
          <div className="bg-[#2A2A2A] dark:bg-[#2A2A2A] rounded-lg p-4 border border-[#404040]">
            <p className="text-sm text-[#E0E0E0] dark:text-[#E0E0E0]">
              <strong>Remember:</strong> With anonymity comes responsibility.
              Your words have power even when your identity is hidden.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "confessions",
      title: "Anonymous Confessions",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-green-500 to-teal-600",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1A2B1A] dark:bg-[#1A2B1A] rounded-lg p-4 border border-[#2D4A2D]">
              <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Encouraged
              </h4>
              <ul className="text-sm text-[#B0B0B0] space-y-1">
                <li>• Honest personal experiences</li>
                <li>• Seeking genuine advice or support</li>
                <li>• Sharing positive stories</li>
                <li>• Respectful emotional expression</li>
              </ul>
            </div>
            <div className="bg-[#2B1A1A] dark:bg-[#2B1A1A] rounded-lg p-4 border border-[#4A2D2D]">
              <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                Prohibited
              </h4>
              <ul className="text-sm text-[#B0B0B0] space-y-1">
                <li>• Illegal activities or content</li>
                <li>• Harassment of specific individuals</li>
                <li>• False accusations or defamation</li>
                <li>• Self-harm or suicide content</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "messages",
      title: "Secret Messages",
      icon: <Lock className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
      content: (
        <div className="space-y-4">
          <p className="text-[#A0A0A0] dark:text-[#A0A0A0] leading-relaxed">
            Secret messages sent via user IDs should be respectful and
            considerate. Remember that there's a real person receiving your
            message.
          </p>
          <div className="space-y-3">
            <div className="bg-[#2A2A2A] dark:bg-[#2A2A2A] rounded-lg p-4 border border-[#404040]">
              <h4 className="text-white font-semibold mb-2">
                Message Guidelines
              </h4>
              <ul className="text-sm text-[#B0B0B0] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></span>
                  Keep messages constructive and kind
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></span>
                  Avoid spam or repetitive messages
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></span>
                  Respect boundaries if someone asks you to stop
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></span>
                  No unsolicited explicit or inappropriate content
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "community",
      title: "Community Standards",
      icon: <Users className="w-6 h-6" />,
      color: "from-orange-500 to-red-600",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-[#2A2A2A] dark:bg-[#2A2A2A] rounded-lg p-4 border border-[#404040]">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Respect</h4>
              <p className="text-sm text-[#B0B0B0]">
                Treat all community members with dignity and respect, regardless
                of their confessions or messages.
              </p>
            </div>
            <div className="bg-[#2A2A2A] dark:bg-[#2A2A2A] rounded-lg p-4 border border-[#404040]">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-3">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Authenticity</h4>
              <p className="text-sm text-[#B0B0B0]">
                Share genuine experiences and emotions. Fake stories undermine
                the trust of our community.
              </p>
            </div>
            <div className="bg-[#2A2A2A] dark:bg-[#2A2A2A] rounded-lg p-4 border border-[#404040]">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-3">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Privacy</h4>
              <p className="text-sm text-[#B0B0B0]">
                Never attempt to reveal someone's identity or share private
                information without consent.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "reporting",
      title: "Reporting & Safety",
      icon: <Flag className="w-6 h-6" />,
      color: "from-red-500 to-pink-600",
      content: (
        <div className="space-y-4">
          <div className="bg-[#2B1A1A] dark:bg-[#2B1A1A] rounded-lg p-6 border border-[#4A2D2D]">
            <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              When to Report Content
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="text-sm text-[#B0B0B0] space-y-2">
                <li>• Harassment or bullying</li>
                <li>• Threats of violence</li>
                <li>• Illegal content</li>
                <li>• Self-harm mentions</li>
              </ul>
              <ul className="text-sm text-[#B0B0B0] space-y-2">
                <li>• Doxxing attempts</li>
                <li>• Spam or abuse</li>
                <li>• Inappropriate content</li>
                <li>• Fake accusations</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              onClick={() => navigate("/report-issues")}
            >
              Report Content
            </button>
            <button className="flex-1 bg-[#2A2A2A] hover:bg-[#333333] text-white font-semibold py-3 px-6 rounded-lg border border-[#404040] transition-colors duration-200">
              Emergency Resources
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "consequences",
      title: "Consequences & Enforcement",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-600",
      content: (
        <div className="space-y-4">
          <p className="text-[#A0A0A0] dark:text-[#A0A0A0] leading-relaxed">
            Violations of these guidelines may result in the following actions:
          </p>
          <div className="space-y-3">
            {[
              {
                level: "Warning",
                color: "yellow",
                description: "First-time minor violations receive a warning",
              },
              {
                level: "Temporary Restriction",
                color: "orange",
                description: "Limited access to posting for 24-72 hours",
              },
              {
                level: "Account Suspension",
                color: "red",
                description: "Temporary ban from the platform (1-30 days)",
              },
              {
                level: "Permanent Ban",
                color: "red",
                description:
                  "Complete removal from SecretSpace for severe violations",
              },
            ].map((consequence, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-[#2A2A2A] dark:bg-[#2A2A2A] rounded-lg p-4 border border-[#404040]"
              >
                <div
                  className={`w-8 h-8 bg-${consequence.color}-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {consequence.level}
                  </h4>
                  <p className="text-sm text-[#B0B0B0] mt-1">
                    {consequence.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-[#1E1E1E] dark:bg-[#1E1E1E] border border-[#333333] rounded-[32px] p-8 md:p-12"
            style={{
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <p className="text-[#A0A0A0] dark:text-[#A0A0A0] text-sm">
                Building a safe space for authentic expression...
              </p>
            </div>

            <h1
              className="text-white dark:text-white font-medium leading-[1.1] mb-6"
              style={{
                fontSize: "clamp(28px, 5vw, 56px)",
              }}
            >
              Community Guidelines
              <br />
              for anonymous sharing
              <br />
              and secret messaging
            </h1>

            <p className="text-[#B0B0B0] dark:text-[#B0B0B0] text-lg leading-relaxed max-w-2xl">
              These guidelines ensure SecretSpace remains a trusted platform
              where you can share confessions anonymously and send secret
              messages while maintaining respect and safety for all users.
            </p>
          </div>
        </div>
      </section>

      {/* Guidelines Content */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {guidelines.map((section) => (
            <div
              key={section.id}
              className="bg-[#1E1E1E] dark:bg-[#1E1E1E] border border-[#333333] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-[#252525] dark:hover:bg-[#252525] transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center text-white`}
                  >
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-white text-left">
                    {section.title}
                  </h2>
                </div>
                {expandedSections.has(section.id) ? (
                  <ChevronUp className="w-5 h-5 text-[#A0A0A0]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#A0A0A0]" />
                )}
              </button>

              {expandedSections.has(section.id) && (
                <div className="px-6 pb-6 border-t border-[#333333]">
                  <div className="pt-6">{section.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Questions about our guidelines?
            </h3>
            <p className="text-[#B0B0B0] mb-6 max-w-2xl mx-auto">
              If you have questions about these guidelines or need to report
              content, we're here to help maintain a safe and respectful
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                onClick={() => navigate("/contact")}
              >
                Contact Support
              </button>
              <button
                className="bg-transparent hover:bg-white/5 text-white font-semibold py-3 px-8 rounded-lg border border-[#404040] transition-colors duration-200"
                onClick={() => navigate("/report-issues")}
              >
                Report Content
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Remove animations for reduced motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
          }
        }
      `}</style>

      <CommonFooter />
    </div>
  );
}
