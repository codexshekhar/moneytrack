'use client';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatINR, formatDate, calculateProgress } from '@/lib/utils/money';
import { Target, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils/money';

interface GoalCardProps {
  goal: {
    id: string;
    name: string;
    targetAmount: number;
    savedAmount: number;
    targetDate?: Date;
    description?: string;
  };
  onAddMoney: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

export function GoalCard({ goal, onAddMoney, onEdit, onDelete, onView }: GoalCardProps) {
  const progress = calculateProgress(goal.savedAmount, goal.targetAmount);
  const remaining = goal.targetAmount - goal.savedAmount;
  const isCompleted = progress >= 100;

  return (
    <div className="relative rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
      {isCompleted && (
        <div className="absolute -top-3 -right-3 flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
          <span className="relative top-[1px]">✓</span>
          Completed
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg truncate">{goal.name}</h3>
          </div>
          {goal.description && (
            <p className="mt-1 text-sm text-muted-foreground truncate">{goal.description}</p>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onView} className="shrink-0">
          <span className="sr-only">View details</span>
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Saved</span>
          <span className="font-semibold">{formatINR(goal.savedAmount)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Target</span>
          <span className="font-semibold">{formatINR(goal.targetAmount)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Remaining</span>
          <span className="font-semibold text-destructive">{formatINR(remaining)}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground">{progress}% complete</span>
          <span className="font-medium">{formatINR(goal.savedAmount)} / {formatINR(goal.targetAmount)}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              isCompleted ? 'bg-green-500' : 'bg-primary'
            )}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {goal.targetDate && (
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Target: {formatDate(goal.targetDate)}</span>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <Button className="flex-1" onClick={onAddMoney} disabled={isCompleted}>
          {isCompleted ? 'Goal Completed' : 'Add Money'}
        </Button>
        <Button variant="outline" onClick={onEdit} disabled={isCompleted}>
          Edit
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete} className="text-destructive hover:text-destructive hover:bg-destructive/10">
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
}