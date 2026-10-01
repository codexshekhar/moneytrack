'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Shield, Lock, Smartphone, Monitor, Check, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils/money';
import { useAuth } from '@/contexts/AuthContext';

export function FinalCTASection() {
  const { user } = useAuth();
  const router = useRouter();
  
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8 relative overflow-hidden" id="cta">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" aria-hidden="true" />
      
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Shield className="h-4 w-4" />
          <span>Start free • No credit card • Cancel anytime</span>
        </div>
        
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground mb-6">
          Start taking control of your money today.
        </h2>
        
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          One simple place for money you've lent, money you owe, and the goals you're saving toward.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="w-full sm:w-auto gap-2 text-lg px-8 py-3" onClick={() => router.push('/login')}>
            <span className="flex items-center gap-2">
              {user ? 'Open Dashboard' : 'Get Started Free'}
              <ArrowRight className="h-5 w-5" />
            </span>
          </Button>
          {!user && (
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-3" onClick={() => router.push('/login')}>
              Already have an account? Log in
            </Button>
          )}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-4 bg-card border border-border/50 rounded-2xl">
            <div className="p-3 rounded-xl bg-green-500/10 text-green-600">
              <Shield className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Secure & Private</p>
              <p className="text-sm text-muted-foreground">Google Sign-In only</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-4 bg-card border border-border/50 rounded-2xl">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600">
              <Smartphone className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Works Everywhere</p>
              <p className="text-sm text-muted-foreground">Mobile, tablet, desktop</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-4 bg-card border border-border/50 rounded-2xl">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Free Forever</p>
              <p className="text-sm text-muted-foreground">No hidden costs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}