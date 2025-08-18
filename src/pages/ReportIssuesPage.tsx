import { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { RiCloseLargeFill } from "react-icons/ri";
import CommonFooter from "../common/CommonFooter";

const ReportIssuesPage = () => {
  const [issueType, setIssueType] = useState("technical");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use Convex mutations
  const generateUploadUrl = useMutation(api.report_issue.generateUploadUrl);
  const submitIssueReport = useMutation(api.report_issue.submitIssueReport);

  const issueOptions = [
    { value: "technical", label: "Technical Problem" },
    { value: "account", label: "Account Issue" },
    { value: "content", label: "Inappropriate Content" },
    { value: "Feature Request", label: "Feature Request" },
    { value: "security", label: "Security Concern" },
    { value: "other", label: "Other" },
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectOption = (value: string) => {
    setIssueType(value);
    setIsDropdownOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description) {
      setError("Please provide a description of the issue");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      let storageId = undefined;

      // Upload file if provided
      if (file) {
        // Get upload URL
        const uploadUrl = await generateUploadUrl();

        // Upload the file
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!result.ok) {
          throw new Error("Failed to upload screenshot");
        }

        // Get the storage ID from the upload response
        const data = await result.json();
        storageId = data.storageId;
      }

      // Submit to Convex database
      await submitIssueReport({
        issueType,
        description,
        email: email || undefined,
        storageId,
      });

      // Reset form and show success message
      setDescription("");
      setEmail("");
      setFile(null);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting issue report:", err);
      setError("Failed to submit issue report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="rounded-lg p-6 shadow-lg max-w-2xl mx-auto info-suppo-page-background">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            Report an Issue
          </h1>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-green-400 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Thank You!
              </h2>
              <p className="text-gray-300 mb-6">
                Your issue has been reported successfully. We'll look into it as
                soon as possible.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Report Another Issue
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-indigo-300 mb-2 font-medium">
                  Issue Type
                </label>
                <div className="relative">
                  <div
                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-between items-center cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <span>
                      {
                        issueOptions.find(
                          (option) => option.value === issueType
                        )?.label
                      }
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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
                      {issueOptions.map((option) => (
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

              <div>
                <label className="block text-indigo-300 mb-2 font-medium">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe the issue in detail. Include steps to reproduce if applicable..."
                  rows={6}
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-indigo-300 mb-2 font-medium">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email for follow-up"
                  className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-gray-400 text-sm">
                    We'll only use this to follow up on your report if needed.
                  </p>
                </div>
              </div>

              {/* Optional file upload with improved UI */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-indigo-300 mb-2 font-medium">
                    Attach Screenshot (Optional)
                  </label>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isSubmitting}
                />

                {file ? (
                  <div className="mt-2 p-3 bg-gray-800 rounded-lg border border-indigo-800 flex justify-between items-center">
                    <div className="text-indigo-300 truncate">
                      <span className="font-medium">File:</span> {file.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      <RiCloseLargeFill size={20} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleImageButtonClick}
                    className="w-full p-3 bg-gray-800 rounded-lg text-indigo-300 border border-indigo-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Choose an Image
                  </button>
                )}
                <p className="text-gray-400 text-sm mt-1">
                  You can attach a screenshot to help us understand the issue
                  better.
                </p>
              </div>

              {error && <div className="text-red-400 text-sm">{error}</div>}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};

export default ReportIssuesPage;
