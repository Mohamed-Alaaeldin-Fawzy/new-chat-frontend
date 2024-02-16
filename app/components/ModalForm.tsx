import React from 'react';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const ModalForm = ({ isOpen, onClose, children }: ModalFormProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 overflow-auto bg-black bg-opacity-40">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="relative z-50 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <button
            className="absolute right-3 top-3 rounded-md p-1.5 text-black hover:bg-gray-200"
            onClick={onClose}
          >
            &#x2715; {/* Close button (X) */}
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
