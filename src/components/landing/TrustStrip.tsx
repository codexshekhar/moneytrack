'use client';

import React from 'react';
import { Check, Shield, Lock, Smartphone, Monitor, Globe } from 'lucide-react';
import { cn } from '@/lib/utils/money';

const trustItems = [
  { icon: Check, label: 'Simple', description: 'Clean, intuitive interface' },
  { icon: Shield, label: 'Private', description: 'Your data belongs to you' },
  { icon: Lock, label: 'Secure', description: 'Google authentication' },
  { icon: Globe, label: 'Accessible', description: 'Works everywhere' },
];

export function TrustStrip() {
  return (
    <section className="py-16 lg:py-20 px-4 lg:px-8 border-y border-border/50 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-medium text-primary mb-12 tracking-wider uppercase">
          Built for everyday money decisions
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className="text-center group">
              <div className={cn(
                'inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 text-primary mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105'
              )}>
                <item.icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}