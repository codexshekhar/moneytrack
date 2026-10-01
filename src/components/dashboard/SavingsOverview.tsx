'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatINR, formatINRCompact, calculateProgress } from '@/lib/utils/money';
import { Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils/money';
import type { SavingsGoal } from '@/types';

interface SavingsOverviewProps {
  goals?: SavingsGoal[];
  className?: string;
}

export function SavingsOverview({ goals = [], className }: SavingsOverviewProps) {
  const activeGoals = goals.filter(g => g.savedAmount < g.targetAmount);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount);
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  if (goals.length === 0) {
    return (
      <Card className={cn('h-full', className)}>
        <CardHeader>
          <CardTitle className="text-lg">Savings Goals</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center">
          <Target className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-2 text-muted-foreground">No savings goals yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('h-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Savings Goals</CardTitle>
          <span className="text-sm font-medium text-primary">{goals.length} goal{goals.length !== 1 ? 's' : ''}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Overall Progress</span>
            <span className="font-semibold">{overallProgress}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${Math.min(overallProgress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {formatINR(totalSaved)} of {formatINR(totalTarget)} saved
          </p>
        </div>

        <div className="space-y-4">
          {activeGoals.slice(0, 3).map((goal) => (
            <div key={goal.id} className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium truncate max-w-[150px]">{goal.name}</span>
                </div>
                <span className="text-sm font-semibold text-primary">{calculateProgress(goal.savedAmount, goal.targetAmount)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${Math.min(calculateProgress(goal.savedAmount, goal.targetAmount), 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {formatINRCompact(goal.savedAmount)} / {formatINRCompact(goal.targetAmount)}
              </p>
            </div>
          ))}
          
          {activeGoals.length > 3 && (
            <p className="text-sm text-muted-foreground text-center">
              +{activeGoals.length - 3} more active goal{activeGoals.length - 3 !== 1 ? 's' : ''}
            </p>
          )}
          
          {completedGoals.length > 0 && (
            <div className="pt-3 border-t">
              <p className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {completedGoals.length} goal{completedGoals.length !== 1 ? 's' : ''} completed! 🎉
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}