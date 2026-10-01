'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, ArrowUpDown, Target, BarChart3, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils/money';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { useAuth } from '@/contexts/AuthContext';
import { firebaseAuth } from '@/lib/firebase/auth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Lent', href: '/lent', icon: Users },
  { name: 'Borrowed', href: '/borrowed', icon: ArrowUpDown },
  { name: 'Savings Goals', href: '/savings', icon: Target },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export function Sidebar({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-background px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Target className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-foreground">MoneyTrack</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                        pathname === item.href
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      )}
                    >
                      <item.icon className={cn('h-5 w-5 shrink-0', pathname === item.href ? 'text-primary' : 'text-muted-foreground')} aria-hidden="true" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border p-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3" size="lg">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" className="h-9 w-9 rounded-full" />
                ) : (
                  <User className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="text-left truncate">
                <p className="text-sm font-medium leading-6 truncate">{user?.displayName || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">Account</div>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex w-full items-center justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex w-full items-center justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => firebaseAuth.signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}