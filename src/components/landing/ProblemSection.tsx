'use client';

import React from 'react';
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Minus, Plus, Circle, Users, Wallet, Target, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils/money';

export function ProblemSection() {
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
            Money gets complicated when you don&apos;t keep track.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            You lend someone money. You borrow from someone else. You promise yourself you&apos;ll save for something important.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 lg:p-8 bg-card border border-border/50 rounded-2xl">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">You lent money</h3>
            <p className="text-muted-foreground leading-relaxed">A few weeks later: "How much does Rahul still owe me?"</p>
          </div>
          
          <div className="text-center p-6 lg:p-8 bg-card border border-border/50 rounded-2xl relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
              <div className="h-24 w-24 rounded-full border-4 border-dashed border-primary/20 animate-pulse" />
            </div>
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 mb-4">
              <Wallet className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">You borrowed money</h3>
            <p className="text-muted-foreground leading-relaxed">A few weeks later: "How much do I need to repay?"</p>
          </div>
          
          <div className="text-center p-6 lg:p-8 bg-card border border-border/50 rounded-2xl">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-4">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">You promised to save</h3>
            <p className="text-muted-foreground leading-relaxed">A few weeks later: "How much have I actually saved?"</p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            MoneyTrack keeps all of it organized in one place.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span>Scattered</span>
            </span>
            <span className="text-primary">→</span>
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span>Organized</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}