
import React from 'react';
import { CalculationState, AreaResult } from '../types';

interface DashboardProps {
  state: CalculationState;
  results: AreaResult;
  setState: React.Dispatch<React.SetStateAction<CalculationState>>;
  colors: any;
}

const Dashboard: React.FC<DashboardProps> = ({ state, results, setState, colors }) => {
  const isDark = state.theme === 'dark';

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Capacity Input Card */}
      <section className={`relative border p-8 rounded-[2.5rem] text-center overflow-hidden transition-all duration-500 ${colors.card} shadow-xl shadow-blue-500/5`}>
        {isDark && <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full"></div>}
        {!isDark && <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100/40 rounded-full blur-3xl"></div>}
        
        <div className="relative z-10">
          <label className={`block text-[10px] font-black uppercase tracking-[0.2em] mb-4 transition-colors duration-300 ${colors.textSecondary}`}>
            수용 인원 (Capacity)
          </label>
          <div className="flex items-center justify-center gap-2 group">
            <input 
              type="number"
              value={state.capacity}
              onChange={(e) => setState(p => ({ ...p, capacity: parseInt(e.target.value) || 0 }))}
              className={`w-40 bg-transparent border-none text-center text-6xl font-black focus:ring-0 p-0 transition-colors duration-300 ${colors.textPrimary} placeholder-slate-200`}
              placeholder="0"
            />
            <span className={`text-xl font-bold transition-colors duration-300 ${colors.textSecondary} mt-6`}>명</span>
          </div>
          
          <div className="mt-8 flex justify-center gap-2">
            <button 
              onClick={() => setState(p => ({ ...p, ratio: 0.35 }))}
              className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-300 shadow-sm ${state.ratio === 0.35 ? (isDark ? 'bg-[#00D1FF] text-[#0A0C10]' : 'bg-blue-600 text-white') : (isDark ? 'bg-white/5 text-white/40' : 'bg-white text-slate-400')}`}
            >
              Standard 35%
            </button>
            <button 
              className={`px-5 py-2 rounded-full text-[11px] font-bold border transition-all duration-300 shadow-sm ${state.ratio !== 0.35 ? (isDark ? 'bg-[#00D1FF] text-[#0A0C10]' : 'bg-blue-600 text-white') : (isDark ? 'bg-white/5 text-white/40' : 'bg-white text-slate-400 border-white/40')}`}
            >
              Custom
            </button>
          </div>
        </div>
      </section>

      {/* Main Results Container */}
      <section className="space-y-4">
        <h2 className={`px-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${colors.textSecondary}`}>
          계산 결과 (Results)
        </h2>
        
        {/* Total Area Card */}
        <div className={`relative border p-6 rounded-[2rem] flex items-center justify-between group transition-all active:scale-[0.98] shadow-lg shadow-blue-500/5 ${colors.card}`}>
           {isDark && (
             <div className="absolute inset-0 rounded-[2rem] p-[1.5px] bg-gradient-to-br from-[#00D1FF] to-[#9D4EDD] opacity-20 -z-10"></div>
           )}
           <div className="flex items-center gap-5">
             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-6 ${isDark ? 'bg-gradient-to-br from-[#00D1FF] to-[#0081FF] shadow-cyan-500/20' : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20'}`}>
               <span className="material-symbols-outlined text-white text-2xl fill-1">architecture</span>
             </div>
             <div>
               <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 transition-colors duration-300 ${colors.textSecondary}`}>총면적 (GFA)</p>
               <h3 className={`text-3xl font-black tracking-tighter transition-colors duration-300 ${colors.textPrimary}`}>
                 {results.total.toLocaleString()}
                 <span className={`text-base font-medium ml-1 transition-colors duration-300 ${colors.textSecondary}`}>㎡</span>
               </h3>
             </div>
           </div>
           <span className={`material-symbols-outlined transition-colors duration-300 ${colors.textSecondary}`}>chevron_right</span>
        </div>

        {/* Split Cards: Net & Shared */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`border p-5 rounded-[2rem] flex flex-col gap-5 transition-all duration-500 shadow-md ${colors.card}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-cyan-500/10 text-[#00D1FF]' : 'bg-violet-100 text-violet-600'}`}>
              <span className="material-symbols-outlined text-xl">space_dashboard</span>
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 transition-colors duration-300 ${colors.textSecondary}`}>전용면적</p>
              <h4 className={`text-xl font-black tracking-tight transition-colors duration-300 ${colors.textPrimary}`}>
                {results.net.toLocaleString()}
                <span className="text-[10px] font-medium ml-0.5 text-slate-400">㎡</span>
              </h4>
              <div className="mt-2 h-1 w-full bg-slate-200/20 rounded-full overflow-hidden">
                <div className={`h-full ${isDark ? 'bg-[#00D1FF]' : 'bg-blue-500'}`} style={{ width: '66%' }}></div>
              </div>
            </div>
          </div>
          
          <div className={`border p-5 rounded-[2rem] flex flex-col gap-5 transition-all duration-500 shadow-md ${colors.card}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
              <span className="material-symbols-outlined text-xl">groups</span>
            </div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 transition-colors duration-300 ${colors.textSecondary}`}>공용면적</p>
              <h4 className={`text-xl font-black tracking-tight transition-colors duration-300 ${colors.textPrimary}`}>
                {results.shared.toLocaleString()}
                <span className="text-[10px] font-medium ml-0.5 text-slate-400">㎡</span>
              </h4>
               <div className="mt-2 h-1 w-full bg-slate-200/20 rounded-full overflow-hidden">
                <div className={`h-full ${isDark ? 'bg-emerald-500' : 'bg-emerald-500'}`} style={{ width: '34%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breakdown List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${colors.textSecondary}`}>상세 구분</h2>
          <button className={`text-[11px] font-bold transition-colors duration-300 ${colors.accentText}`}>전체보기</button>
        </div>
        <div className="space-y-3">
          <BreakdownItem 
            icon="bed" 
            label="생활공간 (Living)" 
            value={results.living} 
            colorClass={isDark ? "bg-cyan-500" : "bg-blue-500"} 
            colors={colors}
          />
          <BreakdownItem 
            icon="school" 
            label="교육지원 (Education)" 
            value={results.education} 
            colorClass={isDark ? "bg-purple-500" : "bg-violet-500"} 
            colors={colors}
          />
          <BreakdownItem 
            icon="park" 
            label="기타 공용 (Others)" 
            value={results.other} 
            colorClass={isDark ? "bg-slate-500" : "bg-slate-400"} 
            colors={colors}
          />
        </div>
      </section>

      <footer className="pt-8 pb-4 text-center">
        <p className={`text-[10px] leading-relaxed px-6 font-medium transition-colors duration-300 ${colors.textSecondary}`}>
          본 계산은 2026 표준 기획 가이드라인 및 면적 기준에 의거하여 산출되었으며, 
          실제 설계 시 대지 조건에 따라 ±3% 오차가 발생할 수 있습니다.
        </p>
        {isDark && (
           <p className="mt-6 text-[9px] text-white/10 font-bold uppercase tracking-[0.4em]">
              Dormitory Calculator © 2026 Premium Edition
           </p>
        )}
      </footer>
    </div>
  );
};

interface ItemProps {
  icon: string;
  label: string;
  value: number;
  colorClass: string;
  colors: any;
}

const BreakdownItem: React.FC<ItemProps> = ({ icon, label, value, colorClass, colors }) => (
  <div className={`border p-4 rounded-2xl flex items-center justify-between transition-all duration-500 shadow-sm ${colors.card} border-l-4 ${colorClass.replace('bg-', 'border-')}`}>
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-500 ${colors.theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
        <span className={`material-symbols-outlined text-sm transition-colors duration-300 ${colors.textSecondary}`}>{icon}</span>
      </div>
      <span className={`text-[13px] font-bold transition-colors duration-300 ${colors.textPrimary}`}>{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className={`text-sm font-black transition-colors duration-300 ${colors.textPrimary}`}>{value.toLocaleString()}</span>
      <span className={`text-[10px] font-bold transition-colors duration-300 ${colors.textSecondary}`}>㎡</span>
    </div>
  </div>
);

export default Dashboard;
