'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { savingsGoalSchema, type SavingsGoalForm } from '@/lib/validations/schemas';
import { cn } from '@/lib/utils/money';

interface SavingsGoalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SavingsGoalForm) => Promise<void>;
  defaultValues?: Partial<SavingsGoalForm>;
  loading?: boolean;
  title?: string;
}

function toDateInputValue(date: Date | null | undefined): string {
  return date ? format(date, 'yyyy-MM-dd') : '';
}

export function SavingsGoalForm({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  loading = false,
  title = 'Create Savings Goal',
}: SavingsGoalFormProps) {
  const form = useForm<SavingsGoalForm>({
    resolver: zodResolver(savingsGoalSchema),
    defaultValues: {
      name: '',
      targetAmount: 0,
      savedAmount: 0,
      targetDate: undefined,
      description: '',
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (open && defaultValues) {
      form.reset({
        name: defaultValues.name || '',
        targetAmount: defaultValues.targetAmount || 0,
        savedAmount: defaultValues.savedAmount ?? 0,
        targetDate: defaultValues.targetDate ? new Date(defaultValues.targetDate) : undefined,
        description: defaultValues.description || '',
      });
    } else if (open) {
      form.reset({
        name: '',
        targetAmount: 0,
        savedAmount: 0,
        targetDate: undefined,
        description: '',
      });
    }
  }, [open, defaultValues, form]);

  const handleSubmit = async (data: SavingsGoalForm) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {defaultValues?.name ? 'Update the savings goal' : 'Create a new savings target'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Goal Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Emergency Fund, Vacation, New Laptop"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount (₹) *</Label>
            <Input
              id="targetAmount"
              type="number"
              placeholder="0"
              min="1"
              step="1"
              {...form.register('targetAmount', { valueAsNumber: true })}
            />
            {form.formState.errors.targetAmount && (
              <p className="text-sm text-destructive">{form.formState.errors.targetAmount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="savedAmount">Current Saved Amount (₹)</Label>
            <Input
              id="savedAmount"
              type="number"
              placeholder="0"
              min="0"
              step="1"
              {...form.register('savedAmount', { valueAsNumber: true })}
            />
            {form.formState.errors.savedAmount && (
              <p className="text-sm text-destructive">{form.formState.errors.savedAmount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetDate">Target Date (Optional)</Label>
            <Input
              id="targetDate"
              type="date"
              value={toDateInputValue(form.watch('targetDate'))}
              onChange={(e) => form.setValue('targetDate', e.target.value ? new Date(e.target.value) : undefined)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="What are you saving for?"
              rows={3}
              {...form.register('description')}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {defaultValues?.name ? 'Update' : 'Create Goal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}