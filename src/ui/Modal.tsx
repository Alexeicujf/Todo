import { type ReactNode } from "react"
import { createPortal } from "react-dom";
interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
    children: ReactNode, 
    onDicription: (text: string) => void;
}

export const Modal = ({isOpen, onClose,children}: ModalProps) => {
    const modalRoot = document.getElementById("modal");
    if (!isOpen ||  !modalRoot) {
        return null
    }

    
    return createPortal(<div onClick={onClose}  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <button onClick={onClose} className="absolute right-3 top-3 text-gray-500 transition hover:text-black">
  <svg width="28" height="28" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="#000"></path>
</svg>
</button>
            {children}
        </div>
    </div>, modalRoot)
}

/// Описание текста эрия и фаил модал не модифицировать