import React from 'react';
import { ScreenType } from '../types';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate }) => {
  return (
    <header className="glass-header sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-outline-variant/40 shadow-sm">
      {/* Brand Logo */}
      <div
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-xl">computer</span>
        </div>
        <div>
          <div className="font-bold font-display text-base text-on-surface leading-tight">
            Interview Agent AI
          </div>
          <div className="text-[10px] text-primary font-bold uppercase tracking-wider">
            Powered by Gemini
          </div>
        </div>
      </div>

      {/* Screen Switcher Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/30">
        <button
          onClick={() => onNavigate('landing')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentScreen === 'landing'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Home
        </button>

        <button
          onClick={() => onNavigate('roles')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentScreen === 'roles'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Roles & Config
        </button>

        <button
          onClick={() => onNavigate('session')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentScreen === 'session'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Active Interview
        </button>

        <button
          onClick={() => onNavigate('evaluation')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentScreen === 'evaluation'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Evaluation
        </button>

        <button
          onClick={() => onNavigate('performance')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentScreen === 'performance'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Performance
        </button>
      </nav>

      {/* Right Side CTA */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('roles')}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">play_arrow</span>
          <span>Start Session</span>
        </button>
      </div>
    </header>
  );
};
