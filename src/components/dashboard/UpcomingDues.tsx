'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatINR, formatDate, daysUntilDue } from '@/lib/utils/money';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/money';
import type { UpcomingDue } from '@/types';

interface UpcomingDuesProps {
  dues: UpcomingDue[];
  className?: string;
}

export function UpcomingDues({ dues, className }: UpcomingDuesProps) {
  if (dues.length === 0) {
    return (
      <Card className={cn('h-full', className)}>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Payments</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          No upcoming payments
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('h-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dues.map((due) => {
            const days = due.daysUntilDue;
            const isUrgent = days <= 3;
            const isOverdue = days < 0;
            
            return (
              <div key={due.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-lg', due.type === 'lent' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600')}>
                    {due.type === 'lent' ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <Calendar className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{due.personName}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {due.type === 'lent' ? 'They owe you' : 'You owe them'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn('font-semibold', isOverdue ? 'text-destructive' : 'text-foreground')}>
                    {formatINR(due.amount)}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-xs">
                    {isOverdue && (
                      <span className="flex items-center gap-1 text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        Overdue
                      </span>
                    )}
                    {!isOverdue && (
                      <span className={cn('flex items-center gap-1', isUrgent ? 'text-destructive' : 'text-muted-foreground')}>
                        <Calendar className="h-3 w-3" />
                        {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}