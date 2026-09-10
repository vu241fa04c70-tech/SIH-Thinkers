import React, { useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';

interface InfoTooltipProps {
  text: string;
  title?: string;
  icon?: 'info' | 'help';
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  text,
  title,
  icon = 'info',
  position = 'top'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const IconComponent = icon === 'help' ? HelpCircle : Info;

  return (
    <span className="relative inline-flex items-center ml-1 z-20">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-slate-700 hover:text-emerald-600 focus:outline-none transition-colors p-0.5 rounded-full"
        aria-label="Information"
      >
        <IconComponent className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 w-64 p-3 rounded-xl bg-white border border-slate-300 shadow-xl text-xs text-slate-800 pointer-events-none transition-all duration-150 ${
            position === 'top'
              ? 'bottom-full mb-2 left-1/2 -translate-x-1/2'
              : position === 'bottom'
              ? 'top-full mt-2 left-1/2 -translate-x-1/2'
              : position === 'left'
              ? 'right-full mr-2 top-1/2 -translate-y-1/2'
              : 'left-full ml-2 top-1/2 -translate-y-1/2'
          }`}
        >
          {title && <div className="font-extrabold text-emerald-700 mb-1">{title}</div>}
          <p className="leading-relaxed text-[11px] text-slate-600 font-medium">{text}</p>
          <div className="absolute w-2 h-2 bg-white border-r border-b border-slate-300 rotate-45 left-1/2 -translate-x-1/2 -bottom-1" />
        </div>
      )}
    </span>
  );
};
