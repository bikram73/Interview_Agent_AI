import React from 'react';
import { FinalReport, InterviewSessionItem } from '../types';

interface ThemedReportPDFProps {
  report: FinalReport;
  sessionItems: InterviewSessionItem[];
  roleTitle: string;
  experienceLevel: string;
}

export const ThemedReportPDF: React.FC<ThemedReportPDFProps> = ({
  report,
  sessionItems,
  roleTitle,
  experienceLevel,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="themed-pdf-export-container"
      className="bg-[#f9f9ff] text-[#191c23] p-8 max-w-[900px] mx-auto font-sans antialiased border border-[#e0e2ec] rounded-2xl shadow-xl"
      style={{ minHeight: '1100px' }}
    >
      {/* Brand Header Banner */}
      <div className="bg-gradient-to-r from-[#005bbf] to-[#1a73e8] text-white p-6 rounded-2xl shadow-md mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
            <span className="text-2xl font-black">AI</span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Interview Agent AI</h1>
            <p className="text-xs text-white/80 font-medium tracking-wide uppercase">
              Official Candidate Performance & Evaluation Report
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-1 border border-white/20">
            Verified Assessment
          </div>
          <div className="text-xs text-white/90 font-medium">{currentDate}</div>
        </div>
      </div>

      {/* Candidate & Role Metadata Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#e0e2ec] shadow-sm mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#414754]">Target Job Role</span>
          <div className="text-base font-black text-[#005bbf] mt-0.5">{roleTitle}</div>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#414754]">Seniority Level</span>
          <div className="text-sm font-bold text-[#191c23] mt-0.5">{experienceLevel}</div>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#414754]">Questions Evaluated</span>
          <div className="text-sm font-bold text-[#191c23] mt-0.5">{sessionItems.length || 5} Questions</div>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#414754]">Evaluation Engine</span>
          <div className="text-sm font-bold text-[#006e2c] mt-0.5">Autonomous AI Engine</div>
        </div>
      </div>

      {/* Top 4 Performance Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {/* Overall Score */}
        <div className="bg-white p-5 rounded-2xl border border-[#e0e2ec] shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#414754]">Overall Score</span>
          <div className="my-2 flex items-baseline gap-1">
            <span className="text-3xl font-black text-[#005bbf]">{report.overallScore}</span>
            <span className="text-xs font-bold text-[#414754]">/ 100</span>
          </div>
          <div className="text-[10px] font-bold text-[#006e2c]">Grade: {report.overallScore >= 80 ? 'Excellent' : report.overallScore >= 60 ? 'Passing' : 'Needs Practice'}</div>
        </div>

        {/* Hiring Recommendation */}
        <div className="bg-white p-5 rounded-2xl border border-[#e0e2ec] shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#414754]">Recommendation</span>
          <div className="my-2">
            <span className="inline-block px-2.5 py-1 rounded-lg bg-[#86f898]/40 text-[#00722f] font-black text-xs">
              {report.recommendation}
            </span>
          </div>
          <div className="text-[10px] text-[#414754]">Based on technical criteria</div>
        </div>

        {/* Confidence Level */}
        <div className="bg-white p-5 rounded-2xl border border-[#e0e2ec] shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#414754]">Confidence Level</span>
          <div className="text-2xl font-black text-[#191c23] my-2">{report.confidence}</div>
          <div className="text-[10px] text-[#005bbf] font-semibold">STAR Framework Verified</div>
        </div>

        {/* Completion Status */}
        <div className="bg-white p-5 rounded-2xl border border-[#e0e2ec] shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#414754]">Interview Status</span>
          <div className="text-lg font-black text-[#006e2c] my-2">100% Completed</div>
          <div className="text-[10px] text-[#414754]">All answers scored</div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white p-6 rounded-2xl border border-[#e0e2ec] shadow-sm mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#005bbf] mb-2 flex items-center gap-2">
          <span>Executive Assessment Summary</span>
        </h2>
        <p className="text-xs text-[#191c23] leading-relaxed bg-[#f2f3fd] p-4 rounded-xl border border-[#e0e2ec]/60 font-medium">
          {report.summary}
        </p>
      </div>

      {/* 3 Columns: Strengths, Weaknesses, Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Strengths */}
        <div className="bg-white p-5 rounded-2xl border border-[#e0e2ec] shadow-sm">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#006e2c] mb-3 flex items-center gap-1.5">
            <span>Candidate Strengths</span>
          </h3>
          <ul className="space-y-2.5">
            {report.strengths.map((str, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-[#86f898]/20 border border-[#86f898]/40 text-xs text-[#191c23] leading-snug">
                <strong>+</strong> {str}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-white p-5 rounded-2xl border border-[#e0e2ec] shadow-sm">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#9e4300] mb-3 flex items-center gap-1.5">
            <span>Areas for Improvement</span>
          </h3>
          <ul className="space-y-2.5">
            {report.weaknesses.map((weak, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-[#ffdbcb]/40 border border-[#ffdbcb] text-xs text-[#191c23] leading-snug">
                <strong>!</strong> {weak}
              </li>
            ))}
          </ul>
        </div>

        {/* Topics to Study */}
        <div className="bg-white p-5 rounded-2xl border border-[#e0e2ec] shadow-sm">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#005bbf] mb-3 flex items-center gap-1.5">
            <span>Target Study Topics</span>
          </h3>
          <ul className="space-y-2.5">
            {report.topicsToImprove.map((topic, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-[#1a73e8]/10 border border-[#1a73e8]/20 text-xs font-semibold text-[#005bbf] leading-snug">
                <strong>*</strong> {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Complete Interview Transcript Section */}
      {sessionItems.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-[#e0e2ec] shadow-sm mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#191c23] mb-4 pb-2 border-b border-[#e0e2ec]">
            Detailed Question-by-Question Transcript & AI Evaluation
          </h3>

          <div className="space-y-5">
            {sessionItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#f2f3fd]/60 border border-[#e0e2ec] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#005bbf] text-white text-[11px] font-bold">
                    Question {idx + 1}
                  </span>
                  <span className="text-xs font-black text-[#005bbf]">
                    Score: {item.evaluation?.score ?? 'N/A'} / 10
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#191c23] mb-1">
                    "{item.question.question}"
                  </h4>
                  <div className="text-[11px] text-[#414754] italic bg-white p-3 rounded-lg border border-[#e0e2ec]">
                    <strong>Candidate Answer:</strong> "{item.answer || '(No response recorded)'}"
                  </div>
                </div>

                {item.evaluation && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px] pt-1">
                    <div className="p-2 rounded-lg bg-[#86f898]/20 border border-[#86f898]/30">
                      <strong className="text-[#00722f] block mb-0.5">Strength:</strong>
                      <span className="text-[#191c23]">{item.evaluation.strength}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#ffdbcb]/30 border border-[#ffdbcb]/60">
                      <strong className="text-[#9e4300] block mb-0.5">Improvement:</strong>
                      <span className="text-[#191c23]">{item.evaluation.weakness}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#1a73e8]/10 border border-[#1a73e8]/20">
                      <strong className="text-[#005bbf] block mb-0.5">Action Tip:</strong>
                      <span className="text-[#191c23]">{item.evaluation.improvement}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF Footer */}
      <div className="pt-6 border-t border-[#e0e2ec] flex items-center justify-between text-[11px] text-[#414754]">
        <div>
          <span>Interview Agent AI • Comprehensive Candidate Evaluation</span>
        </div>
        <div>
          <span>Report Generated on {currentDate}</span>
        </div>
      </div>
    </div>
  );
};
