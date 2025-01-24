'use client';

import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function Statistics() {
  const { history, settings } = useStore();
  const t = useTranslation(settings.language);

  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const chartData = last7Days.map(date => ({
    date: date,
    sessions: history.find(h => h.date === date)?.completedSessions || 0
  }));

  return (
    <Card className="p-8 timer-card">
      <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        {t('statistics')}
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary)/0.1)" />
            <XAxis
              dataKey="date"
              type="category"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--primary)/0.5)"
              padding={{ left: 10, right: 10 }}
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
  );
}