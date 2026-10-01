'use client';

import React from 'react';
import { GraduationCap, Briefcase, Laptop, PiggyBank, Users, Wallet, Target, TrendingUp, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils/money';

const personas = [
  {
    title: 'Students',
    description: 'Keep track of money borrowed from or lent to friends. Never lose track of shared expenses.',
    icon: GraduationCap,
    color: 'text-blue-600',
    bg: 'bg-blue-500',
    benefits: ['Split expenses with roommates', 'Track money lent to friends', 'Simple budgeting for student life'],
  },
  {
    title: 'Young Professionals',
    description: 'Manage personal lending, borrowing, and savings as you build your career and financial foundation.',
    icon: Briefcase,
    color: 'text-green-600',
    bg: 'bg-green-500',
    benefits: ['Track salary advances & loans', 'Build emergency fund', 'Save for career milestones'],
  },
  {
    title: 'Freelancers',
    description: 'Keep personal money records organized separate from business finances. Track client payments.',
    icon: Laptop,
    color: 'text-purple-600',
    bg: 'bg-purple-500',
    benefits: ['Separate personal/business money', 'Track client payment due dates', 'Save for tax season'],
  },
  {
    title: 'Everyday Savers',
    description: 'Set targets and build better saving habits. Watch your progress grow toward what matters most.',
    icon: PiggyBank,
    color: 'text-orange-600',
    bg: 'bg-orange-500',
    benefits: ['Visual progress tracking', 'Multiple simultaneous goals', 'Motivating milestone alerts'],
  },
];

export function WhoIsItForSection() {
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8 bg-muted/30" id="who">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
            Built for real life.
          </h2>
          <p className="text-lg text-muted-foreground">
            MoneyTrack adapts to how you manage money — whether you\'re splitting rent, building an emergency fund, or saving for something special.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, index) => (
            <Card key={index} className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <div className={cn('p-4 rounded-2xl', persona.bg)}>
                  <persona.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{persona.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{persona.description}</p>
                <div className="space-y-2 pt-4 border-t border-border/50">
                  {persona.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className={cn('h-4 w-4 flex-shrink-0', persona.color)} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Not a financial advisor or accounting tool. Just a simple way to keep your personal money organized.
          </p>
        </div>
      </div>
    </section>
  );
}