'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, ArrowUpDown, Target, BarChart3, MoreHorizontal, Settings, User, LogOut, ArrowUpDown as ArrowUpDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils/money';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { firebaseAuth } from '@/lib/firebase/auth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Lent', href: '/lent', icon: Users },
  { name: 'Borrowed', href: '/borrowed', icon: ArrowUpDown },
  { name: 'Savings', href: '/savings', icon: Target },
];

const moreItems = [
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <ul className="flex h-16 items-center justify-around" role="list">
        {navigation.map((item) => (
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
        <li>
          <DropdownMenu open={moreOpen} onOpenChange={setMoreOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors h-full',
                moreOpen ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}>
                <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                <span>More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="top" sideOffset={8} className="w-48">
              <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">More</div>
              {moreItems.map((item) => (
                <DropdownMenuItem asChild key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex w-full items-center gap-2 px-2 py-1.5 text-sm',
                      pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => firebaseAuth.signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
}