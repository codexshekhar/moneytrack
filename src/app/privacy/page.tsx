'use client';

import React from 'react';
import { Target } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
        
        <div className="space-y-8">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>MoneyTrack collects only the information necessary to provide the service:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Account Information:</strong> When you sign in with Google, we receive your name, email address, and profile picture from Google&apos;s authentication service.</li>
                <li><strong>Financial Data:</strong> Information you voluntarily enter &mdash; money lent, money borrowed, repayments, savings goals, and related details.</li>
                <li><strong>Usage Data:</strong> Basic analytics about how you interact with the app (pages visited, features used) to improve the service.</li>
              </ul>
              <p>We do not collect: credit card numbers, bank account details, social security numbers, or any sensitive personal identification beyond what Google provides for authentication.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <ul className="list-disc list-inside space-y-2">
                <li>To provide, maintain, and improve the MoneyTrack service</li>
                <li>To authenticate your account and keep your data secure</li>
                <li>To display your financial data back to you in organized views</li>
                <li>To send essential service notifications (security alerts, account changes)</li>
                <li>To analyze usage patterns and improve the product</li>
              </ul>
              <p>We do not sell, rent, or share your personal or financial data with third parties for marketing or advertising purposes.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">3. Data Storage & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Your data is stored in Google Firebase:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Authentication:</strong> Handled by Firebase Authentication (Google OAuth 2.0)</li>
                <li><strong>Database:</strong> Firestore with security rules enforcing user data isolation</li>
                <li><strong>Encryption:</strong> Data encrypted in transit (TLS) and at rest (Google-managed encryption)</li>
                <li><strong>Access Control:</strong> Each user can only access their own data via security rules</li>
              </ul>
              <p>We implement industry-standard security practices, but no internet transmission or storage system is 100% secure.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">4. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data (by deleting your account)</li>
                <li>Export your data</li>
                <li>Restrict processing of your data</li>
              </ul>
              <p>To exercise these rights, use the account settings in the app or contact us.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">5. Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>MoneyTrack uses:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Firebase (Google):</strong> Authentication, database, hosting</li>
                <li><strong>Google OAuth:</strong> Secure sign-in</li>
              </ul>
              <p>These services have their own privacy policies. We encourage you to review them.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">6. Children&apos;s Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>MoneyTrack is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">7. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date. Continued use of the service after changes constitutes acceptance.</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">8. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>If you have questions about this Privacy Policy or our data practices, contact us:</p>
              <p>Email: privacy@moneytrack.app</p>
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