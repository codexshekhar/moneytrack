'use client';

import React from 'react';
import { Target, Users, Wallet, PiggyBank, TrendingUp, CheckCircle, ArrowRight, Clock, AlertCircle, Minus, Plus, ArrowUpRight, ArrowDownLeft, Laptop, Smartphone, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils/money';

const recentActivity = [
  { type: 'lent', name: 'Rahul', amount: '₹2,000', desc: 'Repayment received', time: '2 hours ago', icon: ArrowDownLeft, color: 'text-green-600', bg: 'bg-green-500/10' },
  { type: 'borrowed', name: 'Amit', amount: '₹1,500', desc: 'Repayment made', time: '5 hours ago', icon: ArrowUpRight, color: 'text-blue-600', bg: 'bg-blue-500/10' },
  { type: 'savings', name: 'MacBook Fund', amount: '₹5,000', desc: 'Added to savings', time: '1 day ago', icon: PiggyBank, color: 'text-purple-600', bg: 'bg-purple-500/10' },
  { type: 'lent', name: 'Priya', amount: '₹1,000', desc: 'New loan added', time: '2 days ago', icon: ArrowUpRight, color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
];

const floatingCards = [
  { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-500/10', title: '+ ₹2,000 repayment', desc: 'From Rahul just now' },
  { icon: Target, color: 'text-purple-600', bg: 'bg-purple-500/10', title: 'Goal 44% complete', desc: 'MacBook Fund progressing' },
  { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-500/10', title: 'Due in 3 days', desc: 'Amit owes ₹3,500' },
];

export function DashboardShowcaseSection() {
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8" id="dashboard">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
            One dashboard. Your complete money picture.
          </h2>
          <p className="text-lg text-muted-foreground">
            See everything that matters at a glance — outstanding money, savings progress, and recent activity.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl blur-3xl" aria-hidden="true" />
          
          <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border/50 bg-muted/30">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
                moneytrack.app/dashboard
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Live
                </span>
              </div>
            </div>
            <div className="p-6 lg:p-8 space-y-8">
              <div className="grid lg:grid-cols-5 gap-6">
                <Card className={cn('border-border/50 shadow-sm bg-gradient-to-br from-green-500/5 to-emerald-500/5', 'lg:col-span-2')}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-green-500 text-white">
                          <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Overview</p>
                          <CardTitle className="text-3xl font-bold">₹24,500</CardTitle>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-green-500 text-white">
                        <ArrowUpRight className="h-6 w-6" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-green-600 font-medium">Net positive position</p>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Money Lent</p>
                        <CardTitle className="text-2xl font-bold">₹8,500</CardTitle>
                      </div>
                      <div className="p-3 rounded-xl bg-green-500 text-white">
                        <Users className="h-5 w-5" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-green-600 font-medium">3 active loans</p>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Money Borrowed</p>
                        <CardTitle className="text-2xl font-bold">₹4,000</CardTitle>
                      </div>
                      <div className="p-3 rounded-xl bg-red-500 text-white">
                        <Wallet className="h-5 w-5" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-600 font-medium">2 pending</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-border/50 shadow-sm lg:col-span-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-purple-500 text-white">
                          <PiggyBank className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Savings</p>
                          <CardTitle className="text-2xl font-bold">₹12,000</CardTitle>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-500 text-white">
                        <Target className="h-5 w-5" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-muted-foreground">Overall Progress</span>
                          <span className="font-semibold text-purple-600">62%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '62%' }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50 shadow-sm lg:col-span-1">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">Savings Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
                          <Laptop className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">MacBook Fund</p>
                          <p className="text-sm text-muted-foreground">₹35,000 / ₹80,000</p>
                        </div>
                      </div>
                      <span className="font-semibold text-purple-600">44%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Emergency Fund</p>
                          <p className="text-sm text-muted-foreground">₹12,000 / ₹50,000</p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">24%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">New Phone</p>
                          <p className="text-sm text-muted-foreground">₹8,500 / ₹25,000</p>
                        </div>
                      </div>
                      <span className="font-semibold text-blue-600">34%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl group hover:bg-muted/50 transition-colors">
                      <div className={cn('p-3 rounded-xl', activity.bg)}>
                        <activity.icon className={cn('h-5 w-5', activity.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground truncate">{activity.name}</p>
                          <span className="text-sm font-semibold text-foreground">{activity.amount}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{activity.desc}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 hidden lg:block">
              <div className="space-y-2">
                {floatingCards.map((card, index) => (
                  <div key={index} className={cn(
                    'fixed bottom-8 right-8 p-4 bg-card border border-border/50 rounded-2xl shadow-2xl animate-slide-up',
                    card.bg
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn('p-2 rounded-lg', card.bg)}>
                        <card.icon className={cn('h-5 w-5', card.color)} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{card.title}</p>
                        <p className="text-sm text-muted-foreground">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}