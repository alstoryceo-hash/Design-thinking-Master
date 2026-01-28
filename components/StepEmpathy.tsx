import React from 'react';
import { EmpathyData } from '../types';
import { User, Map } from 'lucide-react';

interface Props {
  data: EmpathyData;
  updateData: (key: keyof EmpathyData, value: string) => void;
}

const StepEmpathy: React.FC<Props> = ({ data, updateData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
        <div className="flex items-center gap-2 mb-4 text-purple-700">
          <User size={24} />
          <h2 className="text-xl font-bold">타겟 페르소나 (사용자 정의)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">사용자는 누구인가요?</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-200 bg-purple-50/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="예: 바쁜 30대 워킹맘..."
              value={data.targetUser}
              onChange={(e) => updateData('targetUser', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">사용자는 어떤 상황에 처해 있나요?</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-200 bg-purple-50/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="예: 퇴근 후 20분 안에 건강한 저녁을 준비해야 함..."
              value={data.situation}
              onChange={(e) => updateData('situation', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
        <div className="flex items-center gap-2 mb-4 text-fuchsia-600">
          <Map size={24} />
          <h2 className="text-xl font-bold">공감 지도 (Empathy Map)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">말 (Says)</label>
            <textarea
              className="w-full p-3 h-24 border border-gray-200 bg-gray-50 rounded-lg resize-none focus:bg-white focus:ring-2 focus:ring-fuchsia-300 outline-none"
              placeholder='"시간이 너무 부족해..."'
              value={data.says}
              onChange={(e) => updateData('says', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">생각 (Thinks)</label>
            <textarea
              className="w-full p-3 h-24 border border-gray-200 bg-gray-50 rounded-lg resize-none focus:bg-white focus:ring-2 focus:ring-fuchsia-300 outline-none"
              placeholder='(건강한 밥을 먹이고 싶은데...)'
              value={data.thinks}
              onChange={(e) => updateData('thinks', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">행동 (Does)</label>
            <textarea
              className="w-full p-3 h-24 border border-gray-200 bg-gray-50 rounded-lg resize-none focus:bg-white focus:ring-2 focus:ring-fuchsia-300 outline-none"
              placeholder='배달 앱을 켠다, 식사를 거른다...'
              value={data.does}
              onChange={(e) => updateData('does', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">느낌 (Feels)</label>
            <textarea
              className="w-full p-3 h-24 border border-gray-200 bg-gray-50 rounded-lg resize-none focus:bg-white focus:ring-2 focus:ring-fuchsia-300 outline-none"
              placeholder='스트레스, 미안함, 피곤함...'
              value={data.feels}
              onChange={(e) => updateData('feels', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepEmpathy;