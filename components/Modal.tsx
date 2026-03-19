'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/80 grid items-center p-2 sm:p-4" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 grid items-center p-2 sm:p-4">
        <DialogPanel className="relative mx-auto flex w-full max-w-2xl max-h-[90vh] flex-col gap-2 rounded bg-white p-4 sm:p-6 shadow-xl shadow-gray-900/20">
          

          {/* Content */}
          <div className="overflow-y-auto flex-1 min-h-0">
            {children}
          </div>
          {/* Close button */}
          <button
              onClick={onClose}
              type="button"
              className="h-9 max-w-full px-4 py-2 rounded inline-flex gap-2 text-sm text-center leading-5 items-center select-none active:shadow-inner active:shadow-gray-900/25 bg-[#5f0000] text-white hover:bg-[#7f0000] active:bg-[#5f0000] self-end"
          >
            <span className="truncate font-black cursor-pointer">Luk</span>
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
