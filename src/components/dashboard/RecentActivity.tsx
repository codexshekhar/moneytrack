'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatINR, formatDate } from '@/lib/utils/money';
import { ArrowUp, ArrowDown, Plus, RotateCcw, Target } from 'lucide-react';
import { cn } from '@/lib/utils/money';

interface Activity {
  type: 'lent' | 'borrowed' | 'repayment' | 'savings';
  personName?: string;
  goalName?: string;
  amount: number;
  date: Date;
  description?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const typeConfig = {
  lent: { icon: ArrowUp, color: 'text-green-600 bg-green-500/10', label: 'Lent' },
  borrowed: { icon: ArrowDown, color: 'text-red-600 bg-red-500/10', label: 'Borrowed' },
  repayment: { icon: RotateCcw, color: 'text-blue-600 bg-blue-500/10', label: 'Repayment' },
  savings: { icon: Target, color: 'text-purple-600 bg-purple-500/10', label: 'Savings' },
};

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          No recent activity
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-7">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.slice(0, 10).map((activity, index) => {
            const config = typeConfig[activity.type];
            const Icon = config.icon;
            const name = activity.personName || activity.goalName || 'Unknown';
            
            return (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={cn('p-2 rounded-lg', config.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{name}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(activity.date, 'short')}</p>
                </div>
                <div className="text-right">
                  <p className={cn('font-semibold', activity.type === 'lent' ? 'text-green-600' : activity.type === 'borrowed' ? 'text-red-600' : activity.type === 'savings' ? 'text-purple-600' : 'text-blue-600')}>
                    {activity.type === 'lent' || activity.type === 'savings' ? '+' : '-'}{formatINR(activity.amount)}
                  </p>
                  <span className="text-xs text-muted-foreground capitalize">{config.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}