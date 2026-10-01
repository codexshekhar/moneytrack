'use client';

import React from 'react';
import { UserCheck, PlusCircle, BarChart3, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils/money';

const steps = [
  {
    number: '01',
    title: 'Sign in with Google',
    description: 'Create your private MoneyTrack account in seconds. No passwords to remember, just secure Google authentication.',
    icon: UserCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-500',
  },
  {
    number: '02',
    title: 'Add your money records',
    description: 'Track what you lend, borrow, repay, and save. Simple forms, automatic calculations, instant updates.',
    icon: PlusCircle,
    color: 'text-green-600',
    bg: 'bg-green-500',
  },
  {
    number: '03',
    title: 'Stay in control',
    description: 'See your financial picture and progress from one dashboard. Outstanding money, savings goals, activity — all in one place.',
    icon: BarChart3,
    color: 'text-purple-600',
    bg: 'bg-purple-500',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
            Simple by design.
          </h2>
          <p className="text-lg text-muted-foreground">
            Three steps to take control of your money.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[80%] bg-gradient-to-b from-primary/20 to-transparent" />
          
          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <Card 
                key={index} 
                className={cn(
                  'relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50',
                  index === 1 ? 'ring-2 ring-primary/20' : ''
                )}
              >
                <CardContent className="p-6 lg:p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'flex-shrink-0 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300',
                      step.bg
                    )}>
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary/70 tracking-wider uppercase">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground mt-1">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-12">
                    {step.description}
                  </p>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute right-[-44px] top-1/2 -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-primary/30" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}