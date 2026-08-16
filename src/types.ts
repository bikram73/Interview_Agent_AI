export type ScreenType = 'landing' | 'roles' | 'session' | 'evaluation' | 'performance';

export interface Role {
  id: string;
  title: string;
  category: string;
  demand: string;
  questionsCount: number;
  avgScore: string;
  description: string;
  badge?: string;
  icon: string;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  category?: string;
  difficulty?: string;
  expectedKeyConcepts?: string[];
}

export interface AnswerEvaluation {
  score: number;
  feedback: string;
  strength: string;
  weakness: string;
  improvement: string;
  idealAnswerKeyPoints?: string[];
}

export interface InterviewSessionItem {
  question: InterviewQuestion;
  answer: string;
  evaluation?: AnswerEvaluation;
}

export interface FinalReport {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
  topicsToImprove: string[];
  confidence: string;
  summary: string;
}

export interface InterviewConfig {
  role: string;
  experience: string;
  questionCount: number;
  customRole?: string;
}
