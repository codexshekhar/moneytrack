'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LentBorrowedChart } from '@/components/charts/LentBorrowedChart';
import { SavingsChart } from '@/components/charts/SavingsChart';
import { MonthlyActivityChart } from '@/components/charts/MonthlyActivityChart';
import { OutstandingChart } from '@/components/charts/OutstandingChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { lentMoneyService, borrowedMoneyService, repaymentService, savingsGoalService } from '@/lib/services/firestore';
import { toast } from 'sonner';
import type { LentTransaction, BorrowedTransaction, Repayment, SavingsGoal } from '@/types';
import { formatINR } from '@/lib/utils/money';

export default function AnalyticsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [lentTransactions, setLentTransactions] = useState<LentTransaction[]>([]);
  const [borrowedTransactions, setBorrowedTransactions] = useState<BorrowedTransaction[]>([]);
  const [repayments, setRepayments] = useState<Repayment[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [lent, borrowed, allRepayments, savings] = await Promise.all([
        lentMoneyService.getAll(user.uid),
        borrowedMoneyService.getAll(user.uid),
        repaymentService.getAll(user.uid),
        savingsGoalService.getAll(user.uid),
      ]);

      setLentTransactions(lent);
      setBorrowedTransactions(borrowed);
      setRepayments(allRepayments);
      setSavingsGoals(savings);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const totalLent = lentTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalReceived = lentTransactions.reduce((sum, t) => sum + t.paidAmount, 0);
  const totalPendingLent = lentTransactions.reduce((sum, t) => sum + t.remainingAmount, 0);

  const totalBorrowed = borrowedTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalRepaid = borrowedTransactions.reduce((sum, t) => sum + t.repaidAmount, 0);
  const totalPendingBorrowed = borrowedTransactions.reduce((sum, t) => sum + t.remainingAmount, 0);

  const totalSaved = savingsGoals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 animate-pulse">
          <div>
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-4 w-64 mt-2 bg-muted rounded" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg border" />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <div className="h-96 bg-muted rounded-lg border" />
            <div className="h-96 bg-muted rounded-lg border" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-96 bg-muted rounded-lg border" />
            <div className="h-96 bg-muted rounded-lg border" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Visualize your financial data.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Total Lent</p>
              <p className="text-3xl font-bold mt-1">{formatINR(totalLent)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Total Borrowed</p>
              <p className="text-3xl font-bold mt-1">{formatINR(totalBorrowed)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Net Position</p>
              <p className="text-3xl font-bold mt-1">{formatINR(totalPendingLent - totalPendingBorrowed)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Total Saved</p>
              <p className="text-3xl font-bold mt-1">{formatINR(totalSaved)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <LentBorrowedChart totalLent={totalLent} totalBorrowed={totalBorrowed} />
          <SavingsChart goals={savingsGoals} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <MonthlyActivityChart
            lentTransactions={lentTransactions}
            borrowedTransactions={borrowedTransactions}
            repayments={repayments}
            savingsGoals={savingsGoals}
          />
          <OutstandingChart
            totalPendingLent={totalPendingLent}
            totalPendingBorrowed={totalPendingBorrowed}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lent Money</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Lent</span>
                <span className="font-semibold">{formatINR(totalLent)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Received</span>
                <span className="font-semibold text-green-600">{formatINR(totalReceived)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-semibold text-destructive">{formatINR(totalPendingLent)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Active</span>
                <span className="font-semibold">{lentTransactions.filter(t => t.remainingAmount > 0).length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Borrowed Money</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Borrowed</span>
                <span className="font-semibold">{formatINR(totalBorrowed)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Repaid</span>
                <span className="font-semibold text-green-600">{formatINR(totalRepaid)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-semibold text-destructive">{formatINR(totalPendingBorrowed)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Active</span>
                <span className="font-semibold">{borrowedTransactions.filter(t => t.remainingAmount > 0).length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Repayments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Received</span>
                <span className="font-semibold text-green-600">
                  {formatINR(repayments.filter(r => r.transactionType === 'lent').reduce((sum, r) => sum + r.amount, 0))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-semibold text-red-600">
                  {formatINR(repayments.filter(r => r.transactionType === 'borrowed').reduce((sum, r) => sum + r.amount, 0))}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Total Transactions</span>
                <span className="font-semibold">{repayments.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Savings Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Target</span>
                <span className="font-semibold">{formatINR(totalTarget)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Saved</span>
                <span className="font-semibold text-green-600">{formatINR(totalSaved)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0}%</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Goals</span>
                <span className="font-semibold">{savingsGoals.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}