import React from 'react';
import { ScreenType } from '../types';

interface LandingViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/20 text-primary border border-primary/20 text-sm font-medium mb-6">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>Powered by Intelligent AI Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-on-surface mb-6 leading-tight">
              Master Your Next Interview with <span className="ai-gradient-text">AI Precision</span>
            </h1>

            <p className="text-lg sm:text-xl text-on-surface-variant mb-8 leading-relaxed">
              Simulate real-world technical and behavioral interviews tailored to your exact role. Get instant, objective feedback to boost your confidence and land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('roles')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-on-primary font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start Free Practice</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>

              <button
                onClick={() => onNavigate('performance')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all border border-outline-variant/60 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary">analytics</span>
                <span>View Insights Demo</span>
              </button>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-outline-variant/40 shadow-2xl glass-effect p-2 sm:p-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU9gFo1nEgyp6l2JR4WPBlRG0NdGMjTYPVy9QpDxpnlJDN865E5S8C4-rS3Hsv2vC6IWJRXqTc8k_bMu3_LrIWhuQFBob9GoXUo1BDghNlFjS6_Q1NwuDRLrnMaCWv5Taz114YwYTEtLX9Y1kngRsJRidfKEraITsBA5PfPgSUjHgDwve6OQxS_MDAlGFR_CSGeJ7dGXqD612VXUlK-QFcnMHxebyV4nXcoeekrsLtzsKev2rPstan"
              alt="Interview Agent AI Dashboard Mockup"
              className="w-full h-auto rounded-xl object-cover shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-surface-container-low border-y border-outline-variant/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-primary mb-1">100+</div>
              <div className="text-sm text-on-surface-variant font-medium">Supported Roles</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-primary mb-1">95%</div>
              <div className="text-sm text-on-surface-variant font-medium">Feedback Accuracy</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-primary mb-1">10k+</div>
              <div className="text-sm text-on-surface-variant font-medium">Mock Hours Run</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-primary mb-1">4.9/5</div>
              <div className="text-sm text-on-surface-variant font-medium">Candidate Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold font-display text-on-surface mb-4">
            Precision Coaching for Every Career
          </h2>
          <p className="text-on-surface-variant">
            Everything you need to practice, refine your responses, and track your career growth in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow hover-lift">
            <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">forum</span>
            </div>
            <h3 className="text-xl font-bold font-display mb-2">Adaptive AI Interviews</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Responds to your answers dynamically with realistic follow-up questions and scenario probes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow hover-lift">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">work</span>
            </div>
            <h3 className="text-xl font-bold font-display mb-2">Role-Specific Tracks</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Choose from Software Engineering, Product Management, Data Science, Design, and Marketing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow hover-lift">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <h3 className="text-xl font-bold font-display mb-2">STAR Scoring Engine</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Evaluates Situation, Task, Action, and Result framing to optimize your communication impact.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow hover-lift">
            <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">insights</span>
            </div>
            <h3 className="text-xl font-bold font-display mb-2">Performance Analytics</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Track skill trends over time, compare domain strength, and pinpoint areas needing focus.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-surface-container-low border-t border-outline-variant/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display text-on-surface mb-4">How It Works</h2>
            <p className="text-on-surface-variant">Three simple steps to interview readiness.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 relative">
              <span className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold">Step 1</span>
              <h3 className="text-xl font-bold mb-3 mt-2">Select Your Role</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Pick your target job title, seniority level (Junior, Mid, Senior), and desired question count.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 relative">
              <span className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold">Step 2</span>
              <h3 className="text-xl font-bold mb-3 mt-2">Simulated Practice</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Answer realistic behavioral and technical questions under realistic timing constraints.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 relative">
              <span className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold">Step 3</span>
              <h3 className="text-xl font-bold mb-3 mt-2">Deep Insights</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Get immediate line-by-line feedback, scoring breakdown, and ideal answer recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl ai-gradient-bg p-8 sm:p-12 text-center text-on-primary relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-primary-fixed-dim mb-8 text-base sm:text-lg">
              Start practicing today with role-tailored questions and instant AI coaching feedback.
            </p>
            <button
              onClick={() => onNavigate('roles')}
              className="px-8 py-4 rounded-xl bg-on-primary text-primary font-bold hover:bg-surface-container-low transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Choose Your Role & Start</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-surface-container border-t border-outline-variant/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold">
              <span className="material-symbols-outlined text-sm">computer</span>
            </div>
            <span className="font-bold font-display text-on-surface">Interview Agent AI</span>
          </div>

          <p className="text-sm text-on-surface-variant">
            &copy; {new Date().getFullYear()} Interview Agent AI. Powered by Intelligent AI Engine.
          </p>

          <div className="flex items-center gap-6 text-sm text-on-surface-variant">
            <button onClick={() => onNavigate('roles')} className="hover:text-primary transition-colors cursor-pointer">Roles</button>
            <button onClick={() => onNavigate('session')} className="hover:text-primary transition-colors cursor-pointer">Session</button>
            <button onClick={() => onNavigate('evaluation')} className="hover:text-primary transition-colors cursor-pointer">Evaluation</button>
            <button onClick={() => onNavigate('performance')} className="hover:text-primary transition-colors cursor-pointer">Performance</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
