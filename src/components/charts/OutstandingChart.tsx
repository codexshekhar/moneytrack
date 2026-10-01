'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatINRCompact } from '@/lib/utils/money';

interface OutstandingChartProps {
  totalPendingLent: number;
  totalPendingBorrowed: number;
}

export function OutstandingChart({ totalPendingLent, totalPendingBorrowed }: OutstandingChartProps) {
  const data = [
    { name: 'Owed to You', amount: totalPendingLent, color: '#22c55e' },
    { name: 'You Owe', amount: totalPendingBorrowed, color: '#ef4444' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Outstanding Money</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis type="number" tickFormatter={formatINRCompact} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip
                // @ts-expect-error - recharts formatter type complexity
                formatter={(value: number) => [formatINRCompact(value), ''] as [string, string]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
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
            <span>People owe you: {formatINRCompact(totalPendingLent)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-red-500" />
            <span>You owe others: {formatINRCompact(totalPendingBorrowed)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}