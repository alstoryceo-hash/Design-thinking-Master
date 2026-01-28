import React, { useEffect, useState } from 'react';
import { WorkshopData } from '../types';
import { generateFinalReportSummary } from '../services/geminiService';
import { FileText, Download } from 'lucide-react';

interface Props {
  data: WorkshopData;
}

const Report: React.FC<Props> = ({ data }) => {
  const [summary, setSummary] = useState<string>("최종 요약 리포트를 생성 중입니다...");

  useEffect(() => {
    generateFinalReportSummary(data).then(setSummary);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-2xl rounded-sm border border-purple-100 animate-fadeIn my-8">
      <div className="border-b-2 border-purple-900 pb-6 mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight uppercase">워크숍 결과 리포트</h1>
          <p className="text-purple-600 mt-2 font-medium">디자인 씽킹 세션 결과물</p>
        </div>
        <FileText size={48} className="text-purple-800" />
      </div>

      <div className="space-y-8">
        {/* AI Summary Section */}
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
           <div className="prose prose-sm md:prose-base max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
             {summary}
           </div>
        </div>

        {/* Detailed Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
                <h3 className="font-bold text-purple-900 uppercase text-sm tracking-wider border-b border-gray-200 pb-1">타겟 페르소나</h3>
                <p className="text-lg font-medium">{data.empathy.targetUser || "미작성"}</p>
                <p className="text-gray-600 italic">"{data.empathy.situation}"</p>
            </div>
            <div className="space-y-2">
                <h3 className="font-bold text-purple-900 uppercase text-sm tracking-wider border-b border-gray-200 pb-1">핵심 문제 (HMW)</h3>
                <p className="text-lg font-medium text-purple-600">{data.define.hmwStatement || "미작성"}</p>
            </div>
        </div>

        <div>
            <h3 className="font-bold text-purple-900 uppercase text-sm tracking-wider border-b border-gray-200 pb-1 mb-4">베스트 아이디어</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.ideas.slice(0, 4).map((idea, idx) => (
                    <div key={idx} className="bg-yellow-100 p-3 shadow-sm text-sm font-hand rotate-1 border border-yellow-200">
                        {idea.content}
                    </div>
                ))}
            </div>
        </div>

        <div>
             <h3 className="font-bold text-purple-900 uppercase text-sm tracking-wider border-b border-gray-200 pb-1 mb-4">프로토타입 계획</h3>
             <div className="bg-white border border-gray-200 p-4 rounded-lg font-mono text-sm">
                 {data.prototype.storyboard}
             </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <button className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-900 transition font-semibold" onClick={() => window.print()}>
            <Download size={18} />
            리포트 출력하기
        </button>
      </div>
    </div>
  );
};

export default Report;