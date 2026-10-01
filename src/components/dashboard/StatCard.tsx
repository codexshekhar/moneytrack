'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { formatINRCompact } from '@/lib/utils/money';
import { Users, ArrowUpDown, Wallet, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils/money';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: 'users' | 'arrow-up-down' | 'wallet' | 'target';
  color: 'green' | 'red' | 'blue' | 'purple';
}

const icons = {
  users: Users,
  'arrow-up-down': ArrowUpDown,
  wallet: Wallet,
  target: Target,
};

const colors = {
  green: 'bg-green-500/10 text-green-600 dark:text-green-400',
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
};

export function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  const Icon = icons[icon];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className={cn('p-3 rounded-xl', colors[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}