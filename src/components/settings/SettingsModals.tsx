import React from "react";
import { SignOutButton } from "@clerk/clerk-react";

interface Props {
  isEditing: boolean;
  showDeleteConfirmation: boolean;
  showLogoutConfirmation: boolean;
  cancelEditProfile: () => void;
  cancelDelete: () => void;
  cancelLogout: () => void;
  confirmAccountDelete: () => Promise<void>;
  isDeletingAccount: boolean;
  isUpdating: boolean;
  editedFullname: string;
  setEditedFullname: (val: string) => void;
  editedUsername: string;
  setEditedUsername: (val: string) => void;
  editedImage: string;
  setEditedImage: (val: string) => void;
  isImageValid: boolean;
  previewImage: string;
  saveProfileChanges: () => Promise<void>;
}

const SettingsModals: React.FC<Props> = ({
  isEditing,
  showDeleteConfirmation,
  showLogoutConfirmation,
  cancelEditProfile,
  cancelDelete,
  cancelLogout,
  confirmAccountDelete,
  isDeletingAccount,
  isUpdating,
  editedFullname,
  setEditedFullname,
  editedUsername,
  setEditedUsername,
  editedImage,
  setEditedImage,
  isImageValid,
  previewImage,
  saveProfileChanges,
}) => {
  return (
    <>
      {/* Account Deletion Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="modalbg p-6 rounded-lg shadow-xl max-w-md w-full border modalBorder">
            <h3 className="text-xl font-bold text-red-500 mb-4">
              Delete Account
            </h3>
            <p className="text-white mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently removed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-600 text-[#dae0e6] rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmAccountDelete}
                className="px-4 py-2 bg-red-600 text-[#dae0e6] rounded-md hover:bg-red-700 flex items-center"
                disabled={isDeletingAccount}
              >
                {isDeletingAccount ? (
                  <>
                    <div className="animate-spin rounded-full text-[#dae0e6] h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  "Delete Account"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="modalbg p-6 rounded-lg shadow-xl max-w-md w-full border modalBorder">
            <h3 className="text-xl font-bold text-red-500 mb-4">
              Logout Confirmation
            </h3>
            <p className="text-[#dae0e6] mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-600 text-[#dae0e6] rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <SignOutButton>
                <button className="px-4 py-2 bg-red-600 text-[#dae0e6] rounded-md hover:bg-red-700">
                  Logout
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="modalbg p-6 rounded-lg shadow-xl max-w-md w-full border modalBorder">
            <h3 className="text-xl font-bold text-[#dae0e6] mb-4">
              Edit Profile
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#dae0e6] mb-2">Full Name</label>
                <input
                  type="text"
                  value={editedFullname}
                  onChange={(e) => setEditedFullname(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[#dae0e6] mb-2">Username</label>
                <input
                  type="text"
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[#dae0e6] mb-2">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  value={editedImage}
                  onChange={(e) => setEditedImage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {!isImageValid && (
                  <p className="text-red-500 text-sm mt-1">
                    Invalid image URL. Default avatar will be used.
                  </p>
                )}
              </div>
              {previewImage && (
                <div className="mt-2">
                  <p className="text-[#dae0e6] mb-2">Preview:</p>
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={cancelEditProfile}
                  className="px-4 py-2 bg-gray-600 text-[#dae0e6] rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProfileChanges}
                  className="px-4 py-2 bg-[#36c7f3] text-black font-semibold rounded-md hover:bg-[#00c3ff] flex items-center"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModals;
