'use client';

import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { ArrowLeft, Coffee } from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export default function StatisticsPage() {
  const { history, settings } = useStore();
  const t = useTranslation(settings.language);

  const last30Days = [...Array(30)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const chartData = last30Days.map(date => ({
    date: date,
    sessions: history.find(h => h.date === date)?.completedSessions || 0
  }));

  const weeklyData = last30Days.reduce((acc, date) => {
    const week = `Week ${Math.ceil(new Date(date).getDate() / 7)}`;
    const sessions = history.find(h => h.date === date)?.completedSessions || 0;
    
    if (!acc[week]) {
      acc[week] = { week, sessions };
    } else {
      acc[week].sessions += sessions;
    }
    
    return acc;
  }, {} as Record<string, { week: string; sessions: number }>);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t('statistics')}
            </h1>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-8 timer-card">
            <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t('daily')}
            </h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 25, left: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary)/0.1)" />
                  <XAxis
                    dataKey="date"
                    type="category"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    tick={{ fontSize: 12 }}
                    stroke="hsl(var(--primary)/0.5)"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                    width={30}
                    stroke="hsl(var(--primary)/0.5)"
                  />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [value, t('completedSessions')]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--primary)/0.2)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-8 timer-card">
            <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t('weekly')}
            </h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Object.values(weeklyData)} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary)/0.1)" />
                  <XAxis
                    dataKey="week"
                    stroke="hsl(var(--primary)/0.5)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                    width={30}
                    stroke="hsl(var(--primary)/0.5)"
                  />
                  <Tooltip
                    formatter={(value) => [value, t('completedSessions')]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--primary)/0.2)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="sessions"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <footer className="mt-12 text-center">
          <Link
            href="https://www.buymeacoffee.com/feliperom"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            <Coffee className="h-3 w-3" />
            <span className='text-[12px]'>Buy me a coffee</span>
          </Link>
          <p className="mt-2 text-[12px] text-muted-foreground">
            Created with ❤️ by <Link href="https://feliperom.github.io">Feliperom</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}