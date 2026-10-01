'use client';

import React from 'react';
import { Shield, Lock, Database, Cloud, User, Globe, Check, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils/money';

const securityItems = [
  {
    title: 'Google Sign-In',
    description: 'Secure authentication through your Google account. No passwords stored, no credentials to manage.',
    icon: User,
    color: 'text-blue-600',
    bg: 'bg-blue-500',
  },
  {
    title: 'Private Data',
    description: 'Your financial records belong to your account. Each user\'s data is isolated and inaccessible to others.',
    icon: Lock,
    color: 'text-green-600',
    bg: 'bg-green-500',
  },
  {
    title: 'Protected Database',
    description: 'User data is separated using Firebase Authentication and Firestore security rules. Server-side enforcement.',
    icon: Database,
    color: 'text-purple-600',
    bg: 'bg-purple-500',
  },
];

const additionalSecurity = [
  { icon: Cloud, label: 'Encrypted in Transit', desc: 'All data encrypted via HTTPS/TLS' },
  { icon: Shield, label: 'Encrypted at Rest', desc: 'Firestore encryption at rest' },
  { icon: Globe, label: 'No Third-Party Access', desc: 'Your data never shared or sold' },
  { icon: Check, label: 'Minimal Permissions', desc: 'Only requests necessary auth scopes' },
];

export function SecuritySection() {
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8" id="security">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
            Your financial data is yours.
          </h2>
          <p className="text-lg text-muted-foreground">
            MoneyTrack is designed with privacy in mind. We don\'t sell your data, we don\'t show ads, and we don\'t track you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {securityItems.map((item, index) => (
            <Card key={index} className="border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <div className={cn('p-4 rounded-2xl', item.bg)}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
          
          <div className="border-t border-border/50 pt-16">
            <h3 className="text-2xl font-bold text-center mb-12">Additional protections</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalSecurity.map((item, index) => (
                <div key={index} className="text-center p-6 bg-card border border-border/50 rounded-2xl">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 text-primary mx-auto mb-4">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}