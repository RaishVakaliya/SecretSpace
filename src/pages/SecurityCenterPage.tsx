import { useEffect } from "react";
import {
  Shield,
  Lock,
  AlertTriangle,
  UserCheck,
  BellOff,
  EyeOff,
  Check,
} from "lucide-react";
import CommonFooter from "../common/CommonFooter";
import { SiSpringsecurity } from "react-icons/si";

const SecurityCenterPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Subtle Purple Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#a678f1] opacity-10 blur-3xl rounded-full z-0" />

      {/* Header Section */}
      <div
        className="relative -top-4 overflow-hidden mt-0 pt-0"
        style={{
          background: "linear-gradient(90deg, #1a1a2e, #2d1b69, #8b5cf6)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 8s ease infinite",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{
              animation: "fadeInUp 1s ease-out",
            }}
          >
            <SiSpringsecurity
              size={40}
              className="text-white"
              style={{ animation: "pulse 2s infinite" }}
            />
            <h1 className="text-4xl font-bold text-white">Security Center</h1>
          </div>
          <p className="text-xl text-white/80">
            Manage your account security and privacy settings
          </p>
          <p className="mt-3 text-white/60">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        {/* Security Status Card */}
        <section className="mb-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="text-purple-400" />
            Security Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-gray-800/30 p-5 rounded-lg border border-green-500/20"
              style={{ animation: "fadeInUp 1s ease-out 0.2s both" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-full">
                  <Check className="text-green-400" />
                </div>
                <h3 className="font-medium text-white">Account Protection</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Your account is secured with strong authentication methods.
              </p>
            </div>

            <div
              className="bg-gray-800/30 p-5 rounded-lg border border-green-500/20"
              style={{ animation: "fadeInUp 1s ease-out 0.4s both" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-full">
                  <Lock className="text-green-400" size={18} />
                </div>
                <h3 className="font-medium text-white">
                  End-to-End Encryption
                </h3>
              </div>
              <p className="text-gray-300 text-sm">
                All your messages are encrypted for maximum privacy.
              </p>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Security Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Lock className="text-purple-400" size={20} />,
                title: "Two-Factor Authentication",
                description:
                  "Add an extra layer of security to your account with 2FA.",
                action: "Enable",
              },
              {
                icon: <UserCheck className="text-blue-400" size={20} />,
                title: "Login Activity",
                description: "Review recent sign-ins and active sessions.",
                action: "View",
              },
              {
                icon: <BellOff className="text-yellow-400" size={20} />,
                title: "Login Notifications",
                description: "Get alerts about new sign-ins to your account.",
                action: "Manage",
              },
              {
                icon: <EyeOff className="text-pink-400" size={20} />,
                title: "Privacy Settings",
                description: "Control who can see your activity and profile.",
                action: "Configure",
              },
            ].map((feature, index) => (
              <div
                style={{ animation: "fadeInUp 1s ease-out 0.8s both" }}
                key={index}
                className="bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 p-5 rounded-lg border border-gray-700/50 hover:border-purple-500/30"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-gray-700/50 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <button className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">
                    {feature.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security Tips */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="text-yellow-400" />
            Security Tips
          </h2>

          <div
            className="space-y-4"
            style={{ animation: "fadeInUp 1s ease-out 1s both" }}
          >
            {[
              "Use a strong, unique password for your account.",
              "Never share your login credentials with anyone.",
              "Be cautious of suspicious links and phishing attempts.",
              "Regularly review your active sessions and log out from unused devices.",
              "Keep your email account secure as it's used for account recovery.",
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="text-purple-400 mt-1">•</div>
                <p className="text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>

      <CommonFooter />
    </div>
  );
};

export default SecurityCenterPage;
