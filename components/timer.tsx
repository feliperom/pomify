'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n';
import { Play, Pause, RotateCcw } from 'lucide-react';

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
};

export function Timer() {
  const {
    isRunning,
    mode,
    timeLeft,
    settings,
    setIsRunning,
    setTimeLeft,
    setMode,
    completeSession,
  } = useStore();
  const t = useTranslation(settings.language);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/notification.mp3');
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (settings.sound && audioRef.current) {
        audioRef.current.play();
      }

      if (settings.notifications) {
        new Notification('Pomify', {
          body: `${mode === 'work' ? 'Work session' : 'Break'} completed!`,
        });
      }

      if (mode === 'work') {
        completeSession();
        const completedSessions = useStore.getState().completedSessions;
        if (
          completedSessions > 0 &&
          completedSessions % settings.sessionsBeforeLongBreak === 0
        ) {
          setMode('long-break');
          setTimeLeft(settings.longBreakDuration * 60);
        } else {
          setMode('short-break');
          setTimeLeft(settings.shortBreakDuration * 60);
        }
      } else {
        setMode('work');
        setTimeLeft(settings.workDuration * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(settings.workDuration * 60);
    setMode('work');
  };

  return (
    <Card className="timer-card w-full max-w-md p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t(mode === 'work' ? 'work' : mode === 'short-break' ? 'shortBreak' : 'longBreak')}
        </h2>
        <div className="text-7xl font-mono mb-12 text-center tracking-wider">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            size="lg"
            className="w-32 bg-primary hover:bg-primary/90"
          >
            {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isRunning ? t('pause') : t('start')}
          </Button>
          <Button 
            onClick={handleReset} 
            size="lg" 
            variant="outline"
            className="w-32 border-primary/20 hover:bg-primary/10"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            {t('reset')}
          </Button>
        </div>
      </div>
    </Card>
  );
}