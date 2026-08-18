import React, { useState, useEffect } from 'react';
import { ScreenType, InterviewQuestion, InterviewSessionItem } from '../types';
import { Logo } from './Logo';

interface SessionViewProps {
  onNavigate: (screen: ScreenType) => void;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  sessionItems: InterviewSessionItem[];
  roleTitle: string;
  experienceLevel: string;
  onSubmitAnswer: (answer: string) => void;
  isEvaluating?: boolean;
}

export const SessionView: React.FC<SessionViewProps> = ({
  onNavigate,
  questions,
  currentQuestionIndex,
  sessionItems,
  roleTitle,
  experienceLevel,
  onSubmitAnswer,
  isEvaluating = false,
}) => {
  const currentQ = questions[currentQuestionIndex] || {
    id: 1,
    question: "Explain the core architectural concepts for " + roleTitle + ".",
    category: "Technical Fundamentals",
    difficulty: "Medium",
    expectedKeyConcepts: ["Design patterns", "Performance", "Scalability"]
  };

  const totalQuestions = questions.length || 5;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const [answerText, setAnswerText] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes per question
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Load existing answer if user navigated back
  useEffect(() => {
    if (sessionItems[currentQuestionIndex]?.answer) {
      setAnswerText(sessionItems[currentQuestionIndex].answer);
    } else {
      setAnswerText('');
    }
    setSecondsLeft(180);
  }, [currentQuestionIndex, sessionItems]);

  // Check Web Speech API support
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Timer Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Web Speech API Voice Dictation
  const toggleSpeechRecognition = () => {
    if (!speechSupported) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswerText((prev) => (prev ? prev + ' ' + transcript : transcript));
      };

      recognition.start();
    } catch (e) {
      console.error('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  const wordCount = answerText.trim() ? answerText.trim().split(/\s+/).length : 0;
  const charCount = answerText.length;

  const handleSubmit = () => {
    onSubmitAnswer(answerText);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col pb-24 lg:pb-8">
      {/* Top Header & Progress */}
      <header className="glass-header sticky top-0 z-20 px-3.5 sm:px-6 py-3 sm:py-4 border-b border-outline-variant/40">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
            {/* Exit / Back Button */}
            <button
              onClick={() => onNavigate('roles')}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Exit Session"
            >
              <span className="material-symbols-outlined text-on-surface text-lg">close</span>
            </button>

            {/* Brand Logo Component */}
            <Logo onClick={() => onNavigate('landing')} size="sm" />

            <div className="h-6 w-px bg-outline-variant/40 hidden md:block" />

            <div className="hidden sm:block overflow-hidden">
              <div className="font-bold font-display text-xs sm:text-sm text-on-surface leading-tight truncate">
                {roleTitle} Mock Session
              </div>
              <div className="text-[11px] text-on-surface-variant truncate">
                Q{currentQuestionIndex + 1} of {totalQuestions} • {currentQ.category || 'Core'} ({experienceLevel})
              </div>
            </div>
          </div>

          {/* Center Progress Bar (Desktop & Tablet) */}
          <div className="hidden lg:flex items-center gap-3 max-w-xs w-full">
            <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-primary">{progressPercent}%</span>
          </div>

          {/* Right Timer Badge & Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-mono font-bold">
              <span className="material-symbols-outlined text-primary text-sm sm:text-base">timer</span>
              <span>{formatTime(secondsLeft)}</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isEvaluating}
              className="hidden sm:flex px-3.5 sm:px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all shadow-md cursor-pointer disabled:opacity-50 items-center gap-1.5 shrink-0"
            >
              {isEvaluating ? (
                <>
                  <span className="w-3 h-3 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <span>Submit Answer</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Linear Progress Bar */}
        <div className="lg:hidden mt-2 h-1 bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left / Center Question & Input Box */}
        <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
          {/* Question Card */}
          <div className="p-5 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary-container/20 text-primary text-[11px] sm:text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>AI Generated</span>
              </span>
              {currentQ.difficulty && (
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-tertiary-container/20 text-tertiary text-[11px] sm:text-xs font-bold">
                  {currentQ.difficulty}
                </span>
              )}
              {currentQ.category && (
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] sm:text-xs font-bold">
                  {currentQ.category}
                </span>
              )}
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-on-surface leading-snug mb-4">
              "{currentQ.question}"
            </h1>

            {currentQ.expectedKeyConcepts && currentQ.expectedKeyConcepts.length > 0 && (
              <div className="pt-3 border-t border-outline-variant/30 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-on-surface-variant font-medium">Expected Concepts:</span>
                {currentQ.expectedKeyConcepts.map((concept, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-lg bg-surface-container-low border border-outline-variant/20 text-[10px] sm:text-[11px] font-medium text-on-surface-variant">
                    {concept}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Answer Text Area Workspace */}
          <div className="flex-1 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow p-4 sm:p-6 flex flex-col justify-between">
            <div className="mb-3 sm:mb-4 flex items-center justify-between border-b border-outline-variant/30 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm">edit_note</span>
                <span>Candidate Answer Input</span>
              </div>

              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {isListening ? 'mic_off' : 'mic'}
                  </span>
                  <span>{isListening ? 'Listening...' : 'Voice Dictation'}</span>
                </button>
              )}
            </div>

            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Type your response here... (Tip: Structure your answer using Situation, Task, Action, Result or specific technical architecture details)."
              className="w-full h-48 sm:h-64 p-3.5 sm:p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/30 focus:outline-none focus:border-primary text-xs sm:text-sm leading-relaxed text-on-surface resize-none"
            />

            <div className="mt-3 pt-3 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-on-surface-variant">
              <div className="flex items-center gap-3">
                <span><strong>{wordCount}</strong> words</span>
                <span>•</span>
                <span><strong>{charCount}</strong> chars</span>
              </div>
              <div className="text-primary font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs sm:text-sm">verified</span>
                <span>AI Rubric Evaluation Ready</span>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Question Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setAnswerText('')}
              className="px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer"
            >
              Clear Input
            </button>

            <button
              onClick={handleSubmit}
              disabled={isEvaluating}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary/90 transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating Answer...</span>
                </>
              ) : (
                <>
                  <span>Submit Answer & Evaluate</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Sidebar Assistant Panel */}
        <div className="flex flex-col gap-6">
          {/* Question Sequence List */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">format_list_bulleted</span>
              <span>Question Sequence ({totalQuestions})</span>
            </h3>

            <div className="space-y-2.5 sm:space-y-3">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isDone = sessionItems[idx]?.evaluation !== undefined;
                const score = sessionItems[idx]?.evaluation?.score;

                return (
                  <div
                    key={q.id || idx}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-primary-container/20 border-primary/40'
                        : isDone
                        ? 'bg-secondary-container/20 border-secondary/30'
                        : 'bg-surface-container-low border-outline-variant/30 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden pr-2">
                      <span
                        className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? 'bg-primary text-on-primary'
                            : isDone
                            ? 'bg-secondary text-on-secondary'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-xs font-medium text-on-surface truncate">
                        {q.question}
                      </span>
                    </div>

                    <span className="text-xs font-bold shrink-0">
                      {isDone ? (
                        <span className="text-secondary">{score} / 10</span>
                      ) : isCurrent ? (
                        <span className="text-primary">Active</span>
                      ) : (
                        <span className="text-outline">Upcoming</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Coach Live Hint */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-cyan-400 p-0.5 shadow-md shrink-0">
                <div className="w-full h-full bg-surface-container-lowest rounded-full flex items-center justify-center text-primary font-bold">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface">AI Interview Coach</div>
                <div className="text-[11px] text-secondary font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary pulse-ai" />
                  <span>Ready for Evaluation</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
              "Include specific framework names, design patterns, or quantitative results in your answer to maximize your evaluation score."
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar on Mobile */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/40 p-3 z-30 flex items-center justify-between gap-3 shadow-xl">
        <button
          onClick={() => setAnswerText('')}
          className="px-3.5 py-2 rounded-xl bg-surface-container-high text-xs font-bold text-on-surface"
        >
          Clear
        </button>

        <button
          onClick={handleSubmit}
          disabled={isEvaluating}
          className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          {isEvaluating ? (
            <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Submit & Evaluate</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
