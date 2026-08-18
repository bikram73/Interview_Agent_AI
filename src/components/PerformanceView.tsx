import React, { useState, useRef } from 'react';
import { ScreenType, FinalReport, InterviewSessionItem } from '../types';
import { ThemedReportPDF } from './ThemedReportPDF';
import { generateThemedPDF } from '../utils/pdfExport';

interface PerformanceViewProps {
  onNavigate: (screen: ScreenType) => void;
  finalReport?: FinalReport | null;
  sessionItems?: InterviewSessionItem[];
  roleTitle?: string;
  experienceLevel?: string;
  onRestartInterview?: () => void;
}

export const PerformanceView: React.FC<PerformanceViewProps> = ({
  onNavigate,
  finalReport,
  sessionItems = [],
  roleTitle = "Software Engineer",
  experienceLevel = "Fresher / Entry Level",
  onRestartInterview,
}) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState(false);
  const printContainerRef = useRef<HTMLDivElement>(null);

  // Default values if finalReport is empty
  const report: FinalReport = finalReport || {
    overallScore: 82,
    strengths: [
      "Demonstrated solid technical understanding of core role fundamentals",
      "Effective communication structure when detailing problem-solving steps",
      "Good alignment with modern industry practices and terminology"
    ],
    weaknesses: [
      "Could incorporate more concrete quantitative impact metrics in results",
      "Expand further on error handling and edge cases in architectural questions"
    ],
    recommendation: "Recommended for Hire",
    topicsToImprove: [
      "System Architecture & Scalability",
      "STAR Method (Quantifiable Results)",
      "Database Indexing & Caching"
    ],
    confidence: "High",
    summary: "The candidate demonstrated strong domain knowledge, clear communication, and a methodical approach to problem-solving. With minor focus on quantitative metrics, they are well-prepared for technical interviews."
  };

  // Themed PDF download handler
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    setPdfSuccessMessage(false);

    try {
      const fileName = `Interview_Evaluation_Report_${roleTitle.replace(/\s+/g, '_')}.pdf`;
      await generateThemedPDF('themed-pdf-export-container', fileName);
      setPdfSuccessMessage(true);
      setTimeout(() => setPdfSuccessMessage(false), 4000);
    } catch (error) {
      console.error('Failed to export themed PDF:', error);
      // Fallback: use window print
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Helper function to download interview report as text file
  const handleDownloadReport = () => {
    let reportText = `====================================================\n`;
    reportText += `       INTERVIEW AGENT AI - EVALUATION REPORT       \n`;
    reportText += `====================================================\n\n`;
    reportText += `Target Job Role : ${roleTitle}\n`;
    reportText += `Experience Level: ${experienceLevel}\n`;
    reportText += `Overall Score   : ${report.overallScore} / 100\n`;
    reportText += `Recommendation  : ${report.recommendation}\n`;
    reportText += `Confidence Level: ${report.confidence}\n\n`;

    reportText += `----------------------------------------------------\n`;
    reportText += `EXECUTIVE SUMMARY\n`;
    reportText += `----------------------------------------------------\n`;
    reportText += `${report.summary}\n\n`;

    reportText += `----------------------------------------------------\n`;
    reportText += `CANDIDATE STRENGTHS\n`;
    reportText += `----------------------------------------------------\n`;
    report.strengths.forEach((s, i) => {
      reportText += `${i + 1}. ${s}\n`;
    });
    reportText += `\n`;

    reportText += `----------------------------------------------------\n`;
    reportText += `AREAS FOR IMPROVEMENT\n`;
    reportText += `----------------------------------------------------\n`;
    report.weaknesses.forEach((w, i) => {
      reportText += `${i + 1}. ${w}\n`;
    });
    reportText += `\n`;

    reportText += `----------------------------------------------------\n`;
    reportText += `TOPICS TO STUDY\n`;
    reportText += `----------------------------------------------------\n`;
    report.topicsToImprove.forEach((t, i) => {
      reportText += `${i + 1}. ${t}\n`;
    });
    reportText += `\n`;

    if (sessionItems.length > 0) {
      reportText += `====================================================\n`;
      reportText += `COMPLETE INTERVIEW TRANSCRIPT & FEEDBACK\n`;
      reportText += `====================================================\n\n`;

      sessionItems.forEach((item, idx) => {
        reportText += `Q${idx + 1}: ${item.question.question}\n`;
        reportText += `Category: ${item.question.category || 'General'} | Difficulty: ${item.question.difficulty || 'Medium'}\n`;
        reportText += `Candidate Answer:\n${item.answer || '(No answer provided)'}\n\n`;
        if (item.evaluation) {
          reportText += `Score: ${item.evaluation.score} / 10\n`;
          reportText += `Feedback: ${item.evaluation.feedback}\n`;
          reportText += `Strength: ${item.evaluation.strength}\n`;
          reportText += `Weakness: ${item.evaluation.weakness}\n`;
          reportText += `Improvement: ${item.evaluation.improvement}\n`;
        }
        reportText += `----------------------------------------------------\n\n`;
      });
    }

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Interview_Report_${roleTitle.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col pb-24">
      {/* Top Header */}
      <header className="glass-header sticky top-0 z-20 px-6 py-4 flex items-center justify-between border-b border-outline-variant/40">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => onNavigate('landing')}
            className="w-10 h-10 rounded-xl bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Home"
          >
            <span className="material-symbols-outlined text-on-surface">home</span>
          </button>

          {/* App Logo in Title */}
          <div
            onClick={() => onNavigate('landing')}
            className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md shadow-primary/20 shrink-0 cursor-pointer hover:scale-105 transition-transform"
            title="Interview Agent AI"
          >
            <span className="material-symbols-outlined text-xl">computer</span>
          </div>

          <div>
            <div className="text-xs text-primary font-bold flex items-center gap-1.5">
              <span>Interview Agent AI</span>
              <span className="text-on-surface-variant">•</span>
              <span className="text-on-surface-variant font-medium">Final Candidate Report</span>
            </div>
            <h1 className="text-lg font-bold font-display text-on-surface leading-tight">
              {roleTitle} <span className="text-xs font-normal text-on-surface-variant">• {experienceLevel}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Themed PDF Download Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isGeneratingPDF ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                <span>Download PDF Report</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadReport}
            className="hidden sm:flex px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-all items-center gap-1.5 cursor-pointer"
            title="Export as Text"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            <span>TXT</span>
          </button>

          <button
            onClick={() => onNavigate('roles')}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ New Interview</span>
            <span className="material-symbols-outlined text-sm">add</span>
          </button>
        </div>
      </header>

      {/* Success Notification Banner */}
      {pdfSuccessMessage && (
        <div className="bg-secondary-container/40 border-b border-secondary/30 text-secondary px-6 py-2.5 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>Themed PDF Evaluation Report downloaded successfully!</span>
          </div>
          <button onClick={() => setPdfSuccessMessage(false)} className="text-secondary font-bold">
            Dismiss
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto w-full p-6 lg:p-8 space-y-8">
        {/* PDF Download Promo Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md shadow-primary/20 shrink-0">
              <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface font-display">Export Styled PDF Report</h3>
              <p className="text-xs text-on-surface-variant">Download the high-resolution report styled in the exact visual theme of this platform with candidate score cards, strengths, and transcript.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingPDF ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                  <span>Preparing Themed PDF...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>Download Themed PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Top Metric Cards Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Overall Score */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Overall Performance</span>
            <div className="my-3 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full circular-progress p-1.5 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-surface-container-lowest rounded-full flex items-center justify-center font-bold text-xl text-primary font-display">
                  {report.overallScore}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-primary">{report.overallScore}%</div>
                <div className="text-xs text-on-surface-variant font-medium">Overall Candidate Score</div>
              </div>
            </div>
            <div className="text-[11px] text-secondary font-semibold">
              AI Engine Evaluated
            </div>
          </div>

          {/* Hiring Recommendation */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Hiring Recommendation</span>
            <div className="my-2">
              <span className="inline-block px-3 py-1.5 rounded-xl bg-secondary-container/40 text-secondary font-bold text-sm mb-2">
                {report.recommendation}
              </span>
              <p className="text-xs text-on-surface-variant">Based on technical accuracy and communication evaluation.</p>
            </div>
            <div className="text-[11px] text-on-surface-variant font-medium">Panel Verdict</div>
          </div>

          {/* Candidate Confidence */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Confidence Level</span>
            <div className="my-2">
              <div className="text-2xl font-bold font-display text-on-surface mb-1">{report.confidence}</div>
              <div className="text-xs text-on-surface-variant">Assessment of delivery & technical vocabulary</div>
            </div>
            <div className="text-[11px] text-primary font-medium">STAR Framework Evaluated</div>
          </div>

          {/* Total Questions Answered */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Questions Completed</span>
            <div className="my-2">
              <div className="text-3xl font-bold font-display text-on-surface mb-1">
                {sessionItems.length > 0 ? sessionItems.length : 5} <span className="text-xs text-on-surface-variant font-normal">Questions</span>
              </div>
              <div className="text-xs text-on-surface-variant">Complete interview transcript saved in memory</div>
            </div>
            <div className="text-[11px] text-secondary font-medium">100% Evaluation Complete</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">auto_awesome</span>
            <span>Executive AI Evaluation Summary</span>
          </h2>
          <p className="text-sm text-on-surface leading-relaxed bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/20">
            {report.summary}
          </p>
        </div>

        {/* Strengths & Weaknesses & Study Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Strengths */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
              <span>Candidate Strengths</span>
            </h3>
            <ul className="space-y-3 text-xs">
              {report.strengths.map((str, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-secondary-container/20 border border-secondary/30 flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm shrink-0 mt-0.5">star</span>
                  <span className="text-on-surface leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <h3 className="text-xs font-bold uppercase tracking-wider text-tertiary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-base">warning</span>
              <span>Gaps & Weaknesses</span>
            </h3>
            <ul className="space-y-3 text-xs">
              {report.weaknesses.map((weak, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-tertiary-container/20 border border-tertiary/30 flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm shrink-0 mt-0.5">error</span>
                  <span className="text-on-surface leading-relaxed">{weak}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics to Improve */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">school</span>
              <span>Topics to Study</span>
            </h3>
            <ul className="space-y-3 text-xs">
              {report.topicsToImprove.map((topic, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-primary-container/20 border border-primary/30 flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm shrink-0 mt-0.5">menu_book</span>
                  <span className="text-on-surface font-semibold leading-relaxed">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Question Score Breakdown Graph */}
        {sessionItems.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <h3 className="text-lg font-bold font-display text-on-surface mb-2">Question-by-Question Score Breakdown</h3>
            <p className="text-xs text-on-surface-variant mb-6">Score distribution out of 10 across all session questions</p>

            <div className="space-y-4">
              {sessionItems.map((item, idx) => {
                const qScore = item.evaluation?.score ?? 8;
                const scorePercent = Math.min(100, Math.max(0, qScore * 10));

                return (
                  <div key={idx} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-on-surface truncate max-w-xl">
                        Q{idx + 1}: {item.question.question}
                      </span>
                      <span className="text-primary font-mono">{qScore} / 10</span>
                    </div>
                    <div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${scorePercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Full Interview Transcript */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold font-display text-on-surface">Full Interview Transcript & AI Evaluation</h3>
              <p className="text-xs text-on-surface-variant">Review all candidate answers alongside AI scores, strengths, and feedback.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                <span>Download PDF</span>
              </button>

              <button
                onClick={handleDownloadReport}
                className="px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-xs font-bold text-on-surface flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Export TXT</span>
              </button>
            </div>
          </div>

          {sessionItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-on-surface-variant bg-surface-container-low rounded-xl border border-outline-variant/30">
              No active transcript items stored. Launch a practice session to generate a live transcript.
            </div>
          ) : (
            <div className="space-y-6">
              {sessionItems.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold">
                        Question {idx + 1}
                      </span>
                      {item.question.category && (
                        <span className="px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface-variant text-xs font-medium">
                          {item.question.category}
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-bold text-primary font-mono">
                      Score: {item.evaluation?.score ?? 'N/A'} / 10
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-on-surface mb-2 font-display">
                      "{item.question.question}"
                    </h4>
                    <div className="text-xs text-on-surface-variant italic bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/20 whitespace-pre-wrap">
                      <strong>Candidate Answer:</strong> "{item.answer || '(No answer provided)'}"
                    </div>
                  </div>

                  {item.evaluation && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
                      <div className="p-3 rounded-xl bg-secondary-container/20 border border-secondary/30">
                        <strong className="text-secondary block mb-1">Strength:</strong>
                        <span className="text-on-surface-variant">{item.evaluation.strength}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-tertiary-container/20 border border-tertiary/30">
                        <strong className="text-tertiary block mb-1">Area to Improve:</strong>
                        <span className="text-on-surface-variant">{item.evaluation.weakness}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-primary-container/20 border border-primary/30">
                        <strong className="text-primary block mb-1">Action Tip:</strong>
                        <span className="text-on-surface-variant">{item.evaluation.improvement}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Off-screen Themed Template for High-Res PDF Export */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '0px',
          width: '900px',
          zIndex: -100,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <ThemedReportPDF
          report={report}
          sessionItems={sessionItems}
          roleTitle={roleTitle}
          experienceLevel={experienceLevel}
        />
      </div>

      {/* Footer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-header p-4 border-t border-outline-variant/40 z-30 flex items-center justify-between max-w-7xl mx-auto rounded-t-2xl shadow-2xl">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary/90 transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isGeneratingPDF ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                <span>Download Themed PDF Report</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadReport}
            className="hidden sm:flex px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors text-xs font-bold items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            <span>Download TXT</span>
          </button>
        </div>

        <button
          onClick={() => {
            if (onRestartInterview) onRestartInterview();
            onNavigate('roles');
          }}
          className="px-6 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Start Another Mock Session</span>
          <span className="material-symbols-outlined text-sm">play_arrow</span>
        </button>
      </div>
    </div>
  );
};

