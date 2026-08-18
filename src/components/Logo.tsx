import React from 'react';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  onClick,
  className = '',
  showSubtitle = true,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 'w-8 h-8 text-lg' : size === 'lg' ? 'w-12 h-12 text-2xl' : 'w-10 h-10 text-xl';
  const titleSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-base';
  const subtitleSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      title="Interview Agent AI"
    >
      <div className={`${iconSize} rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md shadow-primary/20 ${onClick ? 'group-hover:scale-105 transition-transform' : ''} shrink-0`}>
        <span className="material-symbols-outlined">computer</span>
      </div>
      <div>
        <div className={`font-bold font-display ${titleSize} text-on-surface leading-tight`}>
          Interview Agent AI
        </div>
        {showSubtitle && (
          <div className={`${subtitleSize} text-primary font-bold uppercase tracking-wider`}>
            Powered by AI Engine
          </div>
        )}
      </div>
    </div>
  );
};
