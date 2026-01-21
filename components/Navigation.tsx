
import React from 'react';
import { ViewTab, ThemeMode } from '../types';

interface NavProps {
  currentView: ViewTab;
  theme: ThemeMode;
  colors: any;
  setView: (view: ViewTab) => void;
}

const Navigation: React.FC<NavProps> = ({ currentView, colors, setView, theme }) => {
  const isDark = theme === 'dark';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-4 pointer-events-none">
      <div className={`pointer-events-auto max-w-md mx-auto border p-3 rounded-[2rem] flex justify-around items-center shadow-2xl transition-all duration-500 ${colors.navBg} ${colors.card}`}>
        <NavItem 
          icon="grid_view" 
          label="Dash" 
          active={currentView === 'dash'} 
          onClick={() => setView('dash')}
          isDark={isDark}
          accentClass={colors.accentText}
        />
        <NavItem 
          icon="view_in_ar" 
          label="3D Model" 
          active={currentView === 'model'} 
          onClick={() => setView('model')}
          isDark={isDark}
          accentClass={colors.accentText}
        />
        <NavItem 
          icon="settings" 
          label="Setup" 
          active={currentView === 'setup'} 
          onClick={() => setView('setup')}
          isDark={isDark}
          accentClass={colors.accentText}
        />
      </div>
    </nav>
  );
};

interface NavItemProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
  isDark: boolean;
  accentClass: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, isDark, accentClass }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 px-5 py-1.5 rounded-2xl transition-all duration-300 active:scale-90 ${active ? 'scale-110' : 'opacity-40 grayscale'}`}
  >
    <div className="relative">
      <span className={`material-symbols-outlined text-2xl transition-colors duration-300 ${active ? accentClass : (isDark ? 'text-white' : 'text-slate-600')} ${active ? 'fill-1' : ''}`}>
        {icon}
      </span>
      {active && isDark && (
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
      )}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-tighter transition-colors duration-300 ${active ? accentClass : (isDark ? 'text-white' : 'text-slate-600')}`}>
      {label}
    </span>
  </button>
);

export default Navigation;
