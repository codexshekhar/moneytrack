'use client';

import { Skeleton } from '@/components/ui/Skeleton';

export function StatCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-8 w-1/2 mb-4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr>
      <td className="p-4"><Skeleton className="h-4 w-3/4" /></td>
      <td className="p-4"><Skeleton className="h-4 w-1/2" /></td>
      <td className="p-4"><Skeleton className="h-4 w-1/2" /></td>
      <td className="p-4"><Skeleton className="h-4 w-1/2" /></td>
      <td className="p-4"><Skeleton className="h-4 w-1/2" /></td>
      <td className="p-4"><Skeleton className="h-4 w-1/4" /></td>
      <td className="p-4"><Skeleton className="h-8 w-8" /></td>
    </tr>
  );
}

export function TableSkeleton(rows = 5) {
  return (
    <div className="rounded-lg border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left"><Skeleton className="h-4 w-3/4" /></th>
            <th className="p-4 text-left"><Skeleton className="h-4 w-1/2" /></th>
            <th className="p-4 text-left"><Skeleton className="h-4 w-1/2" /></th>
            <th className="p-4 text-left"><Skeleton className="h-4 w-1/2" /></th>
            <th className="p-4 text-left"><Skeleton className="h-4 w-1/2" /></th>
            <th className="p-4 text-left"><Skeleton className="h-4 w-1/4" /></th>
            <th className="p-4 text-left"><Skeleton className="h-8 w-8" /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GoalCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="h-2 w-full rounded-full bg-muted mb-4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <Skeleton className="h-6 w-1/4 mb-6" />
      <div className="h-64 w-full bg-muted rounded" />
    </div>
  );
}

export function DashboardStatsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg border" />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="h-48 rounded-lg border lg:col-span-2" />
        <Skeleton className="h-48 rounded-lg border lg:col-span-2" />
        <Skeleton className="h-48 rounded-lg border lg:col-span-3" />
      </div>

      <Skeleton className="h-64 rounded-lg border lg:col-span-7" />
    </div>
  );
}