'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Target, ArrowRight, Shield, Lock, Smartphone, Monitor, Check, TrendingUp, Users, Wallet, PiggyBank, BarChart3, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils/money';

const stats = [
  { label: 'Money Lent', value: '₹8,500', icon: ArrowUpRight, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
  { label: 'Money Borrowed', value: '₹4,000', icon: ArrowDownLeft, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
  { label: 'Savings', value: '₹12,000', icon: PiggyBank, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Savings Goal', value: '₹35,000 / ₹80,000', icon: Target, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
];

export function DashboardPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl blur-2xl" aria-hidden="true" />
      <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
            moneytrack.app/dashboard
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Overview</p>
            <p className="text-4xl font-bold tracking-tight text-foreground mt-1">₹24,500</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className={cn('border-border/50 shadow-sm', stat.bg)}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn('p-2 rounded-lg', stat.bg)}>
                      <stat.icon className={cn('h-5 w-5', stat.color)} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-muted-foreground truncate">{stat.label}</p>
                      <p className="text-lg font-semibold text-foreground truncate">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-muted-foreground">Savings Goal</p>
              <p className="text-sm font-semibold text-purple-600">44%</p>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out" 
                style={{ width: '44%' }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">₹45,000 to go • Target: 30 Dec 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const router = useRouter();
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 lg:px-8 py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" aria-hidden="true" />
      
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up delay-100">
              <Shield className="h-4 w-4" />
              <span>Secure Google Sign-In • Private data • Works on mobile & desktop</span>
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-tight mb-6 animate-fade-up delay-200">
              Your money, finally{' '}
              <span className="text-primary">under control.</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-up delay-300">
              Track what you lend, what you owe, and what you&apos;re saving — all in one simple, secure app.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up delay-400">
              <Button size="lg" className="w-full sm:w-auto gap-2" onClick={() => router.push('/login')}>
                <span className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" onClick={() => router.push('#features')}>
                <span className="flex items-center gap-2">
                  See How It Works
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-up delay-500">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}