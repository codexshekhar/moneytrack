'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Target, BarChart3, Users, Wallet, PiggyBank, ChartNoAxesCombined } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils/money';

const features = [
  {
    number: '01',
    title: 'Track Money Lent',
    description: 'Remember every rupee you\'ve lent, who owes you, and when it\'s due.',
    icon: ArrowUpRight,
    iconBg: 'bg-green-500',
    iconColor: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    number: '02',
    title: 'Track Money Borrowed',
    description: 'Keep a clear record of what you owe and when you need to repay it.',
    icon: ArrowDownLeft,
    iconBg: 'bg-red-500',
    iconColor: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    number: '03',
    title: 'Reach Savings Goals',
    description: 'Turn your plans into measurable targets and watch your progress grow.',
    icon: Target,
    iconBg: 'bg-purple-500',
    iconColor: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    number: '04',
    title: 'See the Bigger Picture',
    description: 'Understand your outstanding money, savings progress, and activity at a glance.',
    icon: BarChart3,
    iconBg: 'bg-blue-500',
    iconColor: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
            Everything you need to stay on top of your money.
          </h2>
          <p className="text-lg text-muted-foreground">
            Four powerful features that work together to give you complete control.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={cn(
                'group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50',
                feature.bg
              )}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-bold text-primary/70 tracking-wider uppercase">
                    {feature.number}
                  </span>
                  <div className={cn(
                    'p-3 rounded-xl group-hover:scale-110 transition-transform duration-300',
                    feature.iconBg
                  )}>
                    <feature.icon className={cn('h-6 w-6 text-white', feature.iconColor)} />
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}