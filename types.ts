export enum Step {
  Empathy = 0,
  Define = 1,
  Ideate = 2,
  Prototype = 3,
  Test = 4,
  Report = 5
}

export interface EmpathyData {
  targetUser: string;
  situation: string;
  says: string;
  thinks: string;
  does: string;
  feels: string;
}

export interface DefineData {
  painPoints: string;
  hmwStatement: string;
}

export interface StickyNote {
  id: string;
  author: string;
  content: string;
  color: string; // Tailwind color class
  rotation: number;
}

export interface PrototypeData {
  storyboard: string;
  coreFeatures: string;
}

export interface TestData {
  plus: string;
  minus: string;
  questions: string;
  ideas: string;
}

export interface WorkshopData {
  empathy: EmpathyData;
  define: DefineData;
  ideas: StickyNote[];
  prototype: PrototypeData;
  test: TestData;
}

export const STEP_TITLES = [
  "1. 공감하기",
  "2. 문제정의",
  "3. 아이디어",
  "4. 프로토타입",
  "5. 테스트",
  "최종 리포트"
];

export const STEP_DESCRIPTIONS = [
  "사용자의 마음 이해하기",
  "진짜 문제 정의하기",
  "해결책 브레인스토밍",
  "핵심 아이디어 구체화",
  "피드백 및 개선",
  "워크숍 요약 정리"
];
