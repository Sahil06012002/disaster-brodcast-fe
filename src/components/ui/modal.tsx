import React from "react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onPositive?: (data?: any) => void;
  positiveLabel?: string;
  onNegative?: (data?: any) => void;
  negativeLabel?: string;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  onPositive,
  positiveLabel = "Submit",
  onNegative,
  negativeLabel = "Cancel",
  title,
  children,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 relative py-10">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && (
          <div className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            {title}
          </div>
        )}
        <div className="px-6 pb-6 pt-2">{children}</div>
        <div className="px-6 pb-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onNegative || onClose}>
            {negativeLabel}
          </Button>
          <Button
            className="bg-red-700"
            variant="destructive"
            onClick={onPositive}
          >
            {positiveLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
