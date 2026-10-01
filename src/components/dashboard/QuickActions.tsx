'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Plus, Users, ArrowUpDown, Target } from 'lucide-react';
import { cn } from '@/lib/utils/money';

interface QuickActionsProps {
  onAddLent?: () => void;
  onAddBorrowed?: () => void;
  onAddSavings?: () => void;
  className?: string;
}

export function QuickActions({ onAddLent, onAddBorrowed, onAddSavings, className }: QuickActionsProps) {
  const actions = [
    { label: 'Add Lent Money', icon: Users, onClick: onAddLent, color: 'bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-400' },
    { label: 'Add Borrowed Money', icon: ArrowUpDown, onClick: onAddBorrowed, color: 'bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400' },
    { label: 'Create Savings Goal', icon: Target, onClick: onAddSavings, color: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-400' },
  ];

  return (
    <Card className={cn('h-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant="outline"
                className={cn('h-auto py-4 flex-col items-start gap-2 text-left', action.color)}
                onClick={action.onClick}
              >
                <div className="p-2 rounded-lg bg-background">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}