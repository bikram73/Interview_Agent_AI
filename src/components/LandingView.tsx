import React, { useState } from 'react';
import { ScreenType } from '../types';
import { Logo } from './Logo';

interface LandingViewProps {
  onNavigate: (screen: ScreenType) => void;
}

interface QuestionSample {
  role: string;
  category: string;
  question: string;
  sampleAnswer: string;
  score: number;
  strength: string;
  weakness: string;
  idealKeyPoints: string[];
}

const QUESTION_SAMPLES: QuestionSample[] = [
  {
    role: 'Python Full Stack',
    category: 'Architecture & Concurrency',
    question: 'How does Python’s Global Interpreter Lock (GIL) impact multithreading, and what strategies do you use for CPU-bound tasks?',
    sampleAnswer: 'The GIL ensures that only one thread executes Python bytecode at a time. For I/O-bound tasks, multithreading works well, but for CPU-heavy tasks, I utilize the multiprocessing module or Celery task queues to bypass the GIL by spawning isolated OS processes with independent memory spaces.',
    score: 9.2,
    strength: 'Precise distinction between I/O and CPU bottlenecks with production-grade mitigation strategies (multiprocessing/Celery).',
    weakness: 'Could briefly touch on modern alternatives like Python 3.13 free-threading or Cython extensions.',
    idealKeyPoints: [
      'Define GIL lock mechanism at CPython runtime level',
      'Contrast I/O-bound (threads/asyncio) vs CPU-bound tasks',
      'Explain multiprocessing, Celery workers, and sub-interpreters'
    ]
  },
  {
    role: 'System Design',
    category: 'Distributed Systems',
    question: 'Design a resilient URL shortening service (like Bitly) supporting 100M daily writes with sub-10ms latency.',
    sampleAnswer: 'I design a distributed architecture using Base62 encoding on a 64-bit auto-incrementing ID generated via a distributed counter like Twitter Snowflake. I place Redis caching in front of a sharded Cassandra cluster to satisfy the 10ms read SLA and use Kafka for async analytics logging.',
    score: 9.5,
    strength: 'Excellent algorithmic choice (Snowflake ID + Base62) and appropriate storage layer caching strategy.',
    weakness: 'Could mention cache eviction policies (LRU) and custom alias collision handling.',
    idealKeyPoints: [
      'Unique ID generation (Snowflake / ZooKeeper counter)',
      'Base62 encoding avoiding hash collision bottlenecks',
      'Multi-tier caching (Redis/Memcached) and partitioned NoSQL storage'
    ]
  },
  {
    role: 'Product Manager',
    category: 'Product Strategy & Metrics',
    question: 'How would you measure the success of launching AI auto-suggestions in an enterprise workflow app?',
    sampleAnswer: 'I would define our North Star metric as Daily Active Workflows Completed with AI. Secondary metrics would be Suggestion Acceptance Rate (target >35%), Time Saved per Task (measuring a 20% reduction), and CSAT score. Guardrail metrics include Error Rollback rate and Latency p95 under 400ms.',
    score: 9.0,
    strength: 'Structured multi-tier metric framework (North Star, Secondary adoption, and critical Guardrails).',
    weakness: 'Add a specific A/B testing cohort methodology to validate long-term user retention.',
    idealKeyPoints: [
      'Clear North Star metric aligned with customer business value',
      'Adoption & efficiency metrics (Acceptance rate, time reduction)',
      'Safety and guardrail metrics (p95 latency, undo/rollback rates)'
    ]
  },
  {
    role: 'AI / Machine Learning',
    category: 'Model Generalization',
    question: 'How do you detect and prevent overfitting in a deep transformer model with limited fine-tuning data?',
    sampleAnswer: 'I monitor train vs validation loss divergence. To combat overfitting, I apply Low-Rank Adaptation (LoRA) with high weight decay, aggressive dropout (0.2-0.3), label smoothing, and early stopping. Additionally, I use synthetic data augmentation with strict embedding diversity filters.',
    score: 9.4,
    strength: 'Clear understanding of parameter-efficient fine-tuning (PEFT/LoRA) and data augmentation best practices.',
    weakness: 'Could also mention k-fold cross-validation or validation metric calibration.',
    idealKeyPoints: [
      'Observing training vs validation divergence metrics',
      'PEFT strategies (LoRA/QLoRA) restricting trainable parameters',
      'Regularization: Dropout, Weight Decay, and Early Stopping'
    ]
  }
];

const ROLE_TRACKS = [
  {
    id: 'python-dev',
    title: 'Python Full Stack Developer',
    icon: 'code',
    difficulty: 'Intermediate',
    topics: ['FastAPI / Django', 'PostgreSQL', 'AsyncIO', 'Docker'],
    salaryAvg: '$135k - $175k',
    questionsCount: '45+ Questions'
  },
  {
    id: 'react-frontend',
    title: 'Senior Frontend Architect',
    icon: 'web',
    difficulty: 'Advanced',
    topics: ['React 19', 'Next.js', 'State Machines', 'Web Vitals'],
    salaryAvg: '$140k - $190k',
    questionsCount: '50+ Questions'
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI / Machine Learning Engineer',
    icon: 'psychology',
    difficulty: 'Advanced',
    topics: ['LLMs & RAG', 'PyTorch', 'Vector DBs', 'Model Evaluation'],
    salaryAvg: '$160k - $220k',
    questionsCount: '40+ Questions'
  },
  {
    id: 'system-design',
    title: 'Distributed Systems Architect',
    icon: 'schema',
    difficulty: 'Expert',
    topics: ['High Availability', 'Kafka', 'Sharding', 'CAP Theorem'],
    salaryAvg: '$170k - $240k',
    questionsCount: '35+ Questions'
  },
  {
    id: 'product-manager',
    title: 'Technical Product Manager',
    icon: 'tactic',
    difficulty: 'Intermediate',
    topics: ['Roadmapping', 'User Research', 'GTM Strategy', 'Data Analytics'],
    salaryAvg: '$130k - $185k',
    questionsCount: '40+ Questions'
  },
  {
    id: 'devops-cloud',
    title: 'Cloud & DevOps Engineer',
    icon: 'cloud_sync',
    difficulty: 'Intermediate',
    topics: ['Kubernetes', 'Terraform', 'CI/CD Pipelines', 'AWS/GCP'],
    salaryAvg: '$145k - $195k',
    questionsCount: '42+ Questions'
  }
];

const FAQS = [
  {
    q: 'How realistic are the simulated interview questions and scoring?',
    a: 'Questions and evaluation criteria are aligned with current hiring rubrics from top tech companies and Fortune 500 engineering teams. The AI evaluates technical depth, STAR methodology compliance, and communication clarity with calibrated scoring out of 10.0.'
  },
  {
    q: 'Can I practice with my voice instead of typing?',
    a: 'Yes! The platform includes built-in live voice speech-to-text recognition. You can speak naturally through your microphone, pause, and submit your transcribed response directly to the coach.'
  },
  {
    q: 'Can I create a custom role not listed in the catalog?',
    a: 'Absolutely. Use the "Custom Role Builder" in the Roles configuration page. Enter any job title or niche technology (e.g., "Web3 Smart Contract Auditor" or "Healthcare Data Analyst") and the AI will dynamically generate customized technical and behavioral interview questions.'
  },
  {
    q: 'How does the PDF report export work?',
    a: 'After completing an interview session, you receive a comprehensive report complete with strength analyses, rubric breakdowns, and improvement roadmaps. You can download and print a professionally formatted PDF scorecard with a single click.'
  }
];

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const sample = QUESTION_SAMPLES[selectedSampleIndex];

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/20 text-primary border border-primary/20 text-sm font-medium mb-6">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>Intelligent Technical & Behavioral Coach</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-on-surface mb-6 leading-tight">
              Master Your Next Interview with <span className="ai-gradient-text">AI Precision</span>
            </h1>

            <p className="text-lg sm:text-xl text-on-surface-variant mb-8 leading-relaxed">
              Simulate realistic interviews tailored to your exact role, seniority, and tech stack. Receive instant line-by-line feedback, STAR scoring, and comprehensive PDF performance reports.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('roles')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-on-primary font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Start Practice Session</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>

              <button
                onClick={() => onNavigate('performance')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all border border-outline-variant/60 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary">analytics</span>
                <span>View Sample Candidate Report</span>
              </button>
            </div>
          </div>

          {/* Hero Banner Showcase */}
          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-outline-variant/40 shadow-2xl glass-effect p-2 sm:p-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU9gFo1nEgyp6l2JR4WPBlRG0NdGMjTYPVy9QpDxpnlJDN865E5S8C4-rS3Hsv2vC6IWJRXqTc8k_bMu3_LrIWhuQFBob9GoXUo1BDghNlFjS6_Q1NwuDRLrnMaCWv5Taz114YwYTEtLX9Y1kngRsJRidfKEraITsBA5PfPgSUjHgDwve6OQxS_MDAlGFR_CSGeJ7dGXqD612VXUlK-QFcnMHxebyV4nXcoeekrsLtzsKev2rPstan"
              alt="Interview Agent AI Dashboard Preview"
              className="w-full h-auto rounded-xl object-cover shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* Live Impact Stats Section */}
      <section className="py-12 bg-surface-container-low border-y border-outline-variant/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-primary mb-1">100+</div>
              <div className="text-sm text-on-surface-variant font-medium">Standard & Custom Roles</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-primary mb-1">96.4%</div>
              <div className="text-sm text-on-surface-variant font-medium">Rubric Accuracy Rating</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-primary mb-1">45k+</div>
              <div className="text-sm text-on-surface-variant font-medium">Mock Questions Completed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold font-display text-primary mb-1">4.9 / 5</div>
              <div className="text-sm text-on-surface-variant font-medium">Candidate Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Question & Scoring Sampler */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-sm">psychology</span>
            <span>Interactive Live Playground</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-on-surface mb-4">
            See How the AI Evaluates Your Answers
          </h2>
          <p className="text-on-surface-variant">
            Explore sample questions across top technical tracks to preview the instant scoring, critique, and ideal key points generated by the engine.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {QUESTION_SAMPLES.map((item, idx) => (
            <button
              key={item.role}
              onClick={() => setSelectedSampleIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSampleIndex === idx
                  ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/40'
              }`}
            >
              {item.role}
            </button>
          ))}
        </div>

        {/* Live Sampler Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-6 sm:p-8 soft-shadow">
          {/* Left Column: Question & Candidate Answer */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-primary px-3 py-1 rounded-lg bg-primary/10">
                  {sample.category}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">Sample Question</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-on-surface">
                "{sample.question}"
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">record_voice_over</span>
                <span>Candidate Response</span>
              </div>
              <p className="text-sm text-on-surface leading-relaxed italic">
                "{sample.sampleAnswer}"
              </p>
            </div>

            <div>
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                Ideal Answer Key Points:
              </div>
              <div className="space-y-2">
                {sample.idealKeyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-on-surface">
                    <span className="material-symbols-outlined text-sm text-primary shrink-0 mt-0.5">check_circle</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Critique & Score */}
          <div className="lg:col-span-5 bg-surface-container-low rounded-2xl p-6 border border-outline-variant/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4 mb-4">
                <div>
                  <div className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">AI Rubric Score</div>
                  <div className="text-2xl font-bold font-display text-on-surface">
                    {sample.score} <span className="text-sm text-on-surface-variant font-normal">/ 10.0</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-black text-base shadow-sm">
                  {sample.score >= 9 ? 'A+' : 'A'}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                    <span>Key Strength</span>
                  </div>
                  <p className="text-xs text-on-surface leading-relaxed">{sample.strength}</p>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">lightbulb</span>
                    <span>Growth Opportunity</span>
                  </div>
                  <p className="text-xs text-on-surface leading-relaxed">{sample.weakness}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('roles')}
              className="w-full py-3 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Practice Full Interview for This Role</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Career Tracks */}
      <section className="py-20 bg-surface-container-low border-y border-outline-variant/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-sm">work</span>
                <span>Curated Industry Tracks</span>
              </div>
              <h2 className="text-3xl font-bold font-display text-on-surface">
                Popular Role Specializations
              </h2>
            </div>
            <button
              onClick={() => onNavigate('roles')}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore all 100+ roles</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROLE_TRACKS.map((track) => (
              <div
                key={track.id}
                onClick={() => onNavigate('roles')}
                className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 transition-all soft-shadow hover-lift cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined">{track.icon}</span>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
                      {track.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-on-surface mb-2">{track.title}</h3>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {track.topics.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-container-low text-on-surface-variant border border-outline-variant/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
                  <span className="font-semibold text-primary">{track.salaryAvg}</span>
                  <span>{track.questionsCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Dimensional Assessment Framework */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold font-display text-on-surface mb-4">
            Comprehensive Evaluation Matrix
          </h2>
          <p className="text-on-surface-variant">
            Our AI engine scores every response across five core hiring pillars to deliver actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center mb-5">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <h3 className="text-lg font-bold font-display mb-2">Technical Depth</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Analyzes core concepts, algorithm complexity (Big-O), systems trade-offs, and practical architecture patterns.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center mb-5">
              <span className="material-symbols-outlined">fact_check</span>
            </div>
            <h3 className="text-lg font-bold font-display mb-2">STAR Methodology</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Verifies structured framing of Situation, Task, Action, and measurable Results in behavioral scenarios.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center mb-5">
              <span className="material-symbols-outlined">record_voice_over</span>
            </div>
            <h3 className="text-lg font-bold font-display mb-2">Clarity & Brevity</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Evaluates response pacing, filler words, concise technical terminology, and active voice phrasing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center mb-5">
              <span className="material-symbols-outlined">security</span>
            </div>
            <h3 className="text-lg font-bold font-display mb-2">Edge Cases & Resilience</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Checks whether you identify race conditions, scaling bottlenecks, security hazards, and failover paths.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center mb-5">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <h3 className="text-lg font-bold font-display mb-2">Business Alignment</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Ensures solutions prioritize customer business value, ROI impact, maintainability, and delivery speed.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center mb-5">
              <span className="material-symbols-outlined">picture_as_pdf</span>
            </div>
            <h3 className="text-lg font-bold font-display mb-2">Themed PDF Reports</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Generates download-ready candidate scorecards complete with skill radar graphs and next-step milestones.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table: Traditional Prep vs Interview Agent AI */}
      <section className="py-20 bg-surface-container-low border-t border-outline-variant/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display text-on-surface mb-4">
              Why Practice with Interview Agent AI?
            </h2>
            <p className="text-on-surface-variant">
              Compare traditional interview prep against real-time adaptive AI coaching.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant/40 overflow-hidden text-left text-sm">
              <thead className="bg-surface-container-high border-b border-outline-variant/40 text-on-surface">
                <tr>
                  <th className="p-4 font-bold">Feature / Capability</th>
                  <th className="p-4 font-bold text-on-surface-variant">LeetCode / Textbook Reading</th>
                  <th className="p-4 font-bold text-on-surface-variant">Peer Mock Interviews</th>
                  <th className="p-4 font-bold text-primary">Interview Agent AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-on-surface-variant">
                <tr>
                  <td className="p-4 font-semibold text-on-surface">Instant 24/7 Availability</td>
                  <td className="p-4 text-emerald-600 font-medium">Yes</td>
                  <td className="p-4 text-rose-500 font-medium">No (Requires scheduling)</td>
                  <td className="p-4 text-primary font-bold">Yes (Instant on-demand)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">Real-Time Spoken Audio / Voice</td>
                  <td className="p-4 text-rose-500 font-medium">No</td>
                  <td className="p-4 text-emerald-600 font-medium">Yes</td>
                  <td className="p-4 text-primary font-bold">Yes (Integrated Speech-to-Text)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">Objective Multi-Point Scoring</td>
                  <td className="p-4 text-rose-500 font-medium">Pass / Fail only</td>
                  <td className="p-4 text-amber-500 font-medium">Subjective</td>
                  <td className="p-4 text-primary font-bold">Calibrated AI Rubrics</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">Custom Niche Roles Support</td>
                  <td className="p-4 text-rose-500 font-medium">Fixed presets only</td>
                  <td className="p-4 text-amber-500 font-medium">Limited by peer knowledge</td>
                  <td className="p-4 text-primary font-bold">Any Role via AI Builder</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-on-surface">Exportable PDF Scorecard</td>
                  <td className="p-4 text-rose-500 font-medium">No</td>
                  <td className="p-4 text-rose-500 font-medium">No</td>
                  <td className="p-4 text-primary font-bold">One-Click PDF Export</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Candidate Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold font-display text-on-surface mb-4">
            Candidate Success Stories
          </h2>
          <p className="text-on-surface-variant">
            See how developers and professionals used Interview Agent AI to land their dream positions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow flex flex-col justify-between">
            <p className="text-sm text-on-surface leading-relaxed mb-6 italic">
              "The STAR scoring engine completely transformed how I answered behavioral questions. I used to ramble, but the line-by-line critique taught me how to quantify my achievements. Landed an L5 Software Engineer role at Google!"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                DK
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface">Devon K.</div>
                <div className="text-[11px] text-on-surface-variant">Senior Backend Engineer</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow flex flex-col justify-between">
            <p className="text-sm text-on-surface leading-relaxed mb-6 italic">
              "Being able to generate custom interview questions for a niche 'AI Healthcare Solutions Architect' role was incredible. The technical questions were spot-on with what the interviewers actually asked."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                SL
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface">Sarah L.</div>
                <div className="text-[11px] text-on-surface-variant">AI Solutions Architect</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow flex flex-col justify-between">
            <p className="text-sm text-on-surface leading-relaxed mb-6 italic">
              "The PDF performance report helped me see exactly where my system design answers were weak on edge case handling. Practicing 3 times a week doubled my confidence before on-site rounds."
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                MR
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface">Marcus R.</div>
                <div className="text-[11px] text-on-surface-variant">Staff Product Manager</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-surface-container-low border-t border-outline-variant/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-on-surface mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-on-surface-variant">
              Everything you need to know about the practice environment and AI scoring.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-surface-container-lowest border border-outline-variant/40 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm text-on-surface flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`material-symbols-outlined text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/30 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl ai-gradient-bg p-8 sm:p-12 text-center text-on-primary relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Ready to Accelerate Your Interview Readiness?
            </h2>
            <p className="text-primary-fixed-dim mb-8 text-base sm:text-lg">
              Pick your target role, simulate real-time questions, and get your personalized career readiness score today.
            </p>
            <button
              onClick={() => onNavigate('roles')}
              className="px-8 py-4 rounded-xl bg-on-primary text-primary font-bold hover:bg-surface-container-low transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Practice Session</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-surface-container border-t border-outline-variant/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo onClick={() => onNavigate('landing')} />

          <p className="text-sm text-on-surface-variant">
            &copy; {new Date().getFullYear()} Interview Agent AI. Powered by Intelligent AI Engine.
          </p>

          <div className="flex items-center gap-6 text-sm text-on-surface-variant font-medium">
            <button onClick={() => onNavigate('landing')} className="hover:text-primary transition-colors cursor-pointer">Home</button>
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

