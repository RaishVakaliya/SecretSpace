import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MdOutlineEmail } from "react-icons/md";
import { PiMapPin } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import CommonFooter from "../common/CommonFooter";
const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Use the same feedback mutation for now
  const submitContact = useMutation(api.feedback.submitFeedback);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await submitContact({
        feedbackType: "contact",
        feedbackText: `Name: ${name}\nSubject: ${subject}\nMessage: ${message}`,
        email: email,
      });

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError("Failed to submit your message. Please try again.");
      console.error("Error submitting contact form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="pt-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl text-white mx-auto">
            <h1 className="text-4xl font-bold text-contact-text mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-[#9aa1ac] leading-relaxed">
              Have a question or want to work together? We'd love to hear from
              you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>
      {isSubmitted ? (
        <div className="text-center py-8 pb-48">
          <div className="text-green-400 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-semibold text-white mb-2 font-heading">
            Thank You!
          </h2>
          <p className="text-gray-300 mb-6">
            Your message has been sent successfully. We'll get back to you as
            soon as possible.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        // Contact Section
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-[#e1e7ef] flex items-center gap-2 text-lg font-semibold mb-4">
                      <MdOutlineEmail className="h-5 w-5 text-[#e1e7ef]" />
                      Email
                    </h3>
                    <p className="text-[#9aa1ac]">secretspace@confess.dev</p>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-[#e1e7ef] flex items-center gap-2 text-lg font-semibold mb-4">
                      <FiPhone className="h-5 w-5 text-[#e1e7ef]" />
                      Phone
                    </h3>
                    <p className="text-[#9aa1ac]">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <h3 className="text-[#e1e7ef] flex items-center gap-2 text-lg font-semibold mb-4">
                      <PiMapPin className="h-5 w-5 text-[#e1e7ef]" />
                      Address
                    </h3>
                    <p className="text-[#9aa1ac]">
                      123 Business Ave
                      <br />
                      Suite 100
                      <br />
                      City, State 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-elegant">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-2xl text-[#e1e7ef] font-semibold mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-[#9aa1ac]">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[#e1e7ef] text-sm font-medium">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-3 py-2 bg-[#2e3d52] rounded-md text-[#9aa1ac] placeholder:text-contact-muted focus:ring-2 focus:ring-contact-accent focus:border-contact-accent outline-none transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[#e1e7ef] text-sm font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address"
                          className="w-full px-3 py-2 bg-[#2e3d52] rounded-md text-[#9aa1ac] placeholder:text-contact-muted focus:ring-2 focus:ring-contact-accent focus:border-contact-accent outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#e1e7ef] text-sm font-medium">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject of your message"
                        className="w-full px-3 py-2 bg-[#2e3d52] rounded-md text-[#9aa1ac] placeholder:text-contact-muted focus:ring-2 focus:ring-contact-accent focus:border-contact-accent outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#e1e7ef] text-sm font-medium">
                        Your Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please type your message here..."
                        rows={6}
                        className="w-full px-3 py-2 bg-[#2e3d52] rounded-md text-[#9aa1ac] placeholder:text-contact-muted focus:ring-2 focus:ring-contact-accent focus:border-contact-accent outline-none transition-colors min-h-[120px] resize-y"
                        required
                      />
                    </div>

                    {error && (
                      <div className="text-red-400 text-sm">{error}</div>
                    )}

                    <div className="flex justify-start">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#6e86f2] text-black font-medium rounded-md hover:bg-contact-accent/90 focus:ring-2 focus:ring-contact-accent focus:ring-offset-2 focus:ring-offset-contact-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <LuSend className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <CommonFooter />
    </div>
  );
};

export default ContactUsPage;
