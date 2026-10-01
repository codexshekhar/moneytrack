'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone, Tablet, Monitor, Download, Check, ArrowRight, Wifi, WifiOff, Battery, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils/money';

export function PWASection() {
  const router = useRouter();
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setCanInstall(false);
    }
  };

  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone);
  }, []);

  const devices = [
    { name: 'Phone', icon: Smartphone, size: 'w-20 h-36', screenSize: 'w-16 h-28' },
    { name: 'Tablet', icon: Tablet, size: 'w-28 h-20', screenSize: 'w-22 h-14' },
    { name: 'Desktop', icon: Monitor, size: 'w-32 h-20', screenSize: 'w-26 h-14' },
  ];

  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8 bg-muted/30" id="pwa">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-6">
              <Smartphone className="h-4 w-4" />
              <span>PWA Ready</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
              Your money tracker, wherever you go.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              MoneyTrack works beautifully on your phone, tablet, and desktop. Add it to your home screen and use it like a native app.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              {devices.map((device, index) => (
                <div key={index} className="text-center group">
                  <div className={cn(
                    'relative mx-auto mb-4 transition-all duration-300 group-hover:-translate-y-1',
                    device.size
                  )}>
                    <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 rounded-xl lg:rounded-2xl border border-border/50 shadow-xl" />
                    <div className={cn(
                      'relative inset-2 bg-background rounded-lg lg:rounded-xl border border-border/50 flex items-center justify-center',
                      device.screenSize
                    )}>
                      <div className="flex flex-col items-center justify-center gap-2 p-4">
                        <device.icon className="h-8 w-8 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">{device.name}</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium text-foreground">{device.name}</h4>
                  <p className="text-sm text-muted-foreground">Optimized experience</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto gap-2" onClick={() => router.push('/login')}>
                <span className="flex items-center gap-2">
                  Open MoneyTrack
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
              {canInstall && !isStandalone && (
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" onClick={handleInstall}>
                  <Download className="h-5 w-5" />
                  <span>Install App</span>
                </Button>
              )}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto">
              <div className="relative w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-2">
                <div className="absolute inset-0 bg-background rounded-2xl border border-border/50 shadow-2xl flex items-center justify-center p-8">
                  <div className="text-center">
                    <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">MoneyTrack</h3>
                    <p className="text-muted-foreground">Add to Home Screen</p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Wifi className="h-4 w-4" />
                      <span>Online</span>
                      <WifiOff className="h-4 w-4" />
                      <span>Offline</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Type for beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}