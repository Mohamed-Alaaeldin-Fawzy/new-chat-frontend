import React, { useEffect, useRef } from 'react';
import { FaXmark } from 'react-icons/fa6';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalForm = ({ isOpen, onClose, children }: ModalFormProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-40">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div
          className="relative z-50 h-[550px] w-96 transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          ref={modalRef}
        >
          <button
            className="absolute right-3 top-3 rounded-md p-1.5 text-black hover:bg-gray-200"
            onClick={onClose}
            aria-label="Close"
          >
            <FaXmark />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
