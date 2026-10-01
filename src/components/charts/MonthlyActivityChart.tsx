'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { formatINRCompact } from '@/lib/utils/money';
import type { LentTransaction, BorrowedTransaction, Repayment, SavingsGoal } from '@/types';

interface MonthlyActivityChartProps {
  lentTransactions: LentTransaction[];
  borrowedTransactions: BorrowedTransaction[];
  repayments: Repayment[];
  savingsGoals: SavingsGoal[];
}

function getMonthlyData(
  transactions: Array<{ date: Date; amount: number }>,
  months: number
) {
  const result = [];
  for (let i = months - 1; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(new Date(), i));
    const monthEnd = endOfMonth(subMonths(new Date(), i));
    const total = transactions
      .filter((t) => t.date >= monthStart && t.date <= monthEnd)
      .reduce((sum, t) => sum + t.amount, 0);
    result.push({
      month: format(monthStart, 'MMM yyyy'),
      amount: total,
    });
  }
  return result;
}

export function MonthlyActivityChart({
  lentTransactions,
  borrowedTransactions,
  repayments,
  savingsGoals,
}: MonthlyActivityChartProps) {
  const months = 6;

  const lentData = getMonthlyData(
    lentTransactions.map((t) => ({ date: t.date, amount: t.amount })),
    months
  );
  const borrowedData = getMonthlyData(
    borrowedTransactions.map((t) => ({ date: t.date, amount: t.amount })),
    months
  );
  const repaymentData = getMonthlyData(
    repayments.map((r) => ({ date: r.date, amount: r.amount })),
    months
  );
  const savingsData = getMonthlyData(
    savingsGoals.flatMap((g) => {
      // We don't have individual savings entries, so we'll skip this for now
      return [];
    }),
    months
  );

  const chartData = lentData.map((item, index) => ({
    month: item.month,
    lent: item.amount,
    borrowed: borrowedData[index]?.amount || 0,
    repaid: repaymentData[index]?.amount || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Activity (Last 6 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickFormatter={(value) => value} />
              <YAxis tickFormatter={formatINRCompact} />
              <Tooltip
                // @ts-expect-error - recharts formatter type complexity
                formatter={(value: number, name: string) => [formatINRCompact(value), name] as [string, string]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="lent"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e', strokeWidth: 2 }}
                name="Money Lent"
              />
              <Line
                type="monotone"
                dataKey="borrowed"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2 }}
                name="Money Borrowed"
              />
              <Line
                type="monotone"
                dataKey="repaid"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                name="Repayments"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}