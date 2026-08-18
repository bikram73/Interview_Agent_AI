import React, { useState } from 'react';
import { ScreenType } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'landing', label: 'Home', icon: 'home' },
    { id: 'roles', label: 'Roles & Config', icon: 'work' },
    { id: 'session', label: 'Active Interview', icon: 'play_circle' },
    { id: 'evaluation', label: 'Evaluation', icon: 'fact_check' },
    { id: 'performance', label: 'Performance', icon: 'analytics' },
  ];

  const handleNavClick = (screen: ScreenType) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="glass-header sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-outline-variant/40 shadow-xs">
      {/* Brand Logo */}
      <Logo onClick={() => onNavigate('landing')} size="md" />

      {/* Desktop / Tablet Screen Switcher Navigation Links */}
      <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/30">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentScreen === item.id
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Tablet-specific compact navigation (md only) */}
      <nav className="hidden md:flex lg:hidden items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            title={item.label}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center ${
              currentScreen === item.id
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
          </button>
        ))}
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => onNavigate('roles')}
          className="hidden sm:flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all shadow-md cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-sm">play_arrow</span>
          <span>Start Session</span>
        </button>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden p-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Slide-Down Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bg-surface/95 backdrop-blur-xl border-b border-outline-variant/40 shadow-xl p-4 z-50 animate-in slide-in-from-top-2">
          <div className="space-y-1.5 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  currentScreen === item.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick('roles')}
            className="w-full py-3 rounded-xl bg-primary text-on-primary text-sm font-bold flex items-center justify-center gap-2 shadow-md"
          >
            <span className="material-symbols-outlined text-base">play_arrow</span>
            <span>Launch Mock Interview</span>
          </button>
        </div>
      )}
    </header>
  );
};

