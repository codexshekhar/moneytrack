'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GoalCard } from '@/components/savings/GoalCard';
import { SavingsGoalForm } from '@/components/savings/SavingsGoalForm';
import { AddSavingsDialog } from '@/components/savings/AddSavingsDialog';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Plus, Target } from 'lucide-react';
import { savingsGoalService } from '@/lib/services/firestore';
import { toast } from 'sonner';
import type { SavingsGoal } from '@/types';
import { formatINR } from '@/lib/utils/money';
import { useSavingsGoals } from '@/hooks/useDashboardData';
import { useQueryClient } from '@tanstack/react-query';

export default function SavingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: goals = [], isLoading, error, refetch } = useSavingsGoals();
  
  const [formOpen, setFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [addMoneyGoal, setAddMoneyGoal] = useState<SavingsGoal | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<SavingsGoal | null>(null);

  const handleFormClose = () => setFormOpen(false);
  const handleAddMoneyClose = () => setAddMoneyOpen(false);
  const handleDeleteClose = () => setDeleteConfirm(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const invalidateAndRefetch = async () => {
    await queryClient.invalidateQueries({ queryKey: ['savingsGoals', user?.uid] });
    await queryClient.invalidateQueries({ queryKey: ['dashboard', user?.uid] });
  };

  const handleAdd = async (data: any) => {
    if (!user) return;
    try {
      const goalData = {
        userId: user.uid,
        name: data.name,
        targetAmount: data.targetAmount,
        savedAmount: data.savedAmount || 0,
        targetDate: data.targetDate || undefined,
        description: data.description,
      };
      await savingsGoalService.create(user.uid, goalData);
      toast.success('Savings goal created');
      await invalidateAndRefetch();
    } catch (error) {
      console.error('Error creating goal:', error);
      toast.error('Failed to create goal');
    }
  };

  const handleUpdate = async (data: any) => {
    if (!user || !editingGoal) return;
    try {
      await savingsGoalService.update(user.uid, editingGoal.id, {
        name: data.name,
        targetAmount: data.targetAmount,
        savedAmount: data.savedAmount,
        targetDate: data.targetDate || undefined,
        description: data.description,
      });
      toast.success('Goal updated');
      await invalidateAndRefetch();
      setEditingGoal(null);
    } catch (error) {
      console.error('Error updating goal:', error);
      toast.error('Failed to update goal');
    }
  };

  const handleAddMoney = async (data: any) => {
    if (!user || !addMoneyGoal) return;
    try {
      const newSavedAmount = addMoneyGoal.savedAmount + data.amount;
      await savingsGoalService.update(user.uid, addMoneyGoal.id, {
        savedAmount: newSavedAmount,
      });
      toast.success('Money added to goal');
      await invalidateAndRefetch();
      setAddMoneyOpen(false);
      setAddMoneyGoal(null);
    } catch (error) {
      console.error('Error adding money to goal:', error);
      toast.error('Failed to add money');
    }
  };

  const handleDelete = async () => {
    if (!user || !deleteConfirm) return;
    try {
      await savingsGoalService.delete(user.uid, deleteConfirm.id);
      toast.success('Goal deleted');
      await invalidateAndRefetch();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.error('Failed to delete goal');
    }
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-lg border" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) return null;

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-destructive mb-4">Failed to load savings goals</p>
          <button onClick={() => refetch()} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
            <p className="text-muted-foreground">Track your progress towards financial targets.</p>
          </div>
          <Button onClick={() => { setEditingGoal(null); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create Goal
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Saved</p>
            <p className="text-3xl font-bold mt-1">{formatINR(totalSaved)}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Target</p>
            <p className="text-3xl font-bold mt-1">{formatINR(totalTarget)}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Progress</p>
            <p className="text-3xl font-bold mt-1">{totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0}%</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
            <p className="text-3xl font-bold mt-1">{goals.length}</p>
          </div>
        </div>

        {goals.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center">
            <Target className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No savings goals yet</h3>
            <p className="text-muted-foreground mt-1">Create your first goal to start saving</p>
            <Button className="mt-4" onClick={() => { setEditingGoal(null); setFormOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Create Goal
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onAddMoney={() => { setAddMoneyGoal(goal); setAddMoneyOpen(true); }}
                onEdit={() => { setEditingGoal(goal); setFormOpen(true); }}
                onDelete={() => setDeleteConfirm(goal)}
                onView={() => {}}
              />
            ))}
          </div>
        )}

        <SavingsGoalForm
          open={formOpen}
          onOpenChange={handleFormClose}
          onSubmit={editingGoal ? handleUpdate : handleAdd}
          defaultValues={editingGoal || undefined}
          title={editingGoal ? 'Edit Savings Goal' : 'Create Savings Goal'}
        />

        <AddSavingsDialog
          open={addMoneyOpen}
          onOpenChange={handleAddMoneyClose}
          onSubmit={handleAddMoney}
          goalName={addMoneyGoal?.name || ''}
          currentAmount={addMoneyGoal?.savedAmount || 0}
          targetAmount={addMoneyGoal?.targetAmount || 0}
        />

        <ConfirmDialog
          open={!!deleteConfirm}
          onOpenChange={handleDeleteClose}
          title="Delete Goal"
          description="Are you sure you want to delete this savings goal? This action cannot be undone."
          confirmText="Delete"
          variant="destructive"
          onConfirm={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}