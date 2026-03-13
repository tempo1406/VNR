export interface QuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WarLocation {
  id: string;
  name: string;
  region: string;
  period: string;
  coords: {
    x: number;
    y: number;
  };
  theme: string;
  summary: string;
  highlights: string[];
  missions: string[];
  prerequisites: string[];
  quiz: QuizQuestion;
  secretTitle: string;
  secretDetail: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  detail: string;
}

export interface BadgeRule {
  id: string;
  label: string;
  description: string;
}
