'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatINRCompact } from '@/lib/utils/money';

interface LentBorrowedChartProps {
  totalLent: number;
  totalBorrowed: number;
}

export function LentBorrowedChart({ totalLent, totalBorrowed }: LentBorrowedChartProps) {
  const data = [
    { name: 'Lent', amount: totalLent, color: '#22c55e' },
    { name: 'Borrowed', amount: totalBorrowed, color: '#ef4444' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lent vs Borrowed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis type="number" tickFormatter={formatINRCompact} />
              <YAxis type="category" dataKey="name" width={60} />
              <Tooltip
                // @ts-expect-error - recharts formatter type complexity
                formatter={(value: number) => [formatINRCompact(value), ''] as [string, string]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Bar key={entry.name} fill={entry.color} dataKey="amount" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-green-500" />
            <span>Lent: {formatINRCompact(totalLent)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-red-500" />
            <span>Borrowed: {formatINRCompact(totalBorrowed)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}