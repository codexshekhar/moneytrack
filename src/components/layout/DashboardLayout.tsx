'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { MobileDrawerProvider } from './MobileDrawerContext';

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <MobileDrawerProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col lg:pl-64">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20">
            {children}
          </main>
        </div>
        <MobileNav />
      </div>
    </MobileDrawerProvider>
  );
}