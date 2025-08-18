import { useEffect } from "react";
import { Lock, MessageSquare, Users, Key, Clock } from "lucide-react";
import CommonFooter from "../common/CommonFooter";
import { MdOutlinePrivacyTip } from "react-icons/md";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Subtle Purple Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#a678f1] opacity-10 blur-3xl rounded-full z-0" />

      {/* Animated Header */}

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
            <MdOutlinePrivacyTip
              size={40}
              style={{ color: "#ffffff", animation: "pulse 2s infinite" }}
            />
            <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-xl text-white/80">
            SecretSpace - Your Privacy Matters
          </p>
          <p className="mt-3 text-white/60">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Key Privacy Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            🔒 Your Data, Your Control
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div
              className="text-center p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))",
                borderRadius: "16px",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                animation: "fadeInUp 1s ease-out 0.2s both",
              }}
            >
              <Users
                size={32}
                className="mx-auto mb-3"
                style={{ color: "#8b5cf6" }}
              />
              <h3 className="text-lg font-semibold text-white mb-2">
                Anonymous Confessions
              </h3>
              <p className="text-gray-300 text-sm">
                Share thoughts without revealing your identity
              </p>
            </div>

            <div
              className="text-center p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.1))",
                borderRadius: "16px",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                animation: "fadeInUp 1s ease-out 0.4s both",
              }}
            >
              <Lock
                size={32}
                className="mx-auto mb-3"
                style={{ color: "#ef4444" }}
              />
              <h3 className="text-lg font-semibold text-white mb-2">
                Self-Destructing Messages
              </h3>
              <p className="text-gray-300 text-sm">
                Messages disappear after being viewed once
              </p>
            </div>

            <div
              className="text-center p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(139, 92, 246, 0.1))",
                borderRadius: "16px",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                animation: "fadeInUp 1s ease-out 0.6s both",
              }}
            >
              <Key
                size={32}
                className="mx-auto mb-3"
                style={{ color: "#10b981" }}
              />
              <h3 className="text-lg font-semibold text-white mb-2">
                End-to-End Encryption
              </h3>
              <p className="text-gray-300 text-sm">
                Your messages are encrypted and secure
              </p>
            </div>
          </div>
        </section>

        {/* What We Collect */}

        <section
          className="mb-12"
          style={{ animation: "fadeInUp 1s ease-out 0.8s both" }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            📊 What We Collect
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(45, 27, 105, 0.8))",
                borderRadius: "12px",
                border: "1px solid rgba(139, 92, 246, 0.2)",
              }}
            >
              <h3 className="text-lg font-medium text-white mb-3">
                Account Info
              </h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Email address (for login and messages)</li>
                <li>• Username and profile info</li>
                <li>• Profile image (optional)</li>
              </ul>
            </div>
            <div
              className="p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(45, 27, 105, 0.8))",
                borderRadius: "12px",
                border: "1px solid rgba(139, 92, 246, 0.2)",
              }}
            >
              <h3 className="text-lg font-medium text-white mb-3">
                Usage Data
              </h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Anonymous confession content</li>
                <li>• Encrypted secret messages</li>
                <li>• Likes and comments</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use It */}
        <section
          className="mb-12"
          style={{ animation: "fadeInUp 1s ease-out 1s both" }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            🎯 How We Use Your Data
          </h2>
          <div
            className="p-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(45, 27, 105, 0.8))",
              borderRadius: "12px",
              border: "1px solid rgba(139, 92, 246, 0.2)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">
                  Platform Features
                </h3>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Enable anonymous confessions</li>
                  <li>• Process self-destructing messages</li>
                  <li>• Manage likes and comments</li>
                  <li>• Filter content (newest, trending)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-3">
                  Communications
                </h3>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Send message notifications</li>
                  <li>• Push notifications for inbox</li>
                  <li>• Email notifications (if enabled)</li>
                  <li>• Support responses</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section
          className="mb-12"
          style={{ animation: "fadeInUp 1s ease-out 1.2s both" }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            ⚡ Your Privacy Controls
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div
              className="p-4 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))",
                borderRadius: "12px",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              <h3 className="text-white font-medium mb-2">Delete Anytime</h3>
              <p className="text-gray-300 text-sm">
                Remove confessions or your entire account
              </p>
            </div>
            <div
              className="p-4 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))",
                borderRadius: "12px",
                border: "1px solid rgba(139, 92, 246, 0.3)",
              }}
            >
              <h3 className="text-white font-medium mb-2">Privacy Settings</h3>
              <p className="text-gray-300 text-sm">
                Control who can send you messages
              </p>
            </div>
            <div
              className="p-4 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))",
                borderRadius: "12px",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              <h3 className="text-white font-medium mb-2">
                Notification Control
              </h3>
              <p className="text-gray-300 text-sm">
                Manage email and push notifications
              </p>
            </div>
          </div>
        </section>

        {/* Security & Retention */}

        <section
          className="mb-12"
          style={{ animation: "fadeInUp 1s ease-out 1.4s both" }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            🛡️ Security & Data Retention
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(45, 27, 105, 0.8))",
                borderRadius: "12px",
                border: "1px solid rgba(139, 92, 246, 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Lock size={20} style={{ color: "#8b5cf6" }} />
                <h3 className="text-lg font-medium text-white">
                  Security Measures
                </h3>
              </div>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• End-to-end encryption (CryptoJS)</li>
                <li>• Secure authentication</li>
                <li>• Real-time database</li>
                <li>• Encrypted data transmission</li>
              </ul>
            </div>
            <div
              className="p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(45, 27, 105, 0.8))",
                borderRadius: "12px",
                border: "1px solid rgba(139, 92, 246, 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock size={20} style={{ color: "#f59e0b" }} />
                <h3 className="text-lg font-medium text-white">
                  Data Retention
                </h3>
              </div>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Secret messages: Auto-deleted after viewing</li>
                <li>• Expired links: Automatically invalidated</li>
                <li>• Timer: Shown when &lt;10 min remaining</li>
                <li>• User data: Deleted on account removal</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          className="text-center py-8"
          style={{ animation: "fadeInUp 1s ease-out 1.6s both" }}
        >
          <div
            className="p-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))",
              borderRadius: "16px",
              border: "1px solid rgba(139, 92, 246, 0.3)",
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              Questions about your privacy?
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              We're committed to transparency. Use our feedback system in the
              app or contact us directly.
            </p>
            <div className="flex items-center justify-center gap-2">
              <MessageSquare size={16} style={{ color: "#8b5cf6" }} />
              <span className="text-purple-400 text-sm">
                Available through SecretSpace app
              </span>
            </div>
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

export default PrivacyPolicyPage;
