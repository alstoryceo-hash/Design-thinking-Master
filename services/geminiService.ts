import { GoogleGenAI, Type } from "@google/genai";
import { WorkshopData, Step } from "../types";

const SYSTEM_INSTRUCTION = `
당신은 'DT 코치(Design Thinking Coach)'입니다. 사용자가 디자인 씽킹 과정을 진행하도록 돕는 역할을 합니다.

**중요 규칙**:
1. 답변은 **매우 간결하게(1~2문장 이내)** 작성하세요. 절대 길게 설명하지 마세요.
2. **볼드체**, *이탤릭* 등 마크다운 서식을 **절대 사용하지 마세요**. 오직 평범한 텍스트로만 응답하세요.
3. 친근하고 격려하는 톤(한국어)을 유지하세요.

프로세스:
1. 공감(Empathy)
2. 정의(Define)
3. 아이디어(Ideate)
4. 프로토타입(Prototype)
5. 테스트(Test)
`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-3-flash-preview";

export const getCoachFeedback = async (
  step: Step,
  data: WorkshopData,
  userAction?: string
): Promise<string> => {
  let prompt = "";

  switch (step) {
    case Step.Empathy:
      prompt = `현재 단계: 1. 공감하기
      데이터: 사용자=[${data.empathy.targetUser}], 상황=[${data.empathy.situation}].
      지시: 데이터가 없으면 사용자와 상황을 물어보세요. 데이터가 있으면 공감지도를 채우도록 짧게 독려하세요.`;
      break;
    case Step.Define:
      prompt = `현재 단계: 2. 문제정의
      데이터: 페인포인트=[${data.define.painPoints}].
      지시: 가장 큰 고충이 무엇인지 묻고, HMW(우리가 어떻게 하면...) 질문을 만들도록 짧게 유도하세요.`;
      break;
    case Step.Ideate:
      prompt = `현재 단계: 3. 아이디어
      목표: HMW 질문([${data.define.hmwStatement}]) 해결.
      지시: 질보다 양이 중요함을 강조하며 아이디어를 쏟아내도록 짧게 격려하세요.`;
      break;
    case Step.Prototype:
      prompt = `현재 단계: 4. 프로토타입
      지시: 사용자의 경험을 보여줄 스토리보드와 핵심 기능을 작성하도록 짧게 안내하세요.`;
      break;
    case Step.Test:
      prompt = `현재 단계: 5. 테스트
      지시: 가상의 사용자 피드백(좋은점, 아쉬운점 등)을 피드백 그리드에 적어보라고 하세요.`;
      break;
    case Step.Report:
      prompt = `단계: 완료.
      지시: 수고했다는 짧은 인사와 함께 리포트를 확인하라고 하세요.`;
      break;
  }

  if (userAction) {
    prompt += `\n사용자 행동: ${userAction}. 이에 대해 아주 짧게 반응하세요.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    // 혹시 모를 마크다운 잔재 제거
    const cleanText = (response.text || "다음 단계로 진행하세요.").replace(/\*\*/g, "").replace(/\*/g, "");
    return cleanText;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "잠시 연결 상태를 확인해주세요.";
  }
};

export const generateVirtualIdeas = async (
  hmwStatement: string,
  existingIdeas: string[]
): Promise<string[]> => {
  const prompt = `
    HMW 질문: "${hmwStatement}"
    기존 아이디어: ${existingIdeas.join(", ")}
    
    가상의 참여자 3명(창의적, 현실적, 전략적 성향)이 되어 3개의 독창적인 아이디어를 한국어로 제안하세요.
    반드시 JSON 문자열 배열(["아이디어1", "아이디어2", "아이디어3"])로만 응답하세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });
    
    const text = response.text;
    if (!text) return ["달나라 여행", "앱 개발", "친구 찬스"];
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Ideation Error:", error);
    return ["자동화 시스템", "크라우드 소싱", "AI 예측"];
  }
};

export const generateFinalReportSummary = async (data: WorkshopData): Promise<string> => {
    const prompt = `
      디자인 씽킹 워크숍 데이터 요약 (한국어, 마크다운 형식 사용 가능 - 리포트용이므로 여기서는 마크다운 허용):
      
      1. 타겟: ${data.empathy.targetUser}
      2. 문제: ${data.define.hmwStatement}
      3. 아이디어: ${data.ideas.slice(0, 5).map(i => i.content).join(", ")}
      4. 기능: ${data.prototype.coreFeatures}
      5. 피드백: 장점(${data.test.plus}), 단점(${data.test.minus}).

      형식:
      ## 워크숍 결과 요약
      * **해결 과제**: ...
      * **제안 솔루션**: ...
      * **인사이트**: ...
      * **향후 계획**: ...
    `;

    try {
        const response = await ai.models.generateContent({
            model: modelId,
            contents: prompt,
            config: {
                // 리포트 생성시는 요약이 목적이므로 시스템 프롬프트(간결함/마크다운금지)를 적용하지 않음
                systemInstruction: "당신은 전문적인 비즈니스 분석가입니다." 
            }
        });
        return response.text || "요약 생성 실패";
    } catch (e) {
        return "요약 리포트를 생성할 수 없습니다.";
    }
}
