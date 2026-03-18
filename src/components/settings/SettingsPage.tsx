import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useMutation, useConvexAuth } from "convex/react";
import Loader from "../../common/Loader";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import SettingsModals from "./SettingsModals";
import CommonFooter from "../../common/CommonFooter";
import { Authenticated, Unauthenticated } from "convex/react";
import useScrollToTop from "../../hooks/useScrollToTop";
import UnauthenticatedView from "../../common/UnauthenticatedView";

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

  const deleteAccount = useMutation(api.users.deleteAccount);
  const updateUser = useMutation(api.users.updateUser);
  const updatePrivacySettings = useMutation(api.users.updatePrivacySettings);
  const updateEmailSettings = useMutation(api.users.updateEmailSettings);

  useScrollToTop();

  useEffect(() => {
    if (user) {
      setIsSearchable(user.searchable !== false);
      setEmailNotificationsEnabled(user.emailNotifications !== false);
    }
  }, [user]);

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

  useEffect(() => {
    validateImageUrl(editedImage);
  }, [editedImage]);

  const handleEditProfileClick = () => {
    setEditedFullname(user.fullname);
    setEditedUsername(user.username);
    setEditedImage(user.image || "");
    setPreviewImage(user.image || clerkUser?.imageUrl || "");
    setIsEditing(true);
  };

  const cancelEditProfile = () => {
    setIsEditing(false);
    setIsImageValid(true);
  };

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

  const saveProfileChanges = async () => {
    setIsUpdating(true);
    try {
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
      await deleteAccount();
      convexDeleted = true;
    } catch (error) {
      console.error("Error deleting account from Convex:", error);
    }

    try {
      if (clerkUser) {
        await clerkUser.delete();
        window.location.href = "/";
      } else {
        throw new Error("Clerk user not found");
      }
    } catch (clerkError) {
      console.error("Error deleting account from Clerk:", clerkError);

      if (convexDeleted) {
        setDeleteError(
          "Your account was removed from our database, but we couldn't delete your authentication data. Please contact support.",
        );
      } else {
        setDeleteError(
          "We couldn't delete your account. Please try again later or contact support.",
        );
      }

      setIsDeletingAccount(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setPostToDelete(null);
  };

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
          <div className="max-w-4xl mx-auto py-12 px-4 shadow-sm">
            <h2 className="text-4xl font-bold text-indigo-100 text-center mb-10 tracking-tight">
              Settings
            </h2>

            <div className="bg-[#0f111a] backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 border border-[#1e2235]">
              <h3 className="text-xl font-semibold text-indigo-300 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                Account Settings
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleEditProfileClick}
                    className="px-6 py-2.5 bg-indigo-700 hover:bg-indigo-600 active:scale-95 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 font-medium rounded-xl transition-all border border-slate-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#0f111a] backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 border border-[#1e2235]">
              <h3 className="text-xl font-semibold text-indigo-300 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                Email Notifications
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-slate-300 font-medium">
                  Get notifications for new messages:
                </span>
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
                  <label
                    htmlFor="check-apple"
                    className="cursor-pointer"
                  ></label>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={saveEmailSettings}
                  disabled={isUpdatingEmailSettings}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center justify-center shadow-lg shadow-indigo-900/20"
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

            <div className="bg-[#0f111a] backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 border border-[#1e2235]">
              <h3 className="text-xl font-semibold text-indigo-300 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                Privacy Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center px-2">
                  <label
                    htmlFor="searchable"
                    className="relative text-[#3949AB] flex cursor-pointer items-center justify-between group"
                  >
                    <p className="text-[#acb3bc] select-none pr-8">
                      Allow others to send me secret messages:
                    </p>
                    <input
                      id="searchable"
                      type="checkbox"
                      checked={isSearchable}
                      onChange={() => setIsSearchable(!isSearchable)}
                      className="peer appearance-none"
                    />
                    <span className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-[0.25em] border-[2px] border-[#3949AB]"></span>
                    <svg
                      viewBox="0 0 69 89"
                      className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
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
                  </label>
                </div>

                <div className="mt-6">
                  <button
                    onClick={savePrivacySettings}
                    disabled={isUpdatingPrivacySettings}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center justify-center shadow-lg shadow-indigo-900/20"
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

            <div className="mt-12 bg-rose-950/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-rose-900/30">
              <h3 className="text-2xl font-bold text-rose-400 mb-6 flex items-center gap-3">
                Danger Zone
              </h3>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p className="text-rose-200/60 max-w-md text-sm">
                  Once you delete your account, there is no going back. All your
                  confessions and secret messages will be permanently deleted.
                </p>
                <button
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="group flex items-center justify-center gap-2 rounded-xl 
             bg-rose-600 hover:bg-rose-500 px-8 py-3 text-white font-bold 
             shadow-lg shadow-rose-900/40 transition-all active:scale-95"
                >
                  Delete Account
                </button>
              </div>

              {deleteError && (
                <div className="mt-4 p-4 bg-rose-900/30 border border-rose-800 rounded-xl text-rose-200 text-sm">
                  {deleteError}
                </div>
              )}
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
        <UnauthenticatedView
          pageTitle="Settings"
          boxDescription="You need to sign in to access your account settings and manage your profile."
          boxColorClass="bg-gradient-to-br from-[#0f111a] via-[#1a1c3a] to-[#0f111a] border-[#2d2f5a] shadow-indigo-500/20"
          buttonColorClass="bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/40"
          iconColorClass="text-indigo-400"
        />
      </Unauthenticated>
      <CommonFooter />
    </>
  );
};

export default SettingsPage;
