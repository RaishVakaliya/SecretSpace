import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
}

const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  isDeleting,
  title,
  message,
  confirmLabel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="modalbg p-6 rounded-lg shadow-xl border modalBorder max-w-md w-full">
        <h3 className="text-xl font-semibold text-[#dae0e6] mb-4">{title}</h3>
        <p className="text-white mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 text-[#dae0e6] rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-[#dae0e6] rounded-md hover:bg-red-700 transition flex items-center justify-center"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full text-[#dae0e6] h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
