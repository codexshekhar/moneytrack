export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Date;
}

export interface BaseTransaction {
  id: string;
  userId: string;
  personName: string;
  amount: number;
  date: Date;
  dueDate?: Date;
  category: TransactionCategory;
  description?: string;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface LentTransaction extends BaseTransaction {
  paidAmount: number;
  remainingAmount: number;
}

export interface BorrowedTransaction extends BaseTransaction {
  repaidAmount: number;
  remainingAmount: number;
}

export type TransactionCategory = 'Personal' | 'Family' | 'Friend' | 'Business' | 'Other';
export type TransactionStatus = 'pending' | 'partially_paid' | 'paid' | 'overdue';

export interface Repayment {
  id: string;
  userId: string;
  transactionId: string;
  transactionType: 'lent' | 'borrowed';
  amount: number;
  date: Date;
  note?: string;
  createdAt: Date;
}

export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  targetDate?: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'lent' | 'borrowed' | 'repayment' | 'savings';
  personName?: string;
  goalName?: string;
  amount: number;
  date: Date;
  description?: string;
}

export interface DashboardStats {
  totalLent: number;
  totalReceived: number;
  totalPendingLent: number;
  totalBorrowed: number;
  totalRepaid: number;
  totalPendingBorrowed: number;
  netPosition: number;
  totalSaved: number;
}

export interface UpcomingDue {
  id: string;
  type: 'lent' | 'borrowed';
  personName: string;
  amount: number;
  dueDate: Date;
  daysUntilDue: number;
}

export interface MoneyFormatOptions {
  showSymbol?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export type FilterStatus = 'all' | 'pending' | 'partially_paid' | 'paid' | 'overdue';
export type SortOption = 'newest' | 'oldest' | 'highest_amount' | 'lowest_amount' | 'due_date';

export interface FilterState {
  search: string;
  status: FilterStatus;
  sort: SortOption;
}