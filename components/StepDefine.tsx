import React from 'react';
import { DefineData } from '../types';
import { Target, AlertCircle } from 'lucide-react';

interface Props {
  data: DefineData;
  updateData: (key: keyof DefineData, value: string) => void;
}

const StepDefine: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
        <div className="flex items-center gap-2 mb-4 text-purple-600">
          <AlertCircle size={24} />
          <h2 className="text-xl font-bold">페인 포인트(고충) 발견</h2>
        </div>
        <p className="text-gray-600 mb-3 text-sm">공감지도를 검토해보세요. 사용자가 겪는 가장 큰 좌절이나 장애물은 무엇인가요?</p>
        <textarea
          className="w-full p-4 h-32 border border-purple-200 bg-purple-50/50 rounded-lg focus:ring-2 focus:ring-purple-300 outline-none transition"
          placeholder="- 건강하지 못한 음식에 대한 죄책감을 느낀다.
- 요리 준비 시간이 너무 길다.
- 뒷정리가 귀찮다."
          value={data.painPoints}
          onChange={(e) => updateData('painPoints', e.target.value)}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 border-l-4 border-l-purple-600">
        <div className="flex items-center gap-2 mb-4 text-purple-800">
          <Target size={24} />
          <h2 className="text-xl font-bold">HMW 질문 (우리가 어떻게 하면...?)</h2>
        </div>
        <p className="text-gray-600 mb-3 text-sm">핵심 문제를 '기회'의 문장으로 바꿔보세요. "우리가 어떻게 하면 [사용자]가 [목표]를 달성하도록 도울 수 있을까요?"</p>
        <div className="relative">
          <span className="absolute top-3 left-3 text-purple-400 font-bold select-none">HMW</span>
          <textarea
            className="w-full p-3 pl-14 h-24 text-lg font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
            placeholder="...워킹맘이 20분 안에 건강한 저녁을 준비할 수 있게 도울 수 있을까?"
            value={data.hmwStatement}
            onChange={(e) => updateData('hmwStatement', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StepDefine;