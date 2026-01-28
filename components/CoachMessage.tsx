import React from 'react';
import { Bot } from 'lucide-react';

interface Props {
  message: string;
  isLoading: boolean;
}

const CoachMessage: React.FC<Props> = ({ message, isLoading }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 md:p-6 z-50">
      <div className="max-w-5xl mx-auto flex gap-4 items-start">
        <div className="bg-purple-600 p-3 rounded-full text-white shrink-0 shadow-lg shadow-purple-200">
          <Bot size={28} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-purple-900 text-sm mb-1 uppercase tracking-wider">DT 코치</h4>
          {isLoading ? (
            <div className="flex gap-2 items-center text-gray-500 h-6">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></span>
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed text-sm md:text-base animate-fadeIn">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachMessage;