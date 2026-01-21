
import React from 'react';
import { CalculationState, AreaResult } from '../types';

interface SetupViewProps {
  state: CalculationState;
  results: AreaResult;
  colors: any;
}

const SetupView: React.FC<SetupViewProps> = ({ state, results, colors }) => {
  const isDark = state.theme === 'dark';

  const handleExportJSON = () => {
    const data = {
      project: "Dorm Area Master Plan",
      timestamp: new Date().toISOString(),
      config: {
        capacity: state.capacity,
        ratio: state.ratio,
        perPerson: results.perPerson
      },
      results: results
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dorm-plan-${state.capacity}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <header className="px-2">
        <h2 className={`text-2xl font-black transition-colors duration-300 ${colors.textPrimary}`}>Settings & Export</h2>
        <p className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${colors.textSecondary}`}>Project Configuration</p>
      </header>

      {/* GitHub Export Card */}
      <section className={`relative border p-6 rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-xl ${colors.card}`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}>
               <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </div>
            <div>
              <h3 className={`font-black text-lg ${colors.textPrimary}`}>GitHub Sync</h3>
              <p className={`text-[10px] font-bold ${colors.textSecondary}`}>Version Control Your Planning</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-black rounded-full uppercase tracking-widest">Ready</span>
        </div>

        <p className={`text-xs leading-relaxed mb-6 ${colors.textSecondary}`}>
          현재 설계 데이터를 GitHub 리포지토리에 커밋하거나 로컬 JSON 파일로 내보낼 수 있습니다. 팀원들과 변경 사항을 공유하세요.
        </p>

        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={handleExportJSON}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm transition-all active:scale-95 ${isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}
          >
            <span className="material-symbols-outlined text-xl">download</span>
            Export to .json
          </button>
          <button 
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm border transition-all active:scale-95 ${colors.card} ${colors.textPrimary}`}
          >
            <span className="material-symbols-outlined text-xl">upload_file</span>
            Push to GitHub
          </button>
        </div>
      </section>

      {/* Advanced Parameters */}
      <section className="space-y-4">
        <h3 className={`px-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${colors.textSecondary}`}>변수 설정 (Parameters)</h3>
        
        <div className={`border p-6 rounded-[2rem] space-y-6 ${colors.card}`}>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-xs font-bold ${colors.textPrimary}`}>1인당 표준 면적</span>
              <span className={`text-xs font-black ${colors.accentText}`}>25.2 ㎡</span>
            </div>
            <input type="range" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-xs font-bold ${colors.textPrimary}`}>전용율 (Net Ratio)</span>
              <span className={`text-xs font-black ${colors.accentText}`}>66%</span>
            </div>
            <input type="range" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-2 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
        <span className="material-symbols-outlined text-amber-500">warning</span>
        <p className="text-[10px] font-bold text-amber-600 leading-tight">
          주의: 설정값을 변경하면 현재 계산된 결과가 모두 초기화됩니다. 변경 전 데이터를 반드시 내보내기 하세요.
        </p>
      </div>
    </div>
  );
};

export default SetupView;
