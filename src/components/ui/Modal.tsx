import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import IconCross from "@/assets/icons/IconCross.svg?react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRoot = document.getElementById("modal");
  if (!isOpen || !modalRoot) {
    return null;
  }

  return createPortal(
    <div
      onClick={onClose}
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-scale-up relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 dark:border dark:border-gray-800 dark:bg-[#1c1c1c] dark:text-white"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-gray-400 transition hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
        >
          <IconCross className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
