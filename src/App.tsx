import "./App.css";
import NavBar from "./components/layout/NavBar";
import ConfessionsPage from "./components/confessions/ConfessionsPage";
import PostConfessionPage from "./components/confessions/PostConfessionPage";
import SecretMessagesPage from "./components/messages/SecretMessagesPage";
import ViewSecretMessagePage from "./components/messages/ViewSecretMessagePage";
import ProfilePage from "./components/profile/ProfilePage";
import SettingsPage from "./components/settings/SettingsPage";
import InboxPage from "./components/inbox/InboxPage";

// pages route
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import HelpPage from "./pages/HelpPage";
import FeaturesPage from "./pages/feature/FeaturePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import SecurityCenterPage from "./pages/SecurityCenterPage";
import FeedbackPage from "./pages/FeedbackPage";
import CommunityGuidelinesPage from "./pages/CommunityGuidelinesPage";
import ReportIssuesPage from "./pages/ReportIssuesPage";

import { Authenticated } from "convex/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page Route - No NavBar */}
        <Route path="/" element={<LandingPage />} />

        {/* Main App Routes with NavBar */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-[#212529] flex flex-col">
              <NavBar />
              <main className="pt-20 flex-grow">
                {" "}
                {/* Adjusted padding for horizontal navbar */}
                <Routes>
                  <Route path="home" element={<HomePage />} />
                  <Route path="confessions" element={<ConfessionsPage />} />
                  <Route
                    path="post-confession"
                    element={<PostConfessionPage />}
                  />
                  <Route
                    path="secret-messages"
                    element={<SecretMessagesPage />}
                  />
                  <Route
                    path="secret-messages/:uuid"
                    element={<ViewSecretMessagePage />}
                  />
                  <Route
                    path="profile"
                    element={
                      <Authenticated>
                        <ProfilePage />
                      </Authenticated>
                    }
                  />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="inbox" element={<InboxPage />} />
                  <Route path="help" element={<HelpPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactUsPage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicyPage />}
                  />
                  <Route
                    path="/security-center"
                    element={<SecurityCenterPage />}
                  />
                  <Route path="/feedback" element={<FeedbackPage />} />
                  <Route
                    path="/community-guidelines"
                    element={<CommunityGuidelinesPage />}
                  />
                  <Route path="/report-issues" element={<ReportIssuesPage />} />

                  {/* Catch all other routes and redirect to home */}
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
