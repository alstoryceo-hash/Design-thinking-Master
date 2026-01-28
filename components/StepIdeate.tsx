import React, { useState } from 'react';
import { StickyNote } from '../types';
import { Plus, Sparkles, UserPlus } from 'lucide-react';

interface Props {
  ideas: StickyNote[];
  addIdea: (text: string, author?: string, color?: string) => void;
  triggerAiBrainstorm: () => void;
  isAiLoading: boolean;
}

const COLORS = [
  'bg-yellow-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-purple-200',
  'bg-pink-200'
];

const StepIdeate: React.FC<Props> = ({ ideas, addIdea, triggerAiBrainstorm, isAiLoading }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    addIdea(inputValue, "나", COLORS[Math.floor(Math.random() * COLORS.length)]);
    setInputValue("");
  };

  return (
    <div className="h-full flex flex-col space-y-4 animate-fadeIn">
      {/* Input Area */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100 flex flex-col md:flex-row gap-3 items-center">
        <form onSubmit={handleAdd} className="flex-1 flex gap-2 w-full">
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            placeholder="아이디어를 입력하고 Enter를 누르세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">추가</span>
          </button>
        </form>
        
        <div className="h-8 w-px bg-gray-300 hidden md:block"></div>

        <button
          onClick={triggerAiBrainstorm}
          disabled={isAiLoading}
          className={`px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition whitespace-nowrap ${
            isAiLoading 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200'
          }`}
        >
           {isAiLoading ? (
             <span className="animate-spin text-xl">◌</span>
           ) : (
             <UserPlus size={20} />
           )}
           {isAiLoading ? '아이디어 생성 중...' : '가상 참여자 초대'}
        </button>
      </div>

      {/* Sticky Board */}
      <div className="flex-1 bg-stone-100 rounded-xl border-4 border-stone-200 p-6 overflow-y-auto relative min-h-[400px]">
        {ideas.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>보드가 비어있습니다. 첫 아이디어를 붙여보세요!</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ideas.map((note) => (
            <div
              key={note.id}
              className={`${note.color} p-4 shadow-lg hover:scale-105 transition-transform duration-200 cursor-default flex flex-col justify-between aspect-square`}
              style={{ transform: `rotate(${note.rotation}deg)` }}
            >
              <p className="font-hand text-lg leading-snug text-gray-800 break-words overflow-hidden">{note.content}</p>
              <div className="mt-2 text-xs font-bold text-gray-600 opacity-60 text-right uppercase tracking-wider">
                — {note.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIdeate;