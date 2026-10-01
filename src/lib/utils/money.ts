export function formatINR(amount: number, options: { showSymbol?: boolean; minimumFractionDigits?: number; maximumFractionDigits?: number } = {}): string {
  const { showSymbol = true, minimumFractionDigits = 0, maximumFractionDigits = 0 } = options;
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    minimumFractionDigits,
    maximumFractionDigits,
  });
  
  return formatter.format(amount);
}

export function formatINRCompact(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return formatINR(amount);
}

export function parseINR(value: string): number {
  return parseFloat(value.replace(/[₹,]/g, '')) || 0;
}

export function calculateRemaining(total: number, paid: number): number {
  return Math.max(0, total - paid);
}

export function calculateProgress(saved: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((saved / target) * 100));
}

export function isOverdue(dueDate: Date | undefined, remainingAmount: number): boolean {
  if (!dueDate || remainingAmount <= 0) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
}

export function daysUntilDue(dueDate: Date | undefined): number | null {
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function formatDate(date: Date | string | undefined, format: 'short' | 'long' | 'relative' = 'short'): string {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';
  
  if (format === 'short') {
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  if (format === 'long') {
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
  return formatRelativeTime(d);
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`;
  }
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays <= 7) return `In ${diffDays} days`;
  return formatDate(date, 'short');
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'paid':
      return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
    case 'partially_paid':
      return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
    case 'overdue':
      return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
    case 'pending':
    default:
      return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'paid':
      return 'Paid';
    case 'partially_paid':
      return 'Partially Paid';
    case 'overdue':
      return 'Overdue';
    case 'pending':
    default:
      return 'Pending';
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'Personal':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
    case 'Family':
      return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
    case 'Friend':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Business':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    case 'Other':
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  }
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}