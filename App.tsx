
import React, { useState, useMemo } from 'react';
import { ThemeMode, ViewTab, CalculationState, AreaResult } from './types';
import { 
  DEFAULT_UNIT_AREA, 
  NET_RATIO, 
  SHARED_RATIO, 
  BREAKDOWN_RATIOS,
  THEME_COLORS 
} from './constants';
import Dashboard from './components/Dashboard';
import MassingView from './components/MassingView';
import Navigation from './components/Navigation';
import SetupView from './components/SetupView';

const App: React.FC = () => {
  const [state, setState] = useState<CalculationState>({
    capacity: 850,
    ratio: 0.35,
    theme: 'light',
    view: 'dash',
    floors: 10,
    floorHeight: 3.2
  });

  const results = useMemo((): AreaResult => {
    const total = Math.round(state.capacity * DEFAULT_UNIT_AREA);
    const net = Math.round(total * NET_RATIO);
    const shared = Math.round(total * SHARED_RATIO);
    
    return {
      total,
      net,
      shared,
      living: Math.round(net * BREAKDOWN_RATIOS.living),
      education: Math.round(net * BREAKDOWN_RATIOS.education),
      other: Math.round(net * BREAKDOWN_RATIOS.other),
      perPerson: DEFAULT_UNIT_AREA
    };
  }, [state.capacity]);

  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const colors = THEME_COLORS[state.theme];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${colors.bg} ${state.theme === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 pt-10 pb-4 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col pointer-events-auto">
          <h1 className={`text-lg font-extrabold tracking-tight transition-colors duration-300 ${state.theme === 'light' ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600' : 'text-white'}`}>
            Dorm Master
          </h1>
          <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 ${colors.textSecondary}`}>
            v2.1 Massing Study
          </span>
        </div>
        <div className="flex gap-2 pointer-events-auto">
           <button 
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 border ${colors.card} shadow-sm active:scale-95`}
          >
            <span className={`material-symbols-outlined text-xl transition-colors duration-300 ${colors.textPrimary}`}>
              {state.theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="h-screen w-full relative">
        {state.view === 'dash' && (
          <div className="pt-24 px-6 pb-32 max-w-md mx-auto">
            <Dashboard 
              state={state} 
              results={results} 
              setState={setState} 
              colors={colors}
            />
          </div>
        )}
        {state.view === 'model' && (
          <MassingView 
            state={state}
            results={results}
            setState={setState}
            colors={colors}
          />
        )}
        {state.view === 'setup' && (
           <div className="pt-24 px-6 pb-32 max-w-md mx-auto">
            <SetupView 
              state={state}
              results={results}
              colors={colors}
            />
          </div>
        )}
      </main>

      {/* Navigation */}
      <Navigation 
        currentView={state.view} 
        theme={state.theme} 
        colors={colors} 
        setView={(v) => setState(prev => ({ ...prev, view: v }))} 
      />
    </div>
  );
};

export default App;
