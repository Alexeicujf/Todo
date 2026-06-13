import { type ReactNode } from "react"
import { createPortal } from "react-dom";
import IconCross from "@/assets/icons/IconCross.svg?react";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
    children: ReactNode,
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const modalRoot = document.getElementById("modal");
    if (!isOpen || !modalRoot) {
        return null
    }

    return createPortal(
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <button onClick={onClose} className="absolute right-3 top-3 text-gray-500 transition hover:text-black">
                    <IconCross className="w-6 h-6" />
                </button>
                {children}
            </div>
        </div>,
        modalRoot
    )
}