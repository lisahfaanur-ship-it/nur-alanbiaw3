import React from 'react';
import { X, Volume2, BookText, Sparkles } from 'lucide-react';
import { DifficultWord } from '../types';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: DifficultWord | null;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose, word }) => {
  if (!isOpen || !word) return null;

  const playPronunciation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      dir="rtl"
    >
      <div 
        className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-amber-200 dark:border-amber-900/50 overflow-hidden transform transition-all animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Decor */}
        <div className="h-2 bg-gradient-to-l from-amber-400 via-emerald-500 to-teal-600" />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center shadow-sm">
                <BookText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">معنى المصطلح</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
              <span className="text-2xl font-black text-emerald-800 dark:text-emerald-400">{word.word}</span>
              <button 
                onClick={playPronunciation}
                className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700 shadow-sm flex items-center justify-center transition-all active:scale-95"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                شرح مبسط للأطفال:
              </h4>
              <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {word.meaning}
              </p>
            </div>

            {word.pronunciationHint && (
              <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                <p className="text-xs text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <span className="font-bold">تلميح للنطق:</span>
                  {word.pronunciationHint}
                </p>
              </div>
            )}
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-200 dark:shadow-none transition-all active:scale-[0.98]"
          >
            فهمت المعنى 👍
          </button>
        </div>
      </div>
    </div>
  );
};
