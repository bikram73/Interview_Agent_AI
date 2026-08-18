import React from 'react';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  onClick,
  className = '',
  showSubtitle = true,
  subtitleText = 'Powered by AI Engine',
  size = 'md',
}) => {
  const iconSize =
    size === 'sm'
      ? 'w-8 h-8 text-base'
      : size === 'lg'
      ? 'w-11 h-11 sm:w-12 sm:h-12 text-xl sm:text-2xl'
      : 'w-9 h-9 sm:w-10 sm:h-10 text-lg sm:text-xl';

  const titleSize =
    size === 'sm'
      ? 'text-xs'
      : size === 'lg'
      ? 'text-base sm:text-lg'
      : 'text-sm sm:text-base';

  const subtitleSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 sm:gap-3 shrink-0 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      title="Interview Agent AI"
    >
      <div
        className={`${iconSize} rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md shadow-primary/20 ${
          onClick ? 'group-hover:scale-105 active:scale-95 transition-transform' : ''
        } shrink-0`}
      >
        <span className="material-symbols-outlined text-[1.25em]">computer</span>
      </div>
      <div className="flex flex-col">
        <div className={`font-bold font-display ${titleSize} text-on-surface leading-tight tracking-tight whitespace-nowrap`}>
          Interview Agent AI
        </div>
        {showSubtitle && (
          <div className={`${subtitleSize} text-primary font-bold tracking-tight whitespace-nowrap flex items-center gap-1`}>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block animate-pulse shrink-0" />
            <span>{subtitleText}</span>
          </div>
        )}
      </div>
    </div>
  );
};

