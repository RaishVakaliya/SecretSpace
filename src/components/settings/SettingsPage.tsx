import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useUser as useClerkUser, SignInButton } from "@clerk/clerk-react";
import { useMutation, useConvexAuth } from "convex/react";
import Loader from "../../common/Loader";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import SettingsModals from "./SettingsModals";
import CommonFooter from "../../common/CommonFooter";
import { Authenticated, Unauthenticated } from "convex/react";

const SettingsPage = () => {
  const { user } = useUser();
  const { user: clerkUser } = useClerkUser();
  const { isLoading } = useConvexAuth();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [, setPostToDelete] = useState<Id<"posts"> | null>(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isImageValid, setIsImageValid] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [isSearchable, setIsSearchable] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingPrivacySettings, setIsUpdatingPrivacySettings] =
    useState(false);
  const [isUpdatingEmailSettings, setIsUpdatingEmailSettings] = useState(false);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedFullname, setEditedFullname] = useState("");
  const [editedUsername, setEditedUsername] = useState("");
  const [editedImage, setEditedImage] = useState("");

  // Mutations
  const deleteAccount = useMutation(api.users.deleteAccount);
  const updateUser = useMutation(api.users.updateUser);
  const updatePrivacySettings = useMutation(api.users.updatePrivacySettings);
  const updateEmailSettings = useMutation(api.users.updateEmailSettings);

  // Initialize settings from user data when component mounts
  useEffect(() => {
    if (user) {
      setIsSearchable(user.searchable !== false); // Default to true if not set
      setEmailNotificationsEnabled(user.emailNotifications !== false); // Default to true if not set
    }
  }, [user]);

  // Add function to validate image URL
  const validateImageUrl = (url: string) => {
    if (!url) {
      setIsImageValid(true);
      setPreviewImage(clerkUser?.imageUrl || "");
      return;
    }

    const img = new Image();
    img.onload = () => {
      setIsImageValid(true);
      setPreviewImage(url);
    };
    img.onerror = () => {
      setIsImageValid(false);
      setPreviewImage(clerkUser?.imageUrl || "");
    };
    img.src = url;
  };

  // Validate image URL when it changes
  useEffect(() => {
    validateImageUrl(editedImage);
  }, [editedImage]);

  // Add function to handle edit profile click
  const handleEditProfileClick = () => {
    setEditedFullname(user.fullname);
    setEditedUsername(user.username);
    setEditedImage(user.image || "");
    setPreviewImage(user.image || clerkUser?.imageUrl || "");
    setIsEditing(true);
  };

  // Add function to cancel edit profile
  const cancelEditProfile = () => {
    setIsEditing(false);
    setIsImageValid(true);
  };

  // Update function to save privacy settings
  const savePrivacySettings = async () => {
    setIsUpdatingPrivacySettings(true);
    try {
      await updatePrivacySettings({
        searchable: isSearchable,
      });
    } catch (error) {
      console.error("Error updating privacy settings:", error);
    } finally {
      setIsUpdatingPrivacySettings(false);
    }
  };

  // Add function to save profile changes
  const saveProfileChanges = async () => {
    setIsUpdating(true);
    try {
      // If image URL is invalid, use Clerk's default avatar
      const imageToSave = isImageValid
        ? editedImage
        : clerkUser?.imageUrl || undefined;

      await updateUser({
        fullname: editedFullname,
        username: editedUsername,
        image: imageToSave,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const confirmAccountDelete = async () => {
    setIsDeletingAccount(true);
    setDeleteError(null);
    let convexDeleted = false;

    try {
      // Try to delete from Convex first
      await deleteAccount();
      convexDeleted = true;
    } catch (error) {
      console.error("Error deleting account from Convex:", error);
      // We'll continue with Clerk deletion even if Convex deletion fails
    }

    try {
      // Always attempt to delete from Clerk, regardless of Convex result
      if (clerkUser) {
        await clerkUser.delete();
        // Use window.location for a hard refresh instead of React Router navigation
        window.location.href = "/";
      } else {
        throw new Error("Clerk user not found");
      }
    } catch (clerkError) {
      console.error("Error deleting account from Clerk:", clerkError);

      // Handle the error based on whether Convex deletion succeeded
      if (convexDeleted) {
        setDeleteError(
          "Your account was removed from our database, but we couldn't delete your authentication data. Please contact support."
        );
      } else {
        setDeleteError(
          "We couldn't delete your account. Please try again later or contact support."
        );
      }

      setIsDeletingAccount(false);
      // Keep the modal open so user can see the error
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setPostToDelete(null);
  };

  // Add function to save email notification settings
  const saveEmailSettings = async () => {
    setIsUpdatingEmailSettings(true);
    try {
      await updateEmailSettings({
        emailNotifications: emailNotificationsEnabled,
      });
    } catch (error) {
      console.error("Error updating email settings:", error);
    } finally {
      setIsUpdatingEmailSettings(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="120px" className="text-3xl" />
      </div>
    );
  }

  return (
    <>
      <Authenticated>
        <div className="flex-col min-h-screen">
          <div className="max-w-4xl mx-auto py-12">
            <h2 className="text-4xl font-bold text-white text-center mb-6">
              Settings
            </h2>

            {/* Account Settings Section - Separate Box */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#acb3bc] mb-4">
                Account Settings
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleEditProfileClick}
                    className="edit-profile-button px-4 py-2"
                  >
                    Edit Profile
                  </button>
                  <button onClick={handleLogoutClick} className="logout-button">
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Email Notification Settings - Separate Box */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#acb3bc] mb-4">
                Email Notifications
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-slate-400">Email notifications:</span>
                <div className="checkbox-apple">
                  <input
                    className="yep"
                    id="check-apple"
                    type="checkbox"
                    checked={emailNotificationsEnabled}
                    onChange={() =>
                      setEmailNotificationsEnabled(!emailNotificationsEnabled)
                    }
                  />
                  <label htmlFor="check-apple"></label>
                </div>
              </div>
              {/* Save Button */}
              <div className="mt-4">
                <button
                  onClick={saveEmailSettings}
                  disabled={isUpdatingEmailSettings}
                  className="px-4 py-2 bg-gradient-to-br from-[#024791] via-[#26a3c0] to-[#024791] text-white rounded-md transition flex items-center justify-center"
                >
                  {isUpdatingEmailSettings ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Email Settings"
                  )}
                </button>
              </div>
            </div>

            {/* Privacy Settings Section - Separate Box */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#acb3bc] mb-4">
                Privacy Settings
              </h3>
              <div className="space-y-4">
                {/* Contact Discoverability */}
                <div className="flex items-center ml-5">
                  <label
                    htmlFor="searchable"
                    className="relative text-[#3949AB] flex cursor-pointer items-center gap-2"
                  >
                    <input
                      id="searchable"
                      type="checkbox"
                      checked={isSearchable}
                      onChange={() => setIsSearchable(!isSearchable)}
                      className="peer appearance-none"
                    />
                    <span className="absolute left-0 top-1/2 h-5 w-5 -translate-x-full -translate-y-1/2 rounded-[0.25em] border-[2px] border-[#3949AB]"></span>
                    <svg
                      viewBox="0 0 69 89"
                      className="absolute left-0 top-1/2 h-5 w-5 -translate-x-full -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M.93 63.984c3.436.556 7.168.347 10.147 2.45 4.521 3.19 10.198 8.458 13.647 12.596 1.374 1.65 4.181 5.922 5.598 8.048.267.4-1.31.823-1.4.35-5.744-30.636 9.258-59.906 29.743-81.18C62.29 2.486 63.104 1 68.113 1"
                        strokeWidth="6"
                        stroke="#3949AB"
                        pathLength="100"
                      />
                    </svg>
                    <p className="text-[#acb3bc] select-none">
                      Allow others to send me secret messages.
                    </p>
                  </label>
                </div>

                {/* Save Button */}
                <div className="mt-4">
                  <button
                    onClick={savePrivacySettings}
                    disabled={isUpdatingPrivacySettings}
                    className="px-4 py-2 bg-gradient-to-br from-[#26a3c0] via-[#024791] to-[#26a3c0] text-white rounded-md transition flex items-center justify-center"
                  >
                    {isUpdatingPrivacySettings ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      "Save Privacy Settings"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone - Separate Box */}
            <div className="mt-6 bg-gray-800 rounded-lg shadow-xl p-6">
              <h3 className="text-2xl font-bold text-red-500 mb-4">
                Danger Zone
              </h3>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="flex items-center justify-center gap-2 rounded-full 
             bg-red-600 px-6 py-3 text-white font-semibold 
             shadow-[0_4px_0_#a60000] border-2 border-red-800
             transition-all duration-200 
             hover:bg-red-700 hover:shadow-[0_2px_0_#a60000] hover:translate-y-0.5
             active:translate-y-1 active:shadow-none"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#fff"
                      strokeWidth="1.5"
                    ></circle>
                    <path
                      d="M9 17C9.85 16.37 10.88 16 12 16C13.12 16 14.15 16.37 15 17"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                    <ellipse
                      cx="15"
                      cy="10.5"
                      rx="1"
                      ry="1.5"
                      fill="#fff"
                    ></ellipse>
                    <ellipse
                      cx="9"
                      cy="10.5"
                      rx="1"
                      ry="1.5"
                      fill="#fff"
                    ></ellipse>
                  </svg>
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          <SettingsModals
            isEditing={isEditing}
            showDeleteConfirmation={showDeleteConfirmation}
            showLogoutConfirmation={showLogoutConfirmation}
            cancelEditProfile={cancelEditProfile}
            cancelDelete={cancelDelete}
            cancelLogout={cancelLogout}
            confirmAccountDelete={confirmAccountDelete}
            isDeletingAccount={isDeletingAccount}
            isUpdating={isUpdating}
            editedFullname={editedFullname}
            setEditedFullname={setEditedFullname}
            editedUsername={editedUsername}
            setEditedUsername={setEditedUsername}
            editedImage={editedImage}
            setEditedImage={setEditedImage}
            isImageValid={isImageValid}
            previewImage={previewImage}
            saveProfileChanges={saveProfileChanges}
          />
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
              Settings
            </h2>
            <p className="text-center text-white max-w-2xl mx-auto">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 max-w-4xl mx-auto">
            <div className="text-center py-10">
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V9m0 0V7m0 2h2m-2 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Authentication Required
              </h3>
              <p className="text-white mb-6 max-w-md mx-auto">
                You need to sign in to access your account settings. Sign in to
                continue.
              </p>
              <SignInButton mode="modal">
                <button className="px-6 py-3 text-black bg-white  hover:bg-gray-400 font-medium rounded-md transition-colors shadow-lg">
                  Sign In to Continue
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </Unauthenticated>
      <CommonFooter />
    </>
  );
};

export default SettingsPage;
