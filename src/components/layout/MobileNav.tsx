'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, ArrowUpDown, Target, BarChart3, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils/money';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Lent', href: '/lent', icon: Users },
  { name: 'Borrowed', href: '/borrowed', icon: ArrowUpDown },
  { name: 'Savings', href: '/savings', icon: Target },
  { name: 'More', href: '#', icon: MoreHorizontal },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <ul className="flex h-16 items-center justify-around" role="list">
        {navigation.slice(0, 4).map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}