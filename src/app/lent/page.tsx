'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MoneyTable } from '@/components/money/MoneyTable';
import { LentMoneyForm } from '@/components/money/LentMoneyForm';
import { TransactionDetails } from '@/components/money/TransactionDetails';
import { RepaymentDialog } from '@/components/money/RepaymentDialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Plus, Search } from 'lucide-react';
import { lentMoneyService, repaymentService } from '@/lib/services/firestore';
import { toast } from 'sonner';
import type { LentTransaction, FilterState, TransactionStatus } from '@/types';
import { formatINR, calculateRemaining, isOverdue } from '@/lib/utils/money';

export default function LentPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<LentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterState>({ search: '', status: 'all', sort: 'newest' });
  const [formOpen, setFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<LentTransaction | null>(null);
  const [viewTransaction, setViewTransaction] = useState<LentTransaction | null>(null);
  const [repaymentOpen, setRepaymentOpen] = useState(false);
  const [repaymentTransaction, setRepaymentTransaction] = useState<LentTransaction | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<LentTransaction | null>(null);

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
      const data = await lentMoneyService.getAll(user.uid);
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
        paidAmount: 0,
        remainingAmount: data.amount,
        date: data.date,
        dueDate: data.dueDate || undefined,
        category: data.category,
        description: data.description,
        status: 'pending' as TransactionStatus,
      };
      await lentMoneyService.create(user.uid, transactionData);
      toast.success('Lent transaction added');
      fetchTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error('Failed to add transaction');
    }
  };

  const handleUpdate = async (data: any) => {
    if (!user || !editingTransaction) return;
    try {
      const remainingAmount = calculateRemaining(data.amount, editingTransaction.paidAmount);
      let status: TransactionStatus = 'pending';
      if (remainingAmount === 0) status = 'paid';
      else if (editingTransaction.paidAmount > 0) status = 'partially_paid';
      else if (isOverdue(data.dueDate, remainingAmount)) status = 'overdue';

      await lentMoneyService.update(user.uid, editingTransaction.id, {
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
      await lentMoneyService.delete(user.uid, deleteConfirm.id);
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
      const newPaidAmount = repaymentTransaction.paidAmount + data.amount;
      const newRemaining = calculateRemaining(repaymentTransaction.amount, newPaidAmount);
      let status: TransactionStatus = 'pending';
      if (newRemaining === 0) status = 'paid';
      else status = 'partially_paid';

      await Promise.all([
        lentMoneyService.update(user.uid, repaymentTransaction.id, {
          paidAmount: newPaidAmount,
          remainingAmount: newRemaining,
          status,
        }),
        repaymentService.create(user.uid, {
          userId: user.uid,
          transactionId: repaymentTransaction.id,
          transactionType: 'lent',
          amount: data.amount,
          date: data.date,
          note: data.note,
        }),
      ]);
      toast.success('Repayment recorded');
      fetchTransactions();
      setRepaymentOpen(false);
      setRepaymentTransaction(null);
    } catch (error) {
      console.error('Error recording repayment:', error);
      toast.error('Failed to record repayment');
    }
  };

  const totalLent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalReceived = transactions.reduce((sum, t) => sum + t.paidAmount, 0);
  const totalPending = transactions.reduce((sum, t) => sum + t.remainingAmount, 0);
  const activeCount = transactions.filter(t => t.remainingAmount > 0).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Money Lent</h1>
            <p className="text-muted-foreground">Money people owe you.</p>
          </div>
          <Button onClick={() => { setEditingTransaction(null); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Lent Money
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Lent</p>
            <p className="text-3xl font-bold mt-1">{formatINR(totalLent)}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Received</p>
            <p className="text-3xl font-bold mt-1 text-green-600">{formatINR(totalReceived)}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <p className="text-3xl font-bold mt-1 text-destructive">{formatINR(totalPending)}</p>
            <p className="text-sm text-muted-foreground mt-1">{activeCount} active</p>
          </div>
        </div>

        <MoneyTable
          data={transactions}
          type="lent"
          loading={loading}
          filter={filter}
          onFilterChange={handleFilterChange}
          onView={setViewTransaction}
          onEdit={(t) => { setEditingTransaction(t); setFormOpen(true); }}
          onDelete={setDeleteConfirm}
          onRecordRepayment={(t) => { setRepaymentTransaction(t); setRepaymentOpen(true); }}
        />

        <LentMoneyForm
          open={formOpen}
          onOpenChange={handleFormClose}
          onSubmit={editingTransaction ? handleUpdate : handleAdd}
          defaultValues={editingTransaction || undefined}
          title={editingTransaction ? 'Edit Lent Money' : 'Add Lent Money'}
        />

        <TransactionDetails
          open={!!viewTransaction}
          onOpenChange={handleViewClose}
          transaction={viewTransaction}
          type="lent"
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
          paidAmount={repaymentTransaction?.paidAmount || 0}
          remainingAmount={repaymentTransaction?.remainingAmount || 0}
          type="lent"
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