import React, { useState } from 'react';
import { ScreenType, InterviewConfig } from '../types';

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
      {/* Left Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-surface-container-low border-r border-outline-variant/40 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md">
              <span className="material-symbols-outlined">computer</span>
            </div>
            <div>
              <div className="font-bold font-display text-on-surface leading-tight">Interview Agent</div>
              <div className="text-xs text-primary font-semibold">Smart Coaching Platform</div>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => onNavigate('landing')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors text-sm font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">home</span>
              <span>Home Landing</span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-container/20 text-primary text-sm font-semibold cursor-pointer"
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

        <div className="pt-6 border-t border-outline-variant/40 mt-8">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40">
            <div className="w-10 h-10 rounded-full bg-primary-fixed-dim text-on-primary-fixed font-bold flex items-center justify-center">
              AI
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-semibold truncate">Candidate Workspace</div>
              <div className="text-xs text-on-surface-variant truncate">Session Memory Active</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold font-display text-on-surface mb-2">Select Target Job Role</h1>
          <p className="text-on-surface-variant">Choose your target technical or management track, configure experience parameters, and launch your AI mock interview.</p>
        </header>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              type="text"
              placeholder="Search roles (e.g. Python, AI Engineer, Java...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
            {['All', 'Software Engineering', 'AI & ML', 'Data Science', 'Security & Cloud', 'HR & Soft Skills', 'Custom'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {filteredRoles.map((role) => {
            const isSelected = selectedRoleId === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'role-card-selected'
                    : 'bg-surface-container-lowest border-outline-variant/40 hover:border-primary/50 soft-shadow'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl">{role.icon}</span>
                    </div>
                    {role.badge && (
                      <span className="px-3 py-1 rounded-full bg-secondary-container/40 text-secondary text-xs font-bold">
                        {role.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold font-display text-on-surface mb-1">{role.title}</h3>
                  <div className="text-xs text-on-surface-variant mb-3 flex items-center gap-2">
                    <span>{role.category}</span>
                    <span>•</span>
                    <span>{role.questionsCount} Qs</span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 soft-shadow">
            <h2 className="text-xl font-bold font-display text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">tune</span>
              <span>Session Customization</span>
            </h2>

            {/* Experience Level */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                Experience Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Fresher / Entry Level',
                  'Junior (1-2 yrs)',
                  'Mid Level (3-5 yrs)',
                  'Senior (6+ yrs)'
                ].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
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
                <span className="text-sm font-bold text-primary">{questionCount} Questions (~{questionCount * 3} mins)</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { count: 5, label: '5 Questions (Standard)' },
                  { count: 8, label: '8 Questions (In-Depth)' },
                  { count: 10, label: '10 Questions (Comprehensive)' }
                ].map((opt) => (
                  <button
                    key={opt.count}
                    onClick={() => setQuestionCount(opt.count)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
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
          <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/40 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold font-display text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">psychology</span>
                <span>AI Interviewer Readiness</span>
              </h3>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <div className="text-xs text-on-surface-variant font-medium">Selected Role</div>
                  <div className="text-base font-bold text-on-surface">{activeRoleTitle}</div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <div className="text-xs text-on-surface-variant font-medium">Experience Level</div>
                  <div className="text-sm font-semibold text-primary">{experienceLevel}</div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <div className="text-xs text-on-surface-variant font-medium mb-1">AI Assessment Engine</div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Autonomous AI will generate custom role questions and evaluate each answer instantly.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
    </div>
  );
};
