'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Bird, GitFork, Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils/money';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 border-t border-border/50 py-16 lg:py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="MoneyTrack Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Target className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">MoneyTrack</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs mb-6">
              Know your money. Reach your goals. A simple, secure personal money tracker.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-muted/50 transition-colors" aria-label="Twitter">
                <Bird className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-muted/50 transition-colors" aria-label="GitHub">
                <GitFork className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-muted/50 transition-colors" aria-label="LinkedIn">
                <ExternalLink className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="mailto:hello@moneytrack.app" className="p-2 rounded-lg bg-muted hover:bg-muted/50 transition-colors" aria-label="Email">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <nav className="space-y-3">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
              <Link href="#savings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Savings Goals</Link>
              <Link href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Account</h4>
            <nav className="space-y-3">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Log In</Link>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Get Started</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <nav className="space-y-3">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </nav>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} MoneyTrack. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Not a financial advisor. MoneyTrack is a personal money management tool.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}