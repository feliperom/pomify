import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
  notifications: boolean;
  sound: boolean;
  language: 'en' | 'pt';
}

interface TimerState {
  isRunning: boolean;
  mode: 'work' | 'short-break' | 'long-break';
  timeLeft: number;
  completedSessions: number;
  settings: Settings;
  history: Array<{
    date: string;
    completedSessions: number;
  }>;
  setIsRunning: (isRunning: boolean) => void;
  setMode: (mode: 'work' | 'short-break' | 'long-break') => void;
  setTimeLeft: (timeLeft: number) => void;
  completeSession: () => void;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useStore = create<TimerState>()(
  persist(
    (set) => ({
      isRunning: false,
      mode: 'work',
      timeLeft: 25 * 60,
      completedSessions: 0,
      settings: {
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        sessionsBeforeLongBreak: 4,
        notifications: true,
        sound: true,
        language: 'en',
      },
      history: [],
      setIsRunning: (isRunning) => set({ isRunning }),
      setMode: (mode) => set({ mode }),
      setTimeLeft: (timeLeft) => set({ timeLeft }),
      completeSession: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const todayHistory = state.history.find((h) => h.date === today);

          const newHistory = todayHistory
            ? state.history.map((h) =>
                h.date === today
                  ? { ...h, completedSessions: h.completedSessions + 1 }
                  : h
              )
            : [...state.history, { date: today, completedSessions: 1 }];

          return {
            completedSessions: state.completedSessions + 1,
            history: newHistory,
          };
        }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'pomodoro-storage',
    }
  )
);