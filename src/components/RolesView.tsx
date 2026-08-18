import React, { useState } from 'react';
import { ScreenType, InterviewConfig } from '../types';
import { Logo } from './Logo';

interface RolesViewProps {
  onNavigate: (screen: ScreenType) => void;
  onStartInterview: (config: InterviewConfig) => void;
  isLoading?: boolean;
}

export const RolesView: React.FC<RolesViewProps> = ({
  onNavigate,
  onStartInterview,
  isLoading = false,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState('python-dev');
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Fresher / Entry Level');
  const [questionCount, setQuestionCount] = useState(5);

  const roles = [
    {
      id: 'python-dev',
      title: 'Python Developer',
      category: 'Software Engineering',
      badge: 'Popular',
      questionsCount: 5,
      avgScore: '84%',
      icon: 'code',
      description: 'Data structures, OOP, async programming, decorators, FastAPI, Django, and memory management in Python.'
    },
    {
      id: 'java-dev',
      title: 'Java Developer',
      category: 'Software Engineering',
      badge: 'In Demand',
      questionsCount: 5,
      avgScore: '82%',
      icon: 'terminal',
      description: 'Spring Boot, JVM internals, multithreading, concurrency, microservices architecture, and OOP principles.'
    },
    {
      id: 'frontend-dev',
      title: 'Frontend Developer',
      category: 'Software Engineering',
      badge: 'Popular',
      questionsCount: 5,
      avgScore: '88%',
      icon: 'javascript',
      description: 'React 19, TypeScript, modern CSS/Tailwind, state management, web performance, and browser rendering.'
    },
    {
      id: 'backend-dev',
      title: 'Backend Developer',
      category: 'Software Engineering',
      badge: 'In Demand',
      questionsCount: 5,
      avgScore: '83%',
      icon: 'dns',
      description: 'REST APIs, database indexing, caching strategies (Redis), authentication, security, and system scalability.'
    },
    {
      id: 'fullstack-dev',
      title: 'Full Stack Developer',
      category: 'Software Engineering',
      badge: 'Trending',
      questionsCount: 5,
      avgScore: '85%',
      icon: 'layers',
      description: 'End-to-end web applications, Node.js/Express, React, databases, CI/CD pipelines, and cloud integration.'
    },
    {
      id: 'ai-engineer',
      title: 'AI Engineer',
      category: 'AI & ML',
      badge: 'Hot Role',
      questionsCount: 5,
      avgScore: '86%',
      icon: 'auto_awesome',
      description: 'LLMs, RAG architecture, prompt engineering, AI agents, embeddings, modern AI APIs, and vector databases.'
    },
    {
      id: 'ml-engineer',
      title: 'Machine Learning Engineer',
      category: 'AI & ML',
      badge: 'High Salary',
      questionsCount: 5,
      avgScore: '81%',
      icon: 'memory',
      description: 'Model training, PyTorch/TensorFlow, model evaluation, feature engineering, and MLOps pipelines.'
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      category: 'Data Science',
      badge: '',
      questionsCount: 5,
      avgScore: '81%',
      icon: 'query_stats',
      description: 'Statistical modeling, A/B testing, Pandas/NumPy, SQL analytics, data visualization, and predictive modeling.'
    },
    {
      id: 'cybersecurity',
      title: 'Cyber Security Analyst',
      category: 'Security & Cloud',
      badge: 'Essential',
      questionsCount: 5,
      avgScore: '80%',
      icon: 'shield',
      description: 'Network security, penetration testing, threat detection, IAM, encryption standards, and incident response.'
    },
    {
      id: 'cloud-engineer',
      title: 'Cloud Engineer',
      category: 'Security & Cloud',
      badge: '',
      questionsCount: 5,
      avgScore: '83%',
      icon: 'cloud_sync',
      description: 'GCP, AWS, Terraform, Docker, Kubernetes, serverless architecture, and cloud security compliance.'
    },
    {
      id: 'hr-interview',
      title: 'HR & Behavioral Interview',
      category: 'HR & Soft Skills',
      badge: 'Universal',
      questionsCount: 5,
      avgScore: '89%',
      icon: 'groups',
      description: 'Conflict resolution, leadership scenarios, STAR framework questions, salary expectations, and career goals.'
    },
    {
      id: 'custom-role',
      title: 'Custom Job Role',
      category: 'Custom',
      badge: 'Flexible',
      questionsCount: 5,
      avgScore: 'N/A',
      icon: 'edit_square',
      description: 'Enter any specific job role, industry position, or specialized niche for custom AI question generation.'
    }
  ];

  const filteredRoles = roles.filter(role => {
    const matchesCategory = categoryFilter === 'All' || role.category === categoryFilter;
    const matchesSearch = role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          role.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedRoleObj = roles.find(r => r.id === selectedRoleId) || roles[0];
  const activeRoleTitle = selectedRoleId === 'custom-role' && customRoleInput.trim()
    ? customRoleInput.trim()
    : selectedRoleObj.title;

  const handleStart = () => {
    onStartInterview({
      role: activeRoleTitle,
      experience: experienceLevel,
      questionCount: questionCount,
      customRole: selectedRoleId === 'custom-role' ? customRoleInput : undefined
    });
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col lg:flex-row">
      {/* Sidebar Navigation - Desktop vs Mobile/Tablet */}
      <aside className="w-full lg:w-64 bg-surface-container-low border-b lg:border-b-0 lg:border-r border-outline-variant/40 p-4 sm:p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="mb-4 lg:mb-8 flex items-center justify-between lg:block">
            <Logo onClick={() => onNavigate('landing')} />
            <span className="lg:hidden text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              Role Setup
            </span>
          </div>

          <nav className="hidden lg:block space-y-1">
            <button
              onClick={() => onNavigate('landing')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">home</span>
              <span>Home Landing</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-on-primary text-sm font-semibold shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">work</span>
              <span>Role Selection</span>
            </button>

            <button
              onClick={() => onNavigate('session')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">play_circle</span>
              <span>Active Session</span>
            </button>

            <button
              onClick={() => onNavigate('evaluation')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">fact_check</span>
              <span>Answer Evaluation</span>
            </button>

            <button
              onClick={() => onNavigate('performance')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">analytics</span>
              <span>Final Report</span>
            </button>
          </nav>
        </div>

        <div className="hidden lg:block pt-6 border-t border-outline-variant/40 mt-8">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40">
            <div className="w-9 h-9 rounded-full bg-primary-fixed-dim text-on-primary-fixed font-bold flex items-center justify-center text-sm">
              AI
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold truncate">Candidate Workspace</div>
              <div className="text-[11px] text-on-surface-variant truncate">Session Memory Active</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full pb-28 lg:pb-12">
        <header className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Target Role & Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-on-surface mb-2">Select Target Job Role</h1>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Choose your target technical or management track, configure experience parameters, and launch your AI mock interview.
          </p>
        </header>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              type="text"
              placeholder="Search roles (e.g. Python, AI Engineer, Java...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:outline-none focus:border-primary text-sm shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {['All', 'Software Engineering', 'AI & ML', 'Data Science', 'Security & Cloud', 'HR & Soft Skills', 'Custom'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  categoryFilter === cat
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {filteredRoles.map((role) => {
            const isSelected = selectedRoleId === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'role-card-selected'
                    : 'bg-surface-container-lowest border-outline-variant/40 hover:border-primary/50 soft-shadow'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl sm:text-2xl">{role.icon}</span>
                    </div>
                    {role.badge && (
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-secondary-container/40 text-secondary text-[11px] sm:text-xs font-bold">
                        {role.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-on-surface mb-1">{role.title}</h3>
                  <div className="text-xs text-on-surface-variant mb-3 flex items-center gap-2">
                    <span>{role.category}</span>
                    <span>•</span>
                    <span>{role.questionsCount} Qs</span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
                    {role.description}
                  </p>

                  {role.id === 'custom-role' && isSelected && (
                    <div className="mb-4 mt-2" onClick={(e) => e.stopPropagation()}>
                      <label className="block text-xs font-bold text-primary mb-1">Enter Custom Job Role Title:</label>
                      <input
                        type="text"
                        value={customRoleInput}
                        onChange={(e) => setCustomRoleInput(e.target.value)}
                        placeholder="e.g. Embedded C++ Engineer, iOS Developer..."
                        className="w-full px-3 py-2 rounded-lg bg-surface-container-lowest border border-primary text-xs focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30 text-xs font-semibold">
                  <span className={isSelected ? 'text-primary font-bold' : 'text-on-surface-variant'}>
                    {isSelected ? 'Selected Track' : 'Click to Select'}
                  </span>
                  <span className={`material-symbols-outlined text-base ${isSelected ? 'text-primary' : 'text-outline'}`}>
                    {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Session Configuration & Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="lg:col-span-2 p-5 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <h2 className="text-lg sm:text-xl font-bold font-display text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">tune</span>
              <span>Session Customization</span>
            </h2>

            {/* Experience Level */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                Experience Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
                {[
                  'Fresher / Entry Level',
                  'Junior (1-2 yrs)',
                  'Mid Level (3-5 yrs)',
                  'Senior (6+ yrs)'
                ].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-2.5 sm:py-3 px-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer text-center ${
                      experienceLevel === lvl
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Number of Questions
                </label>
                <span className="text-xs sm:text-sm font-bold text-primary">{questionCount} Questions (~{questionCount * 3} mins)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { count: 5, label: '5 Questions (Standard)' },
                  { count: 8, label: '8 Questions (In-Depth)' },
                  { count: 10, label: '10 Questions (Comprehensive)' }
                ].map((opt) => (
                  <button
                    key={opt.count}
                    onClick={() => setQuestionCount(opt.count)}
                    className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center ${
                      questionCount === opt.count
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Prep Sidebar Info */}
          <div className="p-5 sm:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/40 flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">psychology</span>
                <span>AI Interviewer Readiness</span>
              </h3>

              <div className="space-y-3 sm:space-y-4 mb-6">
                <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <div className="text-xs text-on-surface-variant font-medium">Selected Role</div>
                  <div className="text-sm sm:text-base font-bold text-on-surface truncate">{activeRoleTitle}</div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <div className="text-xs text-on-surface-variant font-medium">Experience Level</div>
                  <div className="text-xs sm:text-sm font-semibold text-primary">{experienceLevel}</div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <div className="text-xs text-on-surface-variant font-medium mb-1">AI Assessment Engine</div>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant leading-relaxed">
                    AI engine dynamically generates role questions and evaluates each answer instantly.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={isLoading}
              className="w-full py-3.5 sm:py-4 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                  <span>Generating AI Questions...</span>
                </>
              ) : (
                <>
                  <span>Launch Practice Session</span>
                  <span className="material-symbols-outlined">play_arrow</span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/40 p-3 z-30 flex items-center justify-between gap-3 shadow-xl">
        <div className="overflow-hidden">
          <div className="text-xs font-bold text-on-surface truncate">{activeRoleTitle}</div>
          <div className="text-[10px] text-on-surface-variant">{questionCount} Qs • {experienceLevel}</div>
        </div>

        <button
          onClick={handleStart}
          disabled={isLoading}
          className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-md flex items-center gap-1.5 shrink-0 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Start</span>
              <span className="material-symbols-outlined text-sm">play_arrow</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
