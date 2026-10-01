'use client';

import React from 'react';
import { Wallet, ArrowDownLeft, Clock, AlertCircle, ArrowUpRight, CheckCircle, Minus, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils/money';

const borrowedItems = [
  { name: 'Amit', amount: '₹5,000', repaid: '₹3,000 repaid', remaining: '₹2,000 remaining', status: 'partial', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { name: 'Rohit', amount: '₹2,000', repaid: '₹0 repaid', remaining: '₹2,000 remaining', status: 'pending', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
];

export function BorrowedMoneySection() {
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8" id="borrowed">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-4">
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Money Borrowed</p>
                    <CardTitle className="text-3xl font-bold">₹7,000</CardTitle>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/10 text-red-600">
                    <Wallet className="h-6 w-6" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">₹7,000 remaining to repay</p>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                {borrowedItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-red-500/10 text-red-600">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Total: {item.amount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn('font-semibold', item.color)}>{item.remaining}</p>
                      <p className="text-sm text-muted-foreground">{item.repaid}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="border-border/50 shadow-sm bg-gradient-to-br from-red-500/5 to-pink-500/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-red-500/10 text-red-600">
                    <ArrowDownLeft className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Know exactly what you owe</p>
                    <p className="text-sm text-muted-foreground">Track borrowed money and repayments without relying on memory, chats, or scattered notes.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="sticky top-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-600 text-sm font-medium mb-6">
              <Wallet className="h-4 w-4" />
              <span>Money Borrowed</span>
            </div>
            <h2 className="text-3l lg:text-4xl font-bold tracking-tight text-foreground mb-6">
              Know exactly what you owe.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Track borrowed money and repayments without relying on memory, chats, or scattered notes.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-card border border-border/50 rounded-xl">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-600">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Track every loan you take</p>
                  <p className="text-sm text-muted-foreground">Clear record of what you borrowed and from whom</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card border border-border/50 rounded-xl">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Record repayments easily</p>
                  <p className="text-sm text-muted-foreground">See exactly how much you\'ve paid back</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card border border-border/50 rounded-xl">
                <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Never miss a due date</p>
                  <p className="text-sm text-muted-foreground">Stay on top of repayment schedules</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}