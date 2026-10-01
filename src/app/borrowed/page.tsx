'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MoneyTable } from '@/components/money/MoneyTable';
import { BorrowedMoneyForm } from '@/components/money/BorrowedMoneyForm';
import { TransactionDetails } from '@/components/money/TransactionDetails';
import { RepaymentDialog } from '@/components/money/RepaymentDialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Plus, Search } from 'lucide-react';
import { borrowedMoneyService, repaymentService } from '@/lib/services/firestore';
import { toast } from 'sonner';
import type { BorrowedTransaction, FilterState, TransactionStatus } from '@/types';
import { formatINR, calculateRemaining, isOverdue } from '@/lib/utils/money';

export default function BorrowedPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<BorrowedTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterState>({ search: '', status: 'all', sort: 'newest' });
  const [formOpen, setFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<BorrowedTransaction | null>(null);
  const [viewTransaction, setViewTransaction] = useState<BorrowedTransaction | null>(null);
  const [repaymentOpen, setRepaymentOpen] = useState(false);
  const [repaymentTransaction, setRepaymentTransaction] = useState<BorrowedTransaction | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<BorrowedTransaction | null>(null);

  const handleFilterChange = (newFilter: Partial<FilterState>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const handleViewClose = () => setViewTransaction(null);
  const handleDeleteClose = () => setDeleteConfirm(null);
  const handleRepaymentClose = () => setRepaymentOpen(false);
  const handleFormClose = () => setFormOpen(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await borrowedMoneyService.getAll(user.uid);
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data: any) => {
    if (!user) return;
    try {
      const transactionData = {
        userId: user.uid,
        personName: data.personName,
        amount: data.amount,
        repaidAmount: 0,
        remainingAmount: data.amount,
        date: data.date,
        dueDate: data.dueDate || undefined,
        category: data.category,
        description: data.description,
        status: 'pending' as TransactionStatus,
      };
      await borrowedMoneyService.create(user.uid, transactionData);
      toast.success('Borrowed transaction added');
      fetchTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error('Failed to add transaction');
    }
  };

  const handleUpdate = async (data: any) => {
    if (!user || !editingTransaction) return;
    try {
      const remainingAmount = calculateRemaining(data.amount, editingTransaction.repaidAmount);
      let status: TransactionStatus = 'pending';
      if (remainingAmount === 0) status = 'paid';
      else if (editingTransaction.repaidAmount > 0) status = 'partially_paid';
      else if (isOverdue(data.dueDate, remainingAmount)) status = 'overdue';

      await borrowedMoneyService.update(user.uid, editingTransaction.id, {
        personName: data.personName,
        amount: data.amount,
        remainingAmount,
        date: data.date,
        dueDate: data.dueDate || undefined,
        category: data.category,
        description: data.description,
        status,
      });
      toast.success('Transaction updated');
      fetchTransactions();
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error('Failed to update transaction');
    }
  };

  const handleDelete = async () => {
    if (!user || !deleteConfirm) return;
    try {
      await borrowedMoneyService.delete(user.uid, deleteConfirm.id);
      toast.success('Transaction deleted');
      fetchTransactions();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to delete transaction');
    }
  };

  const handleRepayment = async (data: any) => {
    if (!user || !repaymentTransaction) return;
    try {
      const newRepaidAmount = repaymentTransaction.repaidAmount + data.amount;
      const newRemaining = calculateRemaining(repaymentTransaction.amount, newRepaidAmount);
      let status: TransactionStatus = 'pending';
      if (newRemaining === 0) status = 'paid';
      else status = 'partially_paid';

      await Promise.all([
        borrowedMoneyService.update(user.uid, repaymentTransaction.id, {
          repaidAmount: newRepaidAmount,
          remainingAmount: newRemaining,
          status,
        }),
        repaymentService.create(user.uid, {
          userId: user.uid,
          transactionId: repaymentTransaction.id,
          transactionType: 'borrowed',
          amount: data.amount,
          date: data.date,
          note: data.note,
        }),
      ]);
      toast.success('Payment recorded');
      fetchTransactions();
      setRepaymentOpen(false);
      setRepaymentTransaction(null);
    } catch (error) {
      console.error('Error recording payment:', error);
      toast.error('Failed to record payment');
    }
  };

  const totalBorrowed = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalRepaid = transactions.reduce((sum, t) => sum + t.repaidAmount, 0);
  const totalPending = transactions.reduce((sum, t) => sum + t.remainingAmount, 0);
  const activeCount = transactions.filter(t => t.remainingAmount > 0).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Money Borrowed</h1>
            <p className="text-muted-foreground">Keep track of what you owe.</p>
          </div>
          <Button onClick={() => { setEditingTransaction(null); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Borrowed Money
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Borrowed</p>
            <p className="text-3xl font-bold mt-1">{formatINR(totalBorrowed)}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Repaid</p>
            <p className="text-3xl font-bold mt-1 text-green-600">{formatINR(totalRepaid)}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Remaining</p>
            <p className="text-3xl font-bold mt-1 text-destructive">{formatINR(totalPending)}</p>
            <p className="text-sm text-muted-foreground mt-1">{activeCount} active</p>
          </div>
        </div>

        <MoneyTable
          data={transactions}
          type="borrowed"
          loading={loading}
          filter={filter}
          onFilterChange={handleFilterChange}
          onView={setViewTransaction}
          onEdit={(t) => { setEditingTransaction(t); setFormOpen(true); }}
          onDelete={setDeleteConfirm}
          onRecordRepayment={(t) => { setRepaymentTransaction(t); setRepaymentOpen(true); }}
        />

        <BorrowedMoneyForm
          open={formOpen}
          onOpenChange={handleFormClose}
          onSubmit={editingTransaction ? handleUpdate : handleAdd}
          defaultValues={editingTransaction || undefined}
          title={editingTransaction ? 'Edit Borrowed Money' : 'Add Borrowed Money'}
        />

        <TransactionDetails
          open={!!viewTransaction}
          onOpenChange={handleViewClose}
          transaction={viewTransaction}
          type="borrowed"
          onRecordRepayment={() => { setRepaymentTransaction(viewTransaction!); setRepaymentOpen(true); setViewTransaction(null); }}
          onEdit={() => { setEditingTransaction(viewTransaction!); setFormOpen(true); setViewTransaction(null); }}
          onDelete={() => { setDeleteConfirm(viewTransaction!); setViewTransaction(null); }}
        />

        <RepaymentDialog
          open={repaymentOpen}
          onOpenChange={handleRepaymentClose}
          onSubmit={handleRepayment}
          personName={repaymentTransaction?.personName || ''}
          totalAmount={repaymentTransaction?.amount || 0}
          paidAmount={repaymentTransaction?.repaidAmount || 0}
          remainingAmount={repaymentTransaction?.remainingAmount || 0}
          type="borrowed"
        />

        <ConfirmDialog
          open={!!deleteConfirm}
          onOpenChange={handleDeleteClose}
          title="Delete Transaction"
          description="Are you sure you want to delete this transaction? This action cannot be undone."
          confirmText="Delete"
          variant="destructive"
          onConfirm={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}