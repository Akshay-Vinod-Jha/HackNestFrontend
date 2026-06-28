import Modal from './Modal';
import LoadingButton from './LoadingButton';

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  isLoading = false
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="mb-8">
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
      
      <div className="flex gap-3 justify-end mt-4">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {cancelText}
        </button>
        <LoadingButton
          onClick={onConfirm}
          isLoading={isLoading}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98] shadow-sm ${
            isDestructive 
              ? 'bg-rose-600 hover:bg-rose-700' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {confirmText}
        </LoadingButton>
      </div>
    </Modal>
  );
}
