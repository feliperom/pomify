export const translations = {
  en: {
    work: 'Work',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    settings: 'Settings',
    statistics: 'Statistics',
    daily: 'Daily Progress',
    weekly: 'Weekly Summary',
    workDuration: 'Work Duration',
    shortBreakDuration: 'Short Break Duration',
    longBreakDuration: 'Long Break Duration',
    sessionsBeforeLongBreak: 'Sessions Before Long Break',
    notifications: 'Notifications',
    sound: 'Sound',
    language: 'Language',
    save: 'Save',
    cancel: 'Cancel',
    completedSessions: 'Completed Sessions',
    today: 'Today',
    thisWeek: 'This Week',
  },
  pt: {
    work: 'Trabalho',
    shortBreak: 'Pausa Curta',
    longBreak: 'Pausa Longa',
    start: 'Iniciar',
    pause: 'Pausar',
    reset: 'Reiniciar',
    settings: 'Configurações',
    statistics: 'Estatísticas',
    daily: 'Progresso Diário',
    weekly: 'Resumo Semanal',
    workDuration: 'Duração do Trabalho',
    shortBreakDuration: 'Duração da Pausa Curta',
    longBreakDuration: 'Duração da Pausa Longa',
    sessionsBeforeLongBreak: 'Sessões Antes da Pausa Longa',
    notifications: 'Notificações',
    sound: 'Som',
    language: 'Idioma',
    save: 'Salvar',
    cancel: 'Cancelar',
    completedSessions: 'Sessões Concluídas',
    today: 'Hoje',
    thisWeek: 'Esta Semana',
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export const useTranslation = (language: Language) => {
  return (key: TranslationKey) => translations[language][key];
};