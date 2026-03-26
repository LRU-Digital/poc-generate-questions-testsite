'use client';

import { Dialog, DialogPanel } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-150">
      <div className="fixed inset-0 bg-gray-900/80 grid items-center p-2 sm:p-4" aria-hidden="true" />
      <div className="fixed inset-0 grid items-center p-2 sm:p-4">
        <DialogPanel className="relative mx-auto flex w-full max-w-2xl max-h-[90vh] flex-col rounded bg-white p-4 sm:p-6 shadow-xl shadow-gray-900/20">
          <button
            onClick={onClose}
            aria-label="Luk modal"
            title="Luk modal"
            type="button"
            className="absolute top-3 right-3 inline-flex items-center justify-center select-none h-8 w-8 bg-white text-gray-900 hover:bg-gray-100 active:bg-white active:shadow-inner active:shadow-gray-900/25 rounded-full flex-none z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4 pointer-events-none">
              <path fillRule="evenodd" d="M1.533 16c.415 0 .812-.162 1.083-.451L7.99 10.13l5.393 5.418c.271.27.632.451 1.065.451.848 0 1.533-.686 1.533-1.535 0-.433-.18-.795-.451-1.083L10.137 8l5.412-5.436A1.37 1.37 0 0 0 16 1.517 1.53 1.53 0 0 0 14.467 0c-.397 0-.722.144-1.028.47L7.99 5.887 2.579.487a1.402 1.402 0 0 0-1.046-.45C.685.036 0 .703 0 1.534c0 .415.18.795.469 1.047L5.844 8 .47 13.418c-.29.27-.47.632-.47 1.047C0 15.314.685 16 1.533 16Z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="overflow-y-auto flex-1 min-h-0">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
