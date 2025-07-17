import React, { useEffect, useRef } from "react";

export default function ModalWrapper({ children, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div ref={modalRef} className="bg-[#900000] w-full max-w-sm rounded-xl shadow-lg p-4 sm:p-6 relative animate-fadeInScale">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl text-white hover:text-black">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
