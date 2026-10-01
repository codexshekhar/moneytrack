'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';
import { Sun, Moon, Monitor, Download, Database, Trash2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import { formatINR } from '@/lib/utils/money';
import { format } from 'date-fns';
import { lentMoneyService, borrowedMoneyService, repaymentService, savingsGoalService } from '@/lib/services/firestore';
import type { LentTransaction, BorrowedTransaction, Repayment, SavingsGoal } from '@/types';

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [exportLoading, setExportLoading] = useState(false);

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-32 bg-muted rounded-lg border" />
        </div>
      </DashboardLayout>
    );
  }

  if (!user) return null;

  const handleExportData = async () => {
    if (!user) return;
    setExportLoading(true);
    try {
      const [lent, borrowed, allRepayments, savings] = await Promise.all([
        lentMoneyService.getAll(user.uid),
        borrowedMoneyService.getAll(user.uid),
        repaymentService.getAll(user.uid),
        savingsGoalService.getAll(user.uid),
      ]);

      const exportData = {
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          exportDate: new Date().toISOString(),
        },
        lentTransactions: lent,
        borrowedTransactions: borrowed,
        repayments: allRepayments,
        savingsGoals: savings,
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `moneytrack-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and data.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Appearance</CardTitle>
            <CardDescription>Choose your preferred color theme.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'light', label: 'Light', icon: Sun, desc: 'Always use light mode' },
                { value: 'dark', label: 'Dark', icon: Moon, desc: 'Always use dark mode' },
                { value: 'system', label: 'System', icon: Monitor, desc: 'Match system preference' },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={theme === option.value ? 'default' : 'outline'}
                  className="flex flex-col items-start gap-2 h-24 w-full p-4"
                  onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                >
                  <option.icon className="h-6 w-6" />
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.desc}</span>
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Current: <span className="capitalize font-medium">{resolvedTheme} mode</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Currency</CardTitle>
            <CardDescription>Default currency for displaying amounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Label htmlFor="currency">Currency</Label>
              <Select value="INR" onValueChange={() => {}} disabled>
                <SelectTrigger id="currency" className="w-[200px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR ₹ (Indian Rupee)</SelectItem>
                  <SelectItem value="USD" disabled>USD $ (Coming Soon)</SelectItem>
                  <SelectItem value="EUR" disabled>EUR € (Coming Soon)</SelectItem>
                  <SelectItem value="GBP" disabled>GBP £ (Coming Soon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Additional currencies will be supported in future updates.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Data</CardTitle>
            <CardDescription>Export or manage your financial data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-4">
                <Download className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="font-medium">Export My Data</p>
                  <p className="text-sm text-muted-foreground">Download all your transactions and goals as JSON</p>
                </div>
              </div>
              <Button onClick={handleExportData} loading={exportLoading}>
                <Download className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 rounded-lg border bg-destructive/5">
              <div className="flex items-center gap-4">
                <Trash2 className="h-6 w-6 text-destructive" />
                <div>
                  <p className="font-medium text-destructive">Delete All Data</p>
                  <p className="text-sm text-muted-foreground">Permanently remove all your transactions and goals</p>
                </div>
              </div>
              <Button variant="destructive" onClick={() => alert('This feature requires confirmation. Not implemented in demo.')}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About</CardTitle>
            <CardDescription>Application information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p><strong>MoneyTrack</strong> v1.0.0</p>
            <p>A secure personal money and savings tracker.</p>
            <p>Built with Next.js, Firebase, and Tailwind CSS.</p>
            <p className="pt-2">Your financial data is stored securely in Firebase Firestore and is only accessible to you.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}