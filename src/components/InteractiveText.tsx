import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { DifficultWord } from '../types';
import { GlossaryModal } from './GlossaryModal';

interface InteractiveTextProps {
  text: string;
  vocabulary: DifficultWord[];
  prophetName: string;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({ text, vocabulary, prophetName }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<DifficultWord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWordClick = (word: DifficultWord) => {
    setSelectedWord(word);
    setIsModalOpen(true);
  };

  // Combine prophet name and vocabulary for matching
  const wordsToMatch = [
    { word: prophetName, meaning: 'نبي من أنبياء الله الكرام عليهم السلام', id: 'prophet' },
    ...vocabulary.map(v => ({ word: v.word, meaning: v.meaning, id: v.id, pronunciationHint: v.pronunciationHint }))
  ].filter(item => item.word.length > 0);

  if (wordsToMatch.length === 0) {
    return <p className="whitespace-pre-line leading-inherit">{text}</p>;
  }

  // Create a regex to find all matches
  // We sort by length descending to match longer phrases first
  const sortedWords = [...wordsToMatch].sort((a, b) => b.word.length - a.word.length);
  const pattern = sortedWords.map(w => w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'g');

  const parts = text.split(regex);

  return (
    <>
      <p className="whitespace-pre-line leading-inherit">
        {parts.map((part, i) => {
          const match = sortedWords.find(w => w.word === part);
          if (match) {
            return (
              <span key={i} className="relative inline-block group">
                <button
                  onClick={() => handleWordClick(match as DifficultWord)}
                  onMouseEnter={() => setActiveTooltip(i.toString())}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className={`px-1 rounded-md transition-all cursor-pointer border-b-2 font-bold flex-inline items-center gap-1 ${
                    match.id === 'prophet'
                      ? 'border-emerald-400 bg-emerald-50/30 hover:bg-emerald-100/50 text-emerald-900 dark:text-emerald-300'
                      : 'border-amber-400 bg-amber-50/30 hover:bg-amber-100/50 text-amber-900 dark:text-amber-300'
                  }`}
                  title={`انقر لمعرفة معنى: ${part}`}
                >
                  {part}
                  <Volume2 className="w-3 h-3 opacity-30 group-hover:opacity-100 inline ml-0.5" />
                </button>

                {/* Desktop Tooltip for Quick View */}
                {activeTooltip === i.toString() && (
                  <span className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] rounded-lg shadow-xl z-50 animate-fade-in-up text-center leading-normal border border-slate-700">
                    <span className="block font-bold text-amber-300 mb-0.5">{part}:</span>
                    {match.meaning}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900/90" />
                  </span>
                )}
              </span>
            );
          }
          return part;
        })}
      </p>

      <GlossaryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        word={selectedWord}
      />
    </>
  );
};
