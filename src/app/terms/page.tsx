'use client';

import React from 'react';
import { Target } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function TermsPage() {
  const lastUpdated = 'October 1, 2026';
  
  return (
    <div className="min-h-screen bg-background py-16 lg:py-24 px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-6" aria-label="MoneyTrack Home">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Target className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-foreground">MoneyTrack</span>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
        
        <div className="space-y-8">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>By accessing and using MoneyTrack ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, you may not use the Service.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>MoneyTrack is a personal money management application that allows users to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Track money lent to others</li>
                <li>Track money borrowed from others</li>
                <li>Record repayments and payments</li>
                <li>Create and track savings goals</li>
                <li>View financial summaries and analytics</li>
              </ul>
              <p>MoneyTrack is a personal tool, not a financial institution, payment processor, or lending platform. We do not facilitate transfers of actual money between users.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">3. User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <ul className="list-disc list-inside space-y-2">
                <li>You must sign in with a Google account to use MoneyTrack.</li>
                <li>You are responsible for maintaining the security of your Google account.</li>
                <li>You agree to provide accurate information and keep it updated.</li>
                <li>You may delete your account at any time through the app settings.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">4. Data & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Your use of MoneyTrack is also governed by our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. Please review it to understand how we collect, use, and protect your information.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">5. Acceptable Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Service or other users' data</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service to track financial information on behalf of others without their consent</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">6. Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p><strong>MoneyTrack is provided "as is" and "as available" without warranties of any kind.</strong></p>
              <ul className="list-disc list-inside space-y-2">
                <li>MoneyTrack is not a financial advisor, bank, or accounting service.</li>
                <li>We do not guarantee the accuracy, completeness, or timeliness of any calculations or data.</li>
                <li>You are solely responsible for your financial decisions.</li>
                <li>We do not warrant that the Service will be uninterrupted, error-free, or free of viruses.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">7. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>To the maximum extent permitted by law, MoneyTrack and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the Service.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">8. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We may suspend or terminate your access to the Service at any time, with or without cause, including for violation of these Terms. Upon termination, your right to use the Service ceases immediately.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We may modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page and updating the "Last updated" date. Continued use after changes constitutes acceptance.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">10. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>These Terms shall be governed by the laws of the jurisdiction where MoneyTrack operates, without regard to conflict of law principles.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">11. Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>If you have questions about these Terms, contact us:</p>
              <p>Email: legal@moneytrack.app</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <Target className="h-5 w-5" />
            <span>Back to MoneyTrack</span>
          </Link>
        </div>
      </div>
    </div>
  );
}