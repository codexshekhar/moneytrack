'use client';

import React from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { Hero } from '@/components/landing/Hero';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { LentMoneySection } from '@/components/landing/LentMoneySection';
import { BorrowedMoneySection } from '@/components/landing/BorrowedMoneySection';
import { SavingsGoalsSection } from '@/components/landing/SavingsGoalsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { PWASection } from '@/components/landing/PWASection';
import { SecuritySection } from '@/components/landing/SecuritySection';
import { DashboardShowcaseSection } from '@/components/landing/DashboardShowcaseSection';
import { WhoIsItForSection } from '@/components/landing/WhoIsItForSection';
import { FinalCTASection } from '@/components/landing/FinalCTASection';
import { Footer } from '@/components/landing/Footer';
import { MobileDrawerProvider } from '@/components/layout/MobileDrawerContext';

export default function LandingPage() {
  return (
    <MobileDrawerProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <LandingNavbar />
        <main className="flex-1">
          <Hero />
          <TrustStrip />
          <ProblemSection />
          <FeaturesSection />
          <LentMoneySection />
          <BorrowedMoneySection />
          <SavingsGoalsSection />
          <HowItWorksSection />
          <PWASection />
          <SecuritySection />
          <DashboardShowcaseSection />
          <WhoIsItForSection />
          <FinalCTASection />
        </main>
        <Footer />
      </div>
    </MobileDrawerProvider>
  );
}