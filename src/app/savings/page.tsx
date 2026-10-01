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

export default function SavingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (!user) return;
    fetchGoals();
  }, [user]);

  const fetchGoals = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await savingsGoalService.getAll(user.uid);
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast.error('Failed to load savings goals');
    } finally {
      setLoading(false);
    }
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
      fetchGoals();
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
      fetchGoals();
      setEditingGoal(null);
    } catch (error) {
      console.error('Error updating goal:', error);
      toast.error('Failed to update goal');
    }
  };

  const handleDelete = async () => {
    if (!user || !deleteConfirm) return;
    try {
      await savingsGoalService.delete(user.uid, deleteConfirm.id);
      toast.success('Goal deleted');
      fetchGoals();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.error('Failed to delete goal');
    }
  };

  const handleAddMoney = async (data: any) => {
    if (!user || !addMoneyGoal) return;
    try {
      const newSavedAmount = addMoneyGoal.savedAmount + data.amount;
      await savingsGoalService.update(user.uid, addMoneyGoal.id, {
        savedAmount: newSavedAmount,
      });
      toast.success('Savings added');
      fetchGoals();
      setAddMoneyOpen(false);
      setAddMoneyGoal(null);
    } catch (error) {
      console.error('Error adding savings:', error);
      toast.error('Failed to add savings');
    }
  };

  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const activeGoals = goals.filter(g => g.savedAmount < g.targetAmount).length;
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
            <p className="text-muted-foreground">Turn your plans into targets.</p>
          </div>
          <Button onClick={() => { setEditingGoal(null); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Create Goal
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Saved</p>
            <p className="text-3xl font-bold mt-1">{formatINR(totalSaved)}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Target</p>
            <p className="text-3xl font-bold mt-1">{formatINR(totalTarget)}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
            <p className="text-3xl font-bold mt-1">{activeGoals}</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <p className="text-3xl font-bold mt-1 text-green-600">{completedGoals}</p>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card p-6 animate-pulse">
                <div className="h-6 w-1/2 bg-muted rounded mb-4" />
                <div className="h-4 w-full bg-muted rounded mb-2" />
                <div className="h-4 w-3/4 bg-muted rounded mb-4" />
                <div className="h-2 w-full bg-muted rounded mb-4" />
                <div className="h-4 w-1/3 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : goals.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center">
            <Target className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No savings goals yet</h3>
            <p className="mt-2 text-muted-foreground">Create your first financial target.</p>
            <Button className="mt-4" onClick={() => setFormOpen(true)}>
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