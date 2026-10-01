'use client';

import React from 'react';
import { Users, ArrowUpRight, Clock, CheckCircle, AlertCircle, Minus, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/money';

const lentItems = [
  { name: 'Rahul', amount: '₹5,000', remaining: '₹2,000 remaining', due: 'Due Oct 15', status: 'partial', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { name: 'Amit', amount: '₹3,500', remaining: '₹3,500 remaining', due: 'Due Oct 20', status: 'pending', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
  { name: 'Priya', amount: '₹2,000', remaining: 'Paid', due: 'Completed', status: 'paid', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
];

export function LentMoneySection() {
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8 bg-muted/30" id="lent">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="sticky top-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              <span>Money Lent</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
              Never lose track of money you&apos;ve lent.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              MoneyTrack gives you a clear record of who owes you, how much they owe, how much they\'ve repaid, what\'s still pending, and when it\'s due.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-card border border-border/50 rounded-xl">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Track every loan with due dates</p>
                  <p className="text-sm text-muted-foreground">Never forget who owes you and when</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card border border-border/50 rounded-xl">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Record partial repayments</p>
                  <p className="text-sm text-muted-foreground">See exactly how much is still pending</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card border border-border/50 rounded-xl">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Overdue alerts & reminders</p>
                  <p className="text-sm text-muted-foreground">Know immediately when payments are late</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Money Lent</p>
                    <CardTitle className="text-3xl font-bold">₹12,500</CardTitle>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10 text-green-600">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">3 active loans</p>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                {lentItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.due}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{item.amount}</p>
                      <p className={cn('text-sm', item.color)}>{item.remaining}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}