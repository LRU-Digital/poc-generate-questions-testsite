'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { trackEvent } from '@/lib/trackEvent';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: {
    questions: Array<{
      heading: string;
      options: string[];
    }>;
  };
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (elementId: string, heading: string, index: number) => {
    const element = document.getElementById(elementId);
    if (element) {
      const text = element.innerText;
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(elementId);
        setTimeout(() => setCopiedId(null), 2000);
        trackEvent({
          event: 'copy_button_click',
          category: 'questions_modal',
          label: heading,
          question_index: index + 1,
        });
      });
    }
  };

  const renderChildrenWithCopy = (children: any): React.ReactNode => {
    if (typeof children !== 'object' || !children.questions) {
      return children;
    }

    return (
      <div className="space-y-6">
        {children.questions.map((questionGroup: any, index: number) => (
          <div key={`question-group-${index}`} className="relative">
            <div id={`copyable-${index}`} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {questionGroup.heading}
              </h3>
              <ol className="list-decimal list-inside space-y-2">
                {questionGroup.options.map((option: string, optionIndex: number) => (
                  <li key={`option-${index}-${optionIndex}`} className="text-gray-700 leading-relaxed">
                    {option}
                  </li>
                ))}
              </ol>
            </div>
            <button
              onClick={() => copyToClipboard(`copyable-${index}`, questionGroup.heading, index)}
              className="mt-2 inline-flex items-center gap-1 px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
              title="Kopier til udklipsholder"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              {copiedId === `copyable-${index}` ? 'Kopieret!' : 'Kopier'}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-150">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/80 grid items-center p-2 sm:p-4" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 grid items-center p-2 sm:p-4">
        <DialogPanel className="relative mx-auto flex w-full max-w-2xl max-h-[90vh] flex-col gap-2 rounded bg-white p-4 sm:p-6 shadow-xl shadow-gray-900/20">
          

          {/* Content */}
          <div className="overflow-y-auto flex-1 min-h-0">
            {renderChildrenWithCopy(children)}
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
