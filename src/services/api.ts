import { InterviewQuestion, AnswerEvaluation, FinalReport, InterviewSessionItem } from '../types';

export async function generateQuestions(
  role: string,
  experience: string = "Fresher",
  questionCount: number = 5
): Promise<InterviewQuestion[]> {
  const response = await fetch('/api/generate-questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      role,
      experience,
      question_count: questionCount
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || errData.details || 'Failed to generate questions.');
  }

  const data = await response.json();
  if (Array.isArray(data.questions) && data.questions.length > 0) {
    return data.questions.map((q: any, idx: number) => ({
      id: q.id || idx + 1,
      question: q.question,
      category: q.category || 'General',
      difficulty: q.difficulty || 'Medium',
      expectedKeyConcepts: q.expectedKeyConcepts || []
    }));
  }

  throw new Error('No questions returned from AI.');
}

export async function evaluateAnswer(
  role: string,
  question: string,
  answer: string,
  experience: string = "Fresher"
): Promise<AnswerEvaluation> {
  const response = await fetch('/api/evaluate-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      role,
      question,
      answer,
      experience
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || errData.details || 'Failed to evaluate answer.');
  }

  const data = await response.json();
  return {
    score: typeof data.score === 'number' ? data.score : 7,
    feedback: data.feedback || 'Good attempt.',
    strength: data.strength || 'Demonstrated understanding.',
    weakness: data.weakness || 'Could expand further on key details.',
    improvement: data.improvement || 'Try referencing quantitative metrics and specific technical frameworks.',
    idealAnswerKeyPoints: data.idealAnswerKeyPoints || []
  };
}

export async function generateReport(
  role: string,
  experience: string = "Fresher",
  session: InterviewSessionItem[]
): Promise<FinalReport> {
  const formattedSession = session.map((s, idx) => ({
    questionIndex: idx + 1,
    question: s.question.question,
    candidateAnswer: s.answer,
    score: s.evaluation?.score ?? 0,
    feedback: s.evaluation?.feedback || '',
    strength: s.evaluation?.strength || '',
    weakness: s.evaluation?.weakness || '',
    improvement: s.evaluation?.improvement || ''
  }));

  const response = await fetch('/api/generate-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      role,
      experience,
      session: formattedSession
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || errData.details || 'Failed to generate final report.');
  }

  const data = await response.json();
  return {
    overallScore: typeof data.overallScore === 'number' ? data.overallScore : 75,
    strengths: Array.isArray(data.strengths) ? data.strengths : ['Good technical knowledge'],
    weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses : ['Needs more structured metrics'],
    recommendation: data.recommendation || 'Recommended for Hire',
    topicsToImprove: Array.isArray(data.topicsToImprove) ? data.topicsToImprove : ['System Architecture', 'STAR Method'],
    confidence: data.confidence || 'Moderate',
    summary: data.summary || 'Solid overall performance across the interview session.'
  };
}
