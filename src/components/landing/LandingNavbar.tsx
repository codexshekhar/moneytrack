'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Monitor, Target, ArrowRight, Check, Smartphone, Tablet, Monitor as MonitorIcon, Shield, Lock, Globe, Users, Briefcase, GraduationCap, TrendingUp, ArrowUpRight, ArrowDownLeft, PiggyBank, BarChart3, HandCoins, Wallet, Target as TargetIcon, ChartNoAxesCombined, ArrowUp, ArrowDown, Minus, Plus, Circle, CheckCircle, Clock, AlertCircle, Trash2, Edit, Eye, Download, Upload, Settings, LogOut, User, Home, Menu as MenuIcon, ChevronRight, ChevronLeft, Star, Sparkles, Zap, ShieldCheck, LockKeyhole, Database, Cloud, Wifi, WifiOff, Battery, BatteryLow, Signal, SignalLow, Cpu, HardDrive, MonitorSmartphone, Laptop, Smartphone as SmartphoneIcon, Tablet as TabletIcon, Desktop as DesktopIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { useTheme } from '@/contexts/ThemeContext';
import { useMobileDrawer } from '@/components/layout/MobileDrawerContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils/money';

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Savings', href: '#savings' },
  { name: 'Security', href: '#security' },
];

export function LandingNavbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isOpen, toggle, close } = useMobileDrawer();
  const { user, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ctaText = user ? 'Open Dashboard' : 'Get Started Free';
  const ctaHref = user ? '/dashboard' : '/login';

  return (
    <header className={cn(
      'sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b transition-all duration-300',
      scrolled 
        ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm' 
        : 'bg-transparent'
    )}>
      <div className="flex w-full items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="MoneyTrack Home">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Target className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">MoneyTrack</span>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          {loading ? (
            <Button variant="ghost" size="sm" disabled className="w-28">
              <div className="animate-pulse h-4 w-full bg-muted rounded" />
            </Button>
          ) : user ? (
            <Button variant="default" size="sm" asChild>
              <Link href="/dashboard">
                <span className="flex items-center gap-2">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Button variant="default" size="sm" asChild>
                <Link href="/login">
                  <span className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="lg:hidden p-2"
          onClick={toggle}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn(
        'lg:hidden transition-all duration-300 ease-in-out overflow-hidden',
        isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
      )}>
        <nav className="px-4 pt-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-3 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border/50"
              onClick={close}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 space-y-2 border-t border-border">
            {loading ? (
              <Button variant="outline" className="w-full justify-start" disabled>
                <div className="animate-pulse h-4 w-32 bg-muted rounded" />
              </Button>
            ) : user ? (
              <Button variant="default" className="w-full justify-start" asChild onClick={close}>
                <Link href="/dashboard">
                  <span className="flex items-center gap-2">
                    Open Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
            ) : (
              <div>
                <Link href="/login" onClick={close}>
                  <Button variant="outline" className="w-full justify-start">Log In</Button>
                </Link>
                <Button variant="default" className="w-full justify-start" asChild onClick={close}>
                  <Link href="/login">
                    <span className="flex items-center gap-2">
                      Get Started Free
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}