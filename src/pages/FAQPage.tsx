import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is SecretSpace?",
      answer:
        "SecretSpace is a platform dedicated to providing a safe space for people to share their thoughts, confessions, and secrets anonymously. We believe in the power of unburdening oneself without fear of judgment or consequences.",
    },
    {
      question: "How do secret messages work?",
      answer:
        "Secret messages are encrypted and self-destructing. When you send a secret message, the recipient receives a notification and can view it once. After viewing, the message is automatically deleted from our servers for privacy.",
    },
    {
      question: "Is my information kept private?",
      answer:
        "Yes, privacy is our top priority. Your confessions are posted anonymously, and we don't track or store identifying information with your posts. You can adjust your privacy settings in your profile to control who can find you on the platform.",
    },
    {
      question: "How do I report inappropriate content?",
      answer:
        "If you encounter content that violates our community guidelines, please use the 'Report Issues' feature in the Support section. You can report inappropriate content, technical problems, or security concerns.",
    },
    {
      question: "Can I delete my posts or account?",
      answer:
        "Yes, you can delete any of your posts from your profile page. If you wish to delete your account, you can do so from the Settings page. Please note that deleting your account will permanently remove all your data from our platform.",
    },
    {
      question: "How do I provide feedback about the platform?",
      answer:
        "We welcome your feedback! Visit the Support section and select 'Feedback' to share your thoughts, suggestions, bug reports, or compliments. Your input helps us improve the platform.",
    },
  ];
  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-700 pb-6 last:border-b-0 last:pb-0"
          >
            <button
              className="w-full text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.question}
              </h3>
              {openIndex === index ? (
                <FaChevronUp className="text-white" />
              ) : (
                <FaChevronDown className="text-white" />
              )}
            </button>
            {openIndex === index && (
              <p className="text-gray-300 mt-2">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
