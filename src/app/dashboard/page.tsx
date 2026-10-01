'use client';

import { useAuth } from '@/contexts/AuthContext';
import { DashboardStatsSkeleton } from '@/components/ui/LoadingSkeleton';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { UpcomingDues } from '@/components/dashboard/UpcomingDues';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { SavingsOverview } from '@/components/dashboard/SavingsOverview';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatINR } from '@/lib/utils/money';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading, error, refetch } = useDashboardData();

  const firstName = user?.displayName?.split(' ')[0] || 'there';
  const timeOfDay = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  if (authLoading || isLoading) {
    return <DashboardStatsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-destructive mb-4">Failed to load dashboard</p>
        <button 
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user || !data) return null;

  const { stats, activities, dues, savings } = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{timeOfDay}, {firstName} 👋</h1>
        <p className="text-muted-foreground">Here&apos;s your money overview.</p>
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
        <UpcomingDues dues={dues} className="lg:col-span-2" />
        <SavingsOverview goals={savings} className="lg:col-span-3" />
      </div>

      <RecentActivity activities={activities} />
    </div>
  );
}