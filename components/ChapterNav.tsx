'use client';

import { useState } from "react";
// import ChatWidget from "./ChatWidget";
const chapters = [
  { number: 1, title: 'Skagen før og nu' },
  { number: 2, title: 'Om en skagensmaler' },
  { number: 3, title: 'Skærmoptagelse' },
  { number: 4, title: 'En blå sommeraften' },
  { number: 5, title: 'Skagensmalerne' },
];

const ACTIVE_CHAPTER = 2;

const btnBase = 'w-12 h-12 hover:bg-[#e0e0e0] flex items-center justify-center text-xl cursor-default select-none rounded-full shadow-md shadow-gray-300 bg-white text-gray-700';

export default function ChapterNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChat = () => {
    console.log('Chat widget toggled', isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-col gap-1.5 p-3 flex-1">
      {/* Home button */}
      <button disabled aria-label="Hjem" className={btnBase}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>

      {/* Chapter buttons */}
      {chapters.map((chapter) => {
        const isActive = chapter.number === ACTIVE_CHAPTER;
        return (
          <button
            key={chapter.number}
            disabled
            aria-current={isActive ? 'page' : undefined}
            className={[
              'w-12 h-12 text-center px-3 py-2.5 text-xl cursor-default select-none rounded-full shadow-md shadow-gray-300 font-black',
              isActive
                ? 'bg-[#5f0000] text-white'
                : 'bg-white text-gray-700 hover:bg-[#e0e0e0]',
            ].join(' ')}
          >
            {chapter.number}
          </button>
        );
      })}
    </nav>
  );
}
