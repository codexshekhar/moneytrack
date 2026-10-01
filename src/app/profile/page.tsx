'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { User, Mail, Calendar, LogOut, Settings } from 'lucide-react';
import { firebaseAuth } from '@/lib/firebase/auth';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

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

  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      toast.success('Signed out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="h-24 w-24 rounded-full" />
                ) : (
                  <User className="h-12 w-12 text-primary" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.displayName || 'User'}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 pt-6 border-t">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Account Created</p>
                  <p className="font-medium">
                    {user.metadata.creationTime 
                      ? format(new Date(user.metadata.creationTime), 'MMMM yyyy')
                      : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <Button variant="destructive" onClick={handleSignOut} className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Note</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>Your account is linked to Google. To update your name, photo, or email, please visit your <a href="https://myaccount.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Account settings</a>.</p>
            <p className="mt-2">MoneyTrack uses Firebase Authentication for secure, passwordless sign-in.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}