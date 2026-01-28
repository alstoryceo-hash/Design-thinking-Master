import React from 'react';
import { TestData } from '../types';
import { MessageSquare } from 'lucide-react';

interface Props {
  data: TestData;
  updateData: (key: keyof TestData, value: string) => void;
}

const StepTest: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
       <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex items-center gap-3">
        <MessageSquare className="text-purple-600" />
        <p className="text-sm text-purple-900 font-medium">
          프로토타입을 잠재 사용자에게 보여주었다고 가정하고, 피드백을 기록해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/* Plus */}
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <div className="font-bold text-green-700 mb-2 text-lg">( + ) 좋았던 점</div>
          <textarea
            className="w-full h-32 p-3 bg-white border border-green-200 rounded-md outline-none focus:ring-2 focus:ring-green-400"
            placeholder="사용자가 좋아했던 기능이나 경험은..."
            value={data.plus}
            onChange={(e) => updateData('plus', e.target.value)}
          />
        </div>

        {/* Minus */}
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <div className="font-bold text-red-700 mb-2 text-lg">( - ) 아쉬운 점</div>
          <textarea
            className="w-full h-32 p-3 bg-white border border-red-200 rounded-md outline-none focus:ring-2 focus:ring-red-400"
            placeholder="사용자가 불편해하거나 헷갈려한 점은..."
            value={data.minus}
            onChange={(e) => updateData('minus', e.target.value)}
          />
        </div>

        {/* Questions */}
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <div className="font-bold text-yellow-700 mb-2 text-lg">( ? ) 궁금한 점</div>
          <textarea
            className="w-full h-32 p-3 bg-white border border-yellow-200 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="사용자가 질문한 내용은..."
            value={data.questions}
            onChange={(e) => updateData('questions', e.target.value)}
          />
        </div>

        {/* Ideas */}
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <div className="font-bold text-purple-700 mb-2 text-lg">( ! ) 새로운 아이디어</div>
          <textarea
            className="w-full h-32 p-3 bg-white border border-purple-200 rounded-md outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="피드백 중 나온 새로운 제안은..."
            value={data.ideas}
            onChange={(e) => updateData('ideas', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTest;