'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { 
  lentMoneyService, 
  borrowedMoneyService, 
  repaymentService, 
  savingsGoalService 
} from '@/lib/services/firestore';
import type { LentTransaction, BorrowedTransaction, Repayment, SavingsGoal, DashboardStats, UpcomingDue, Activity } from '@/types';
import { formatINR, isOverdue, daysUntilDue, calculateRemaining } from '@/lib/utils/money';

interface DashboardData {
  stats: DashboardStats;
  activities: Activity[];
  dues: UpcomingDue[];
  savings: SavingsGoal[];
}

async function fetchDashboardData(userId: string): Promise<DashboardData> {
  const [lent, borrowed, repayments, savings] = await Promise.all([
    lentMoneyService.getAll(userId),
    borrowedMoneyService.getAll(userId),
    repaymentService.getAll(userId),
    savingsGoalService.getAll(userId),
  ]);

  const totalLent = lent.reduce((sum, t) => sum + t.amount, 0);
  const totalReceived = lent.reduce((sum, t) => sum + t.paidAmount, 0);
  const totalPendingLent = lent.reduce((sum, t) => sum + t.remainingAmount, 0);
  
  const totalBorrowed = borrowed.reduce((sum, t) => sum + t.amount, 0);
  const totalRepaid = borrowed.reduce((sum, t) => sum + t.repaidAmount, 0);
  const totalPendingBorrowed = borrowed.reduce((sum, t) => sum + t.remainingAmount, 0);
  
  const totalSaved = savings.reduce((sum, g) => sum + g.savedAmount, 0);
  const netPosition = totalPendingLent - totalPendingBorrowed;

  const activities: Activity[] = [
    ...lent.slice(0, 5).map(t => ({ id: t.id, userId, type: 'lent' as const, personName: t.personName, amount: t.amount, date: t.date, description: t.description })),
    ...borrowed.slice(0, 5).map(t => ({ id: t.id, userId, type: 'borrowed' as const, personName: t.personName, amount: t.amount, date: t.date, description: t.description })),
    ...savings.slice(0, 5).map(g => ({ id: g.id, userId, type: 'savings' as const, goalName: g.name, amount: g.savedAmount, date: g.createdAt })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  const dues: UpcomingDue[] = [
    ...lent.filter(t => t.remainingAmount > 0 && t.dueDate).map(t => ({ 
      id: t.id, 
      type: 'lent' as const, 
      personName: t.personName, 
      amount: t.remainingAmount, 
      dueDate: t.dueDate!, 
      daysUntilDue: daysUntilDue(t.dueDate!) ?? 0 
    })),
    ...borrowed.filter(t => t.remainingAmount > 0 && t.dueDate).map(t => ({ 
      id: t.id, 
      type: 'borrowed' as const, 
      personName: t.personName, 
      amount: t.remainingAmount, 
      dueDate: t.dueDate!, 
      daysUntilDue: daysUntilDue(t.dueDate!) ?? 0 
    })),
  ].sort((a, b) => a.daysUntilDue - b.daysUntilDue).slice(0, 5);

  const stats: DashboardStats = {
    totalLent,
    totalReceived,
    totalPendingLent,
    totalBorrowed,
    totalRepaid,
    totalPendingBorrowed,
    netPosition,
    totalSaved,
  };

  return { stats, activities, dues, savings };
}

export function useDashboardData() {
  const { user } = useAuth();
  
  return useQuery<DashboardData>({
    queryKey: ['dashboard', user?.uid],
    queryFn: () => fetchDashboardData(user!.uid),
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useLentTransactions() {
  const { user } = useAuth();
  
  return useQuery<LentTransaction[]>({
    queryKey: ['lentTransactions', user?.uid],
    queryFn: () => lentMoneyService.getAll(user!.uid),
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
  });
}

export function useBorrowedTransactions() {
  const { user } = useAuth();
  
  return useQuery<BorrowedTransaction[]>({
    queryKey: ['borrowedTransactions', user?.uid],
    queryFn: () => borrowedMoneyService.getAll(user!.uid),
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSavingsGoals() {
  const { user } = useAuth();
  
  return useQuery<SavingsGoal[]>({
    queryKey: ['savingsGoals', user?.uid],
    queryFn: () => savingsGoalService.getAll(user!.uid),
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
  });
}

export function useRepayments() {
  const { user } = useAuth();
  
  return useQuery<Repayment[]>({
    queryKey: ['repayments', user?.uid],
    queryFn: () => repaymentService.getAll(user!.uid),
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
  });
}