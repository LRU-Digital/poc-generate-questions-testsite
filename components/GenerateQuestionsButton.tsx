'use client';

import { useState, useRef } from 'react';
import Modal from './Modal';
import { revisedSampleQuestionsJson } from '@/data/revised_question_data';
import Popup from './Popup';
import Image from 'next/image';
import { trackEvent } from '@/lib/trackEvent';

const questionsData = revisedSampleQuestionsJson.response;

export default function GenerateQuestionsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(true);
  const [enabledSections, setEnabledSections] = useState({ mc: true, tf: true, input: true, open: true });
  const printRef = useRef<HTMLDivElement>(null);

  const toggleSection = (key: keyof typeof enabledSections) => {
    setEnabledSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Spørgsmål</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: Arial, sans-serif; font-size: 14px; color: #111; padding: 32px; }
            h2, h3 { font-size: 1.125rem; font-weight: 900; line-height: 1.25; margin: 20px 0 16px; }
            p.obs { font-weight: 600; margin-bottom: 16px; }
            .border { border: 1px solid; }
            .border-gray-200 { border-color: #e5e7eb; }
            .border-gray-300 { border-color: #d1d5db; }
            .border-gray-400 { border-color: #9ca3af; }
            .rounded-lg { border-radius: 0.5rem; }
            .rounded-full { border-radius: 9999px; }
            .p-4 { padding: 1rem; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
            .py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .bg-white { background-color: #fff; }
            .bg-gray-50 { background-color: #f9fafb; }
            .font-semibold { font-weight: 600; }
            .text-gray-800 { color: #1f2937; }
            .text-gray-700 { color: #374151; }
            .text-gray-500 { color: #6b7280; }
            .text-sm { font-size: 0.875rem; }
            .text-xs { font-size: 0.75rem; }
            .font-bold { font-weight: 700; }
            .italic { font-style: italic; }
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .gap-2 { gap: 0.5rem; }
            .gap-3 { gap: 0.75rem; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .flex-shrink-0 { flex-shrink: 0; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .w-6 { width: 1.5rem; }
            .h-6 { height: 1.5rem; }
            table { width: 100%; border-collapse: collapse; font-size: 0.875rem; margin-top: 0.375rem; break-inside: avoid; }
            th, td { border: 1px solid #d1d5db; padding: 0.5rem 0.625rem; }
            th { background: #f3f4f6; font-weight: 600; text-align: left; }
            td.text-center, th.text-center { text-align: center; width: 80px; }
            .print-answer-line { border-bottom: 2px solid #9ca3af; width: 100%; height: 1.25rem; margin-top: 1.25rem; }
            .print-question { break-inside: avoid; }
            .print-disabled { display: none !important; }
            @media print { body { padding: 12px; } }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <>
      <span className="relative">
        <Popup visible={popupVisible} setVisible={setPopupVisible} />
      </span>
      <button
        onClick={() => {
          trackEvent({ event: 'generate_questions' });
          setIsModalOpen(true);
          setPopupVisible(false);
        }}
        className="z-150 h-10 max-w-full px-5 py-2.5 rounded inline-flex gap-2 text-base text-center leading-5 items-center select-none active:shadow-inner active:shadow-gray-900/25 text-gray-900 bg-gray-200 hover:bg-gray-300 active:bg-white whitespace-nowrap flex-shrink-0 cursor-pointer"
      >
        <span className="truncate font-black">Generér spørgsmål til teksten</span>
        <Image src="/sparkles-pink.png" alt="AI icon" width={20} height={20} />
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-6">
          {/* Print icon button */}
          <button
            onClick={handlePrint}
            aria-label="Print spørgsmål"
            title="Print spørgsmål"
            className="absolute top-3 right-16 inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 text-gray-600 print-disabled"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
          </button>

          <h1 className="text-2xl font-black leading-tight">Ekstra spørgsmål</h1>
          <p className="font-bold">Obs! Disse spørgsmål er AI-genereret.</p>

          <div ref={printRef} className="flex flex-col gap-8">

            {/* Multiple Choice */}
            {questionsData.multiple_choice?.length > 0 && (
              <div className={`flex flex-col gap-1${!enabledSections.mc ? ' print-disabled decoration-gray-200' : ''}`}>
                <div className="flex items-center gap-2">
                  <h3
                    contentEditable
                    suppressContentEditableWarning
                    className={`text-xl leading-tight font-black mb-0${!enabledSections.mc ? ' line-through' : ''}`}
                  >
                    Opgave 1
                  </h3>
                </div>
                <p className="print-disabled">
                  <input 
                    type="checkbox" checked={enabledSections.mc} onChange={() => toggleSection('mc')} className="mb-0 w-4 h-4 cursor-pointer print-disabled" 
                    onClick={() => trackEvent({ event: enabledSections.mc ? 'multiple_choice_disable_print' : 'multiple_choice_enable_print' })}
                  />
                  {' '}<span className="inline-block">Medtag i print</span>
                </p>
                <div className={!enabledSections.mc ? 'hidden' : ''}>
                  <p contentEditable suppressContentEditableWarning className="text-sm text-gray-500 italic">Sæt ring om det rigtige svar.</p>
                  <div className="flex flex-col gap-4">
                    {questionsData.multiple_choice.map((q, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white" onClick={() => trackEvent({ event: 'multiple_choice_question_click', question_index: index })}>
                        <p contentEditable suppressContentEditableWarning className="font-semibold text-gray-800 mb-3">
                          {index + 1}. {q.question}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {q.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              contentEditable
                              suppressContentEditableWarning
                              className="flex items-center gap-2 border rounded-full px-3 py-1.5 text-sm border-gray-300 bg-gray-50 text-gray-700"
                            >
                              <span className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold border-gray-400 text-gray-500">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* True / False */}
            {questionsData.true_false?.length > 0 && (
              <div className={`flex flex-col gap-3 print-question${!enabledSections.tf ? ' print-disabled' : ''}`}>
                <div className="flex items-center gap-2">
                  <h3
                    contentEditable
                    suppressContentEditableWarning
                    className={`text-xl leading-tight font-black mb-0${!enabledSections.tf ? ' line-through' : ''}`}
                  >
                    Opgave 2
                  </h3>
                </div>
                <p className="print-disabled">
                  <input 
                    type="checkbox" checked={enabledSections.tf} onChange={() => toggleSection('tf')} className="mb-0 w-4 h-4 cursor-pointer print-disabled" 
                    onClick={() => trackEvent({ event: enabledSections.tf ? 'true_false_disable_print' : 'true_false_enable_print' })}
                  />
                  {' '}<span className="inline-block">Medtag i print</span>
                </p>
                <div className={!enabledSections.tf ? 'hidden' : ''} onClick={() => trackEvent({ event: 'true_false_question_click' })}>
                  <p className="text-sm text-gray-500 italic">Sæt kryds i enten "Sandt" eller "Falsk".</p>
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-2 border border-gray-300 font-semibold" contentEditable suppressContentEditableWarning>Spørgsmål</th>
                        <th className="text-center p-2 border border-gray-300 font-semibold w-20" contentEditable suppressContentEditableWarning>Sandt</th>
                        <th className="text-center p-2 border border-gray-300 font-semibold w-20" contentEditable suppressContentEditableWarning>Falsk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionsData.true_false.map((q, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-2 border border-gray-300 text-gray-700" contentEditable suppressContentEditableWarning>{q.question}</td>
                          <td className="p-2 border border-gray-300 text-center text-green-700 font-semibold"></td>
                          <td className="p-2 border border-gray-300 text-center text-red-600 font-semibold"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Input */}
            {questionsData.input?.length > 0 && (
              <div className={`flex flex-col gap-3 print-question${!enabledSections.input ? ' print-disabled bg-gray-100' : ''}`}>
                <div className="flex items-center gap-2">
                  <h3
                    contentEditable
                    suppressContentEditableWarning
                    className={`text-xl leading-tight font-black mb-0${!enabledSections.input ? ' line-through' : ''}`}
                  >
                    Opgave 3
                  </h3>
                </div>
                <p className="print-disabled">
                  <input 
                    type="checkbox" checked={enabledSections.input} onChange={() => toggleSection('input')} className="mb-0 w-4 h-4 cursor-pointer print-disabled" 
                    onClick={() => trackEvent({ event: enabledSections.input ? 'one_line_free_text_disable_print' : 'one_line_free_text_enable_print' })}
                  />
                  {' '}<span className="inline-block">Medtag i print</span>
                </p>
                <div className={!enabledSections.input ? 'hidden' : ''} onClick={() => trackEvent({ event: 'one_line_free_text_question_click' })}>
                  <p className="text-sm text-gray-500 italic" contentEditable suppressContentEditableWarning>Skriv svaret på linjen.</p>
                  <div className="flex flex-col gap-5">
                    {questionsData.input.map((q, index) => (
                      <div key={index} className="flex flex-col gap-2" contentEditable suppressContentEditableWarning>
                        <p className="font-semibold text-gray-800">{index + 1}. {q.question}</p>
                        <div className="print-answer-line border-b-2 border-gray-400 w-full mt-5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Open Ended */}
            {questionsData.open_ended?.length > 0 && (
              <div className={`flex flex-col gap-3 print-question${!enabledSections.open ? ' print-disabled bg-gray-100' : ''}`}>
                <div className="flex items-center gap-2">
                  <h3
                    contentEditable
                    suppressContentEditableWarning
                    className={`text-xl leading-tight font-black mb-0${!enabledSections.open ? ' line-through' : ''}`}
                  >
                    Opgave 4
                  </h3>
                </div>
                <p className="print-disabled">
                  <input 
                    type="checkbox" checked={enabledSections.open} onChange={() => toggleSection('open')} className="mb-0 w-4 h-4 cursor-pointer print-disabled" 
                    onClick={() => trackEvent({ event: enabledSections.open ? 'multiple_line_free_text_disable_print' : 'multiple_line_free_text_enable_print' })}
                  />
                  {' '}<span className="inline-block">Medtag i print</span>
                </p>
                <div className={!enabledSections.open ? 'hidden' : ''} onClick={() => trackEvent({ event: 'multiple_line_free_text_question_click' })}>
                  <p className="text-sm text-gray-500 italic" contentEditable suppressContentEditableWarning>Skriv dit svar på linjerne.</p>
                  <div className="flex flex-col gap-6">
                    {questionsData.open_ended.map((q, index) => (
                      <div key={index} className="flex flex-col gap-3">
                        <p className="font-semibold text-gray-800" contentEditable suppressContentEditableWarning>
                          {index + 1}. {q.question}
                        </p>
                        <div className="flex flex-col gap-3 mt-1">
                          {Array.from({ length: 5 }).map((_, lineIndex) => (
                            <div key={lineIndex} className="print-answer-line border-b border-gray-400 w-full h-5" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={handlePrint}
              className="h-9 px-4 py-2 rounded inline-flex gap-2 text-sm leading-5 items-center select-none bg-[#5f0000] text-white hover:bg-[#7f0000] active:bg-[#5f0000]"
            >
              <span className="font-black">Udskriv</span>
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="h-9 px-4 py-2 rounded inline-flex gap-2 text-sm leading-5 items-center select-none bg-gray-200 text-gray-900 hover:bg-gray-300"
            >
              <span className="font-black">Luk</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
