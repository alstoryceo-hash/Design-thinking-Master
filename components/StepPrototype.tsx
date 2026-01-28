import React from 'react';
import { PrototypeData } from '../types';
import { Layers, Film } from 'lucide-react';

interface Props {
  data: PrototypeData;
  updateData: (key: keyof PrototypeData, value: string) => void;
}

const StepPrototype: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
        <div className="flex items-center gap-2 mb-4 text-purple-600">
          <Film size={24} />
          <h2 className="text-xl font-bold">스토리보드 시나리오</h2>
        </div>
        <p className="text-gray-600 mb-3 text-sm">해결책을 사용하는 사용자의 여정을 3-4단계로 묘사해 보세요.</p>
        <textarea
          className="w-full p-4 h-48 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none font-mono text-sm"
          placeholder="1단계: 사용자가 앱을 켠다...
2단계: '빠른 식사' 메뉴를 선택한다...
3단계: 냉장고 재료를 기반으로 3가지 레시피를 추천받는다..."
          value={data.storyboard}
          onChange={(e) => updateData('storyboard', e.target.value)}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
        <div className="flex items-center gap-2 mb-4 text-fuchsia-600">
          <Layers size={24} />
          <h2 className="text-xl font-bold">핵심 기능 (Core Features)</h2>
        </div>
        <p className="text-gray-600 mb-3 text-sm">반드시 구현되어야 할 핵심 기능은 무엇인가요?</p>
        <textarea
          className="w-full p-4 h-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none"
          placeholder="- AI 레시피 생성기
- 냉장고 재료 스캐너
- 15분 타이머 모드"
          value={data.coreFeatures}
          onChange={(e) => updateData('coreFeatures', e.target.value)}
        />
      </div>
    </div>
  );
};

export default StepPrototype;