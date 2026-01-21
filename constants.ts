
export const DEFAULT_UNIT_AREA = 25.2; // sqm per person
export const NET_RATIO = 0.66;
export const SHARED_RATIO = 0.34;
export const BREAKDOWN_RATIOS = {
  living: 0.81,    // 81% of net
  education: 0.12, // 12% of net
  other: 0.07      // 7% of net
};

export const THEME_COLORS = {
  light: {
    bg: 'bg-[#EEF2FF]',
    card: 'bg-white/60 backdrop-blur-xl border-white/40',
    textPrimary: 'text-slate-800',
    textSecondary: 'text-slate-400',
    accent: 'bg-blue-600',
    accentText: 'text-blue-600',
    navBg: 'bg-white/70 backdrop-blur-2xl'
  },
  dark: {
    bg: 'bg-[#0A0C10]',
    card: 'bg-[#161B22]/70 backdrop-blur-xl border-white/5',
    textPrimary: 'text-white',
    textSecondary: 'text-white/40',
    accent: 'bg-[#00D1FF]',
    accentText: 'text-[#00D1FF]',
    navBg: 'bg-[#161B22]/80 backdrop-blur-2xl'
  }
};
