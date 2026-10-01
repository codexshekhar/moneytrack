'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatINR, formatINRCompact, calculateProgress } from '@/lib/utils/money';

interface SavingsChartProps {
  goals: Array<{
    id: string;
    name: string;
    targetAmount: number;
    savedAmount: number;
  }>;
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export function SavingsChart({ goals }: SavingsChartProps) {
  const data = goals.map((goal, index) => ({
    name: goal.name.length > 15 ? goal.name.slice(0, 15) + '...' : goal.name,
    saved: goal.savedAmount,
    target: goal.targetAmount,
    progress: calculateProgress(goal.savedAmount, goal.targetAmount),
    color: COLORS[index % COLORS.length],
  }));

  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold">{formatINR(totalSaved)}</p>
            <p className="text-sm text-muted-foreground">of {formatINR(totalTarget)} saved</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{calculateProgress(totalSaved, totalTarget)}%</p>
            <p className="text-sm text-muted-foreground">Overall Progress</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="saved"
                nameKey="name"
                label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                // @ts-expect-error - recharts formatter type complexity
                formatter={(value: number, name: string) => [formatINR(value), name] as [string, string]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((goal, index) => (
            <div key={goal.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded" style={{ backgroundColor: goal.color }} />
                <span>{goal.name}</span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span className="text-muted-foreground">{goal.progress}%</span>
                <span>{formatINRCompact(goal.saved)} / {formatINRCompact(goal.target)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}