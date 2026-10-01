'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Target, PiggyBank, TrendingUp, ArrowUpRight, Clock, CheckCircle, Laptop, Smartphone, Plane, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/money';

const mainGoal = {
  name: 'MacBook Fund',
  saved: 35000,
  target: 80000,
  targetDate: '30 December 2026',
  icon: Laptop,
  color: 'text-purple-600',
  bg: 'bg-purple-500',
};

const otherGoals = [
  { name: 'Emergency Fund', saved: 12000, target: 50000, icon: Shield, color: 'text-green-600', bg: 'bg-green-500' },
  { name: 'New Phone', saved: 8500, target: 25000, icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-500' },
  { name: 'Travel', saved: 15000, target: 40000, icon: Plane, color: 'text-orange-600', bg: 'bg-orange-500' },
];

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 300);
    return () => clearTimeout(timer);
  }, [progress]);
  
  return (
    <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
      <div 
        className="h-full rounded-full transition-all duration-1000 ease-out" 
        style={{ width: `${animatedProgress}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function SavingsGoalsSection() {
  const router = useRouter();
  const progress = Math.round((mainGoal.saved / mainGoal.target) * 100);
  
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8 bg-muted/30" id="savings">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-sm font-medium mb-6">
              <Target className="h-4 w-4" />
              <span>Savings Goals</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
              Small savings become big goals.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Whether you&apos;re saving for a new phone, laptop, emergency fund, trip, or something else — create a target and track your progress.
            </p>
            
            <Card className="border-border/50 shadow-sm bg-gradient-to-br from-purple-500/5 to-pink-500/5">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('p-3 rounded-xl', mainGoal.bg)}>
                      <mainGoal.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Goal</p>
                      <CardTitle className="text-xl font-bold">{mainGoal.name}</CardTitle>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Target Date</p>
                    <p className="font-medium text-foreground">{mainGoal.targetDate}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">Progress</span>
                      <span className="text-sm font-semibold text-purple-600">{progress}%</span>
                    </div>
                  </div>
                  <ProgressBar progress={progress} color="#a855f7" />
                  <p className="text-sm text-muted-foreground">
                    ₹{mainGoal.saved.toLocaleString()} saved of ₹{mainGoal.target.toLocaleString()} • ₹{(mainGoal.target - mainGoal.saved).toLocaleString()} to go
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherGoals.map((goal, index) => (
                <Card key={index} className="border-border/50 shadow-sm">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn('p-2 rounded-lg', goal.bg)}>
                          <goal.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{goal.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{goal.saved.toLocaleString()} / ₹{goal.target.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className={cn('text-sm font-semibold', goal.color)}>
                        {Math.round((goal.saved / goal.target) * 100)}%
                      </span>
                    </div>
                    <ProgressBar progress={Math.round((goal.saved / goal.target) * 100)} color={goal.color} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="sticky top-24">
            <Card className="border-border/50 shadow-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-purple-500 text-white">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">MacBook Fund</p>
                    <CardTitle className="text-2xl font-bold">₹35,000 saved</CardTitle>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">of ₹80,000 • 44%</p>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <ProgressBar progress={44} color="#a855f7" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>₹45,000 to go</span>
                  <span>Target: 30 Dec 2026</span>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <Button variant="outline" className="w-full" onClick={() => router.push('/login')}>
                    Add to Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}