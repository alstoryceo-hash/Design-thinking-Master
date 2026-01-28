import React, { useState, useEffect } from 'react';
import { Step, WorkshopData, STEP_TITLES, STEP_DESCRIPTIONS, StickyNote } from './types';
import { getCoachFeedback, generateVirtualIdeas } from './services/geminiService';
import StepEmpathy from './components/StepEmpathy';
import StepDefine from './components/StepDefine';
import StepIdeate from './components/StepIdeate';
import StepPrototype from './components/StepPrototype';
import StepTest from './components/StepTest';
import Report from './components/Report';
import CoachMessage from './components/CoachMessage';
import { ChevronRight, ChevronLeft, Layout } from 'lucide-react';

// Initial Data State
const initialData: WorkshopData = {
  empathy: { targetUser: '', situation: '', says: '', thinks: '', does: '', feels: '' },
  define: { painPoints: '', hmwStatement: '' },
  ideas: [],
  prototype: { storyboard: '', coreFeatures: '' },
  test: { plus: '', minus: '', questions: '', ideas: '' }
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Empathy);
  const [data, setData] = useState<WorkshopData>(initialData);
  const [coachMessage, setCoachMessage] = useState("안녕하세요! 저는 당신의 디자인 씽킹 코치입니다. 우리가 누구를 위해 문제를 해결하려는지 '공감하기'부터 시작해볼까요?");
  const [isCoachLoading, setIsCoachLoading] = useState(false);
  const [isAiIdeating, setIsAiIdeating] = useState(false);

  // Trigger Coach feedback on step change
  useEffect(() => {
    const fetchFeedback = async () => {
      setIsCoachLoading(true);
      const msg = await getCoachFeedback(currentStep, data);
      setCoachMessage(msg);
      setIsCoachLoading(false);
    };
    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // Handlers for updating state
  const updateEmpathy = (key: any, value: string) => setData(prev => ({ ...prev, empathy: { ...prev.empathy, [key]: value } }));
  const updateDefine = (key: any, value: string) => setData(prev => ({ ...prev, define: { ...prev.define, [key]: value } }));
  const updatePrototype = (key: any, value: string) => setData(prev => ({ ...prev, prototype: { ...prev.prototype, [key]: value } }));
  const updateTest = (key: any, value: string) => setData(prev => ({ ...prev, test: { ...prev.test, [key]: value } }));

  const addIdea = (text: string, author = "나", color = "bg-yellow-200") => {
    const newIdea: StickyNote = {
      id: Date.now().toString() + Math.random(),
      content: text,
      author,
      color,
      rotation: Math.random() * 6 - 3, // Random rotation -3 to 3 deg
    };
    setData(prev => ({ ...prev, ideas: [...prev.ideas, newIdea] }));
  };

  const handleAiBrainstorm = async () => {
    if (!data.define.hmwStatement) {
      setCoachMessage("브레인스토밍을 하기 전에 이전 단계에서 HMW 질문을 먼저 정의해주세요!");
      return;
    }
    setIsAiIdeating(true);
    const virtualIdeas = await generateVirtualIdeas(data.define.hmwStatement, data.ideas.map(i => i.content));
    
    // Add distinct colors for AI participants
    const aiColors = ['bg-purple-200', 'bg-blue-200', 'bg-pink-200'];
    const aiNames = ['민수 (창의)', '지은 (현실)', '현우 (전략)'];

    const newNotes: StickyNote[] = virtualIdeas.map((idea, idx) => ({
      id: Date.now().toString() + idx,
      content: idea,
      author: aiNames[idx % 3],
      color: aiColors[idx % 3],
      rotation: Math.random() * 6 - 3
    }));

    setData(prev => ({ ...prev, ideas: [...prev.ideas, ...newNotes] }));
    setIsAiIdeating(false);
    setCoachMessage("가상 참여자들을 초대하여 새로운 아이디어를 보드에 붙였습니다!");
  };

  const nextStep = () => {
    if (currentStep < Step.Report) setCurrentStep(s => s + 1);
  };
  
  const prevStep = () => {
    if (currentStep > Step.Empathy) setCurrentStep(s => s - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case Step.Empathy: return <StepEmpathy data={data.empathy} updateData={updateEmpathy} />;
      case Step.Define: return <StepDefine data={data.define} updateData={updateDefine} />;
      case Step.Ideate: return <StepIdeate ideas={data.ideas} addIdea={addIdea} triggerAiBrainstorm={handleAiBrainstorm} isAiLoading={isAiIdeating} />;
      case Step.Prototype: return <StepPrototype data={data.prototype} updateData={updatePrototype} />;
      case Step.Test: return <StepTest data={data.test} updateData={updateTest} />;
      case Step.Report: return <Report data={data} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-100 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="bg-purple-700 text-white p-2 rounded-lg">
            <Layout size={24} />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 leading-none">디자인 씽킹 마스터</h1>
            <span className="text-xs text-purple-600 uppercase tracking-wide font-semibold">워크숍 퍼실리테이터</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
            {STEP_TITLES.map((title, idx) => (
                <div key={idx} className={`flex flex-col items-center px-4 ${currentStep === idx ? 'opacity-100' : 'opacity-40'}`}>
                    <span className={`text-xs font-bold ${currentStep === idx ? 'text-purple-700' : 'text-gray-500'}`}>{title}</span>
                    <div className={`h-1 w-full mt-1 rounded-full ${currentStep === idx ? 'bg-purple-700' : 'bg-transparent'}`}></div>
                </div>
            ))}
        </div>

        <div className="flex gap-2">
           <button 
             onClick={prevStep} 
             disabled={currentStep === 0}
             className="p-2 rounded-full hover:bg-purple-50 text-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
           >
             <ChevronLeft />
           </button>
           <button 
             onClick={nextStep} 
             disabled={currentStep === Step.Report}
             className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 font-medium"
           >
             <span>{currentStep === Step.Test ? '완료' : '다음'}</span>
             <ChevronRight size={16} />
           </button>
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 max-w-6xl mx-auto w-full">
        <div className="mb-6">
           <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">{STEP_TITLES[currentStep]}</h2>
           <p className="text-gray-500 text-lg">{STEP_DESCRIPTIONS[currentStep]}</p>
        </div>
        
        {renderStep()}
      </main>

      {/* Sticky Coach Bar */}
      <CoachMessage message={coachMessage} isLoading={isCoachLoading} />
    </div>
  );
};

export default App;