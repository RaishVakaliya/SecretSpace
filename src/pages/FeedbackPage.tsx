import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import CommonFooter from "../common/CommonFooter";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    feedbackType: "suggestion", // from first code
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");

  // Convex backend mutation
  const submitFeedback = useMutation(api.feedback.submitFeedback);

  const feedbackOptions = [
    { value: "suggestion", label: "Suggestion" },
    { value: "bug", label: "Bug Report" },
    { value: "compliment", label: "Compliment" },
    { value: "other", label: "Other" },
  ];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const selectOption = (value: string) => {
    setFormData((prev) => ({ ...prev, feedbackType: value }));
    setIsDropdownOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.message) {
      setError("Please provide your feedback");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await submitFeedback({
        name: formData.name || undefined,
        email: formData.email || undefined,
        rating: formData.rating ? Number(formData.rating) : undefined,
        feedbackType: formData.feedbackType,
        feedbackText: formData.message,
      });

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        rating: "",
        feedbackType: "suggestion",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isSubmitted ? (
        <div className="flex items-center justify-center pt-24 pb-36">
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-700">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
            <p className="text-gray-300 mb-6">
              Your feedback has been submitted successfully. We really
              appreciate your input!
            </p>
            <div className="flex justify-center space-x-2 mb-6">
              <span className="text-2xl">😊</span>
              <span className="text-2xl">👍</span>
              <span className="text-2xl">💝</span>
            </div>
            <button
              onClick={resetForm}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Submit Another Feedback
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-12 pb-8 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                We'd Love Your Feedback
              </h1>
              <p className="text-gray-300">
                Help us improve by sharing your thoughts and experiences
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border outline-none shadow-none border-gray-600 rounded-lg text-white placeholder-gray-400 
                      focus:ring-2 focus:ring-gray-500 focus:border-transparent duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border outline-none shadow-none border-gray-600 rounded-lg text-white placeholder-gray-400 
                    focus:ring-2 focus:ring-gray-500 focus:border-transparent duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    How would you rate your experience?
                  </label>
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <label key={rating} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={formData.rating === rating.toString()}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 ${
                            formData.rating === rating.toString()
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white transform scale-110"
                              : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                          }`}
                        >
                          {rating}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Feedback Type Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Feedback Type
                  </label>
                  <div className="relative">
                    <div
                      className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex justify-between items-center cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      <span>
                        {
                          feedbackOptions.find(
                            (opt) => opt.value === formData.feedbackType
                          )?.label
                        }
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg">
                        {feedbackOptions.map((option) => (
                          <div
                            key={option.value}
                            className="p-3 hover:bg-gray-600 cursor-pointer text-white"
                            onClick={() => selectOption(option.value)}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700 border outline-none shadow-none border-gray-600 rounded-lg text-white placeholder-gray-400 
                    focus:ring-2 focus:ring-gray-500 focus:border-transparent duration-200"
                    placeholder="Please share your detailed feedback here..."
                  />
                </div>

                {error && <div className="text-red-400 text-sm">{error}</div>}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:from-purple-700 hover:to-blue-700  hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Submit Feedback"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-gray-400 text-sm">
              <p>
                Your feedback helps us create better experiences for everyone 💜
              </p>
            </div>
          </div>
        </div>
      )}
      <CommonFooter />
    </div>
  );
}
