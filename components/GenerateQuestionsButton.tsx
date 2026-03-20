'use client';

import { useState } from 'react';
import Modal from './Modal';
import { sampleQuestions } from '@/data/sampleQuestions';
import Popup from "./Popup";
import Image from "next/image";

export default function GenerateQuestionsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatMarkdownContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactElement[] = [];
    let currentSection: React.ReactElement[] = [];
    let sectionKey = 0;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('## ')) {
        // New section header
        if (currentSection.length > 0) {
          elements.push(
            <div key={`section-${sectionKey}`} className="flex flex-col gap-3 mb-6">
              {currentSection}
            </div>
          );
          currentSection = [];
          sectionKey++;
        }
        currentSection.push(
          <h2 key={`h3-${index}`} className="text-xl font-bold text-gray-900 mb-0">
            {trimmedLine.replace('## ', '')}
          </h2>
        );
      } else if (trimmedLine.match(/^\d+\./)) {
        // Numbered list item - add to a questions container
        if (currentSection.length > 0 && currentSection[currentSection.length - 1].key?.toString().startsWith('questions-')) {
          // Already have a questions container, skip
        } else {
          // Need to collect all questions and create container
          const questionsStartIndex = index;
          const questions: string[] = [];
          
          // Collect consecutive numbered items
          for (let i = index; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.match(/^\d+\./)) {
              questions.push(line);
            } else if (line === '') {
              continue;
            } else {
              break;
            }
          }
          
          currentSection.push(
            <div key={`questions-${questionsStartIndex}`} className="bg-gray-50 border border-gray-200 rounded-lg p-4 ml-4">
              <ol className="list-none space-y-3 pl-0">
                {questions.map((q, qIdx) => {
                  const match = q.match(/^(\d+)\.\s*(.*)/);
                  const text = match ? match[2] : q;
                  return (
                    <li key={qIdx} className="flex gap-3">
                      <span className="font-bold text-gray-900 min-w-[24px]">
                        {qIdx + 1}.
                      </span>
                      <span className="text-gray-700 leading-relaxed flex-1">
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        }
      } else if (trimmedLine === '') {
        // Empty line - skip
      } else {
        // Regular text
        currentSection.push(
          <p key={`p-${index}`} className="text-gray-700 mb-2 leading-relaxed">
            {trimmedLine}
          </p>
        );
      }
    });

    // Add last section
    if (currentSection.length > 0) {
      elements.push(
        <div key={`section-${sectionKey}`} className="flex flex-col gap-3 mb-6">
          {currentSection}
        </div>
      );
    }

    return <div className="flex flex-col gap-6">{elements}</div>;
  };

  return (
    <>
       <span className="relative">
          <Popup />
        </span>
      <button
        onClick={() => setIsModalOpen(true)}
        className="z-100 h-10 max-w-full px-5 py-2.5 rounded inline-flex gap-2 text-base text-center leading-5 items-center select-none active:shadow-inner active:shadow-gray-900/25 text-gray-900 bg-gray-200 hover:bg-gray-300 active:bg-white whitespace-nowrap flex-shrink-0 cursor-pointer"
      >
       
        <span className="truncate font-black">Generér spørgsmål til teksten</span> <Image src="/sparkles-pink.png" alt="AI icon" width={20} height={20} />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Genererede spørgsmål"
      >
        <div className="space-y-2">
          {formatMarkdownContent(sampleQuestions)}
        </div>
      </Modal>
    </>
  );
}
