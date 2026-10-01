'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardStatsSkeleton } from '@/components/ui/LoadingSkeleton';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { UpcomingDues } from '@/components/dashboard/UpcomingDues';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { SavingsOverview } from '@/components/dashboard/SavingsOverview';
import { lentMoneyService, borrowedMoneyService, repaymentService, savingsGoalService } from '@/lib/services/firestore';
import type { LentTransaction, BorrowedTransaction, Repayment, SavingsGoal, DashboardStats, UpcomingDue, Activity } from '@/types';
import { formatINR, isOverdue, daysUntilDue, calculateRemaining, calculateProgress } from '@/lib/utils/money';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [upcomingDues, setUpcomingDues] = useState<UpcomingDue[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [lent, borrowed, repayments, savings] = await Promise.all([
          lentMoneyService.getAll(user.uid),
          borrowedMoneyService.getAll(user.uid),
          repaymentService.getAll(user.uid),
          savingsGoalService.getAll(user.uid),
        ]);

        // Calculate stats
        const totalLent = lent.reduce((sum, t) => sum + t.amount, 0);
        const totalReceived = lent.reduce((sum, t) => sum + t.paidAmount, 0);
        const totalPendingLent = lent.reduce((sum, t) => sum + t.remainingAmount, 0);
        
        const totalBorrowed = borrowed.reduce((sum, t) => sum + t.amount, 0);
        const totalRepaid = borrowed.reduce((sum, t) => sum + t.repaidAmount, 0);
        const totalPendingBorrowed = borrowed.reduce((sum, t) => sum + t.remainingAmount, 0);
        
        const totalSaved = savings.reduce((sum, g) => sum + g.savedAmount, 0);

        setStats({
          totalLent,
          totalReceived,
          totalPendingLent,
          totalBorrowed,
          totalRepaid,
          totalPendingBorrowed,
          netPosition: totalPendingLent - totalPendingBorrowed,
          totalSaved,
        });

        // Recent activity
        const activities: Activity[] = [];
        
        lent.slice(0, 5).forEach(t => {
          activities.push({ id: t.id, userId: user.uid, type: 'lent', personName: t.personName, amount: t.amount, date: t.date, description: t.description });
        });
        borrowed.slice(0, 5).forEach(t => {
          activities.push({ id: t.id, userId: user.uid, type: 'borrowed', personName: t.personName, amount: t.amount, date: t.date, description: t.description });
        });
        savings.slice(0, 5).forEach(g => {
          activities.push({ id: g.id, userId: user.uid, type: 'savings', goalName: g.name, amount: g.savedAmount, date: g.createdAt });
        });
        
        activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setRecentActivity(activities.slice(0, 10));

        // Upcoming dues
        const dues: UpcomingDue[] = [];
        lent.forEach(t => {
          if (t.remainingAmount > 0 && t.dueDate) {
            const days = daysUntilDue(t.dueDate);
            if (days !== null && days <= 30) {
              dues.push({ id: t.id, type: 'lent', personName: t.personName, amount: t.remainingAmount, dueDate: t.dueDate, daysUntilDue: days });
            }
          }
        });
        borrowed.forEach(t => {
          if (t.remainingAmount > 0 && t.dueDate) {
            const days = daysUntilDue(t.dueDate);
            if (days !== null && days <= 30) {
              dues.push({ id: t.id, type: 'borrowed', personName: t.personName, amount: t.remainingAmount, dueDate: t.dueDate, daysUntilDue: days });
            }
          }
        });
        dues.sort((a, b) => a.daysUntilDue - b.daysUntilDue);
        setUpcomingDues(dues.slice(0, 5));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (authLoading || loading) {
    return <DashboardStatsSkeleton />;
  }

  if (!user) return null;

  const firstName = user.displayName?.split(' ')[0] || 'there';
  const timeOfDay = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{timeOfDay}, {firstName} 👋</h1>
        <p className="text-muted-foreground">Here's your money overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Money Lent"
          value={formatINR(stats?.totalPendingLent ?? 0)}
          subtitle={stats && stats.totalLent > 0 ? 'Total: ' + formatINR(stats.totalLent) : ''}
          icon="users"
          color="green"
        />
        <StatCard
          title="Money Borrowed"
          value={formatINR(stats?.totalPendingBorrowed || 0)}
          subtitle={`Total: ${formatINR(stats?.totalBorrowed || 0)}`}
          icon="arrow-up-down"
          color="red"
        />
        <StatCard
          title="Net Position"
          value={formatINR(stats?.netPosition || 0)}
          subtitle={stats && stats.netPosition >= 0 ? 'You are owed more' : 'You owe more'}
          icon="wallet"
          color={stats && stats.netPosition >= 0 ? 'green' : 'red'}
        />
        <StatCard
          title="Total Saved"
          value={formatINR(stats?.totalSaved || 0)}
          subtitle="Across all goals"
          icon="target"
          color="blue"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <QuickActions className="lg:col-span-2" />
        <UpcomingDues dues={upcomingDues} className="lg:col-span-2" />
        <SavingsOverview className="lg:col-span-3" />
      </div>

      <RecentActivity activities={recentActivity} />
    </div>
  );
}