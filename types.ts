
export type ThemeMode = 'light' | 'dark';
export type ViewTab = 'dash' | 'logs' | 'model' | 'setup';

export interface AreaResult {
  total: number;
  net: number;
  shared: number;
  living: number;
  education: number;
  other: number;
  perPerson: number;
}

export interface CalculationState {
  capacity: number;
  ratio: number; // e.g., 0.35 for 35%
  theme: ThemeMode;
  view: ViewTab;
  floors: number; // New: Number of floors for massing
  floorHeight: number; // New: Height per floor in meters
}
