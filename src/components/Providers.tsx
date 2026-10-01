'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/Toaster';
import { QueryProvider } from '@/components/QueryProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}