import React from 'react';
import { ScreenType, InterviewQuestion, AnswerEvaluation } from '../types';
import { Logo } from './Logo';

interface EvaluationViewProps {
  onNavigate: (screen: ScreenType) => void;
  question?: InterviewQuestion;
  evaluation?: AnswerEvaluation;
  candidateAnswer?: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  onNextQuestion: () => void;
  onGenerateReport: () => void;
  onRetryQuestion: () => void;
  isGeneratingReport?: boolean;
}

export const EvaluationView: React.FC<EvaluationViewProps> = ({
  onNavigate,
  question,
  evaluation,
  candidateAnswer,
  currentQuestionIndex,
  totalQuestions,
  onNextQuestion,
  onGenerateReport,
  onRetryQuestion,
  isGeneratingReport = false,
}) => {
  const isLastQuestion = currentQuestionIndex >= totalQuestions - 1;

  const displayQuestion = question?.question || "Tell me about a time you had to make a high-stakes technical decision.";
  const displayAnswer = candidateAnswer || "(No answer provided)";
  const score = evaluation?.score ?? 8.0;
  const feedback = evaluation?.feedback || "Solid attempt with good foundational knowledge.";
  const strength = evaluation?.strength || "Clear logical structure and communication.";
  const weakness = evaluation?.weakness || "Could include more specific quantitative impact metrics.";
  const improvement = evaluation?.improvement || "Mention exact tools, metrics, or performance numbers to elevate your answer.";
  const keyPoints = evaluation?.idealAnswerKeyPoints || [
    "Define the situation and technical challenge clearly",
    "Detail your specific role and decision framework",
    "Highlight quantifiable metrics and results"
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col pb-28">
      {/* Top Header */}
      <header className="glass-header sticky top-0 z-20 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-outline-variant/40">
        <div className="flex items-center gap-2.5 sm:gap-4 overflow-hidden">
          {/* Brand Logo Component */}
          <Logo onClick={() => onNavigate('landing')} size="sm" />

          <div className="h-6 w-px bg-outline-variant/40 hidden sm:block" />

          <div className="overflow-hidden">
            <div className="text-[10px] sm:text-xs text-primary font-bold">Answer Evaluation Report</div>
            <h1 className="text-xs sm:text-base font-bold font-display text-on-surface leading-tight truncate">
              Q{currentQuestionIndex + 1} of {totalQuestions} <span className="font-normal text-on-surface-variant hidden xs:inline">• {question?.category || 'Evaluation'}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onNavigate('performance')}
            className="px-3 sm:px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="hidden sm:inline">Report Dashboard</span>
            <span className="sm:hidden">Report</span>
            <span className="material-symbols-outlined text-sm">analytics</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Score Banner */}
        <div className="p-5 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 w-full md:w-auto">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full circular-progress p-2 flex items-center justify-center shrink-0 shadow-lg">
              <div className="w-full h-full bg-surface-container-lowest rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold font-display text-primary">{score}</span>
                <span className="text-[9px] sm:text-[10px] text-on-surface-variant uppercase font-semibold">Out of 10</span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary text-xs font-bold mb-2">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>AI Evaluated</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-on-surface">
                {score >= 8 ? 'Excellent Answer' : score >= 6 ? 'Good Baseline Response' : 'Needs Technical Refinement'}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed max-w-2xl">
                {feedback}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <button
              onClick={onRetryQuestion}
              className="flex-1 md:flex-initial px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer"
            >
              Retry Answer
            </button>
            {isLastQuestion ? (
              <button
                onClick={onGenerateReport}
                disabled={isGeneratingReport}
                className="flex-1 md:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingReport ? (
                  <>
                    <span className="w-3 h-3 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Final Report</span>
                    <span className="material-symbols-outlined text-sm">analytics</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={onNextQuestion}
                className="flex-1 md:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Next Question</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            )}
          </div>
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column: Question & Candidate Answer */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Question Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Interview Question</h3>
              <p className="text-sm sm:text-base font-bold text-on-surface font-display leading-snug">
                "{displayQuestion}"
              </p>
            </div>

            {/* Candidate Submitted Response */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">chat_bubble</span>
                <span>Your Answer Response</span>
              </h3>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed italic bg-surface-container-low/60 p-3.5 sm:p-4 rounded-xl border border-outline-variant/30 whitespace-pre-wrap">
                "{displayAnswer}"
              </p>
            </div>

            {/* AI Feedback Analysis */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow space-y-3 sm:space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">auto_awesome</span>
                <span>AI Detailed Feedback</span>
              </h3>

              <div className="p-3.5 sm:p-4 rounded-xl bg-secondary-container/20 border border-secondary/30">
                <div className="text-xs font-bold text-secondary flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Key Strength</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {strength}
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-tertiary-container/20 border border-tertiary/30">
                <div className="text-xs font-bold text-tertiary flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>Missing Element / Weakness</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {weakness}
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-primary-container/20 border border-primary/30">
                <div className="text-xs font-bold text-primary flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-base">trending_up</span>
                  <span>Actionable Improvement Tip</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {improvement}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Ideal Answer Structure */}
          <div className="space-y-4 sm:space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">lightbulb</span>
                <span>Ideal Response Key Points</span>
              </h3>

              <div className="space-y-2.5 sm:space-y-3 text-xs">
                {keyPoints.map((pt, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-sm shrink-0 mt-0.5">check</span>
                    <span className="text-on-surface-variant leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface block mb-1">Next Step Guidance:</strong>
              {isLastQuestion
                ? "You have answered all questions in this session. Click 'Generate Final Report' to calculate your overall evaluation, hiring recommendation, and strengths overview."
                : "Proceed to the next question to continue building your comprehensive evaluation report."}
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 glass-header p-3 sm:p-4 border-t border-outline-variant/40 z-30 flex items-center justify-between max-w-7xl mx-auto rounded-t-2xl shadow-2xl gap-2">
        <button
          onClick={onRetryQuestion}
          className="px-3.5 sm:px-5 py-2.5 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer shrink-0"
        >
          Retry
        </button>

        {isLastQuestion ? (
          <button
            onClick={onGenerateReport}
            disabled={isGeneratingReport}
            className="px-4 sm:px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary/90 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGeneratingReport ? (
              <span>Generating Final Report...</span>
            ) : (
              <>
                <span>View Final Report</span>
                <span className="material-symbols-outlined text-sm">analytics</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={onNextQuestion}
            className="px-4 sm:px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary/90 transition-all shadow-md flex items-center gap-2 cursor-pointer truncate"
          >
            <span>Next Question ({currentQuestionIndex + 2}/{totalQuestions})</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
