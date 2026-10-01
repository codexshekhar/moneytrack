'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { addSavingsSchema, type AddSavingsForm } from '@/lib/validations/schemas';
import { formatINR } from '@/lib/utils/money';

interface AddSavingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AddSavingsForm) => Promise<void>;
  goalName: string;
  currentAmount: number;
  targetAmount: number;
  loading?: boolean;
}

function toDateInputValue(date: Date | null | undefined): string {
  return date ? format(date, 'yyyy-MM-dd') : '';
}

export function AddSavingsDialog({
  open,
  onOpenChange,
  onSubmit,
  goalName,
  currentAmount,
  targetAmount,
  loading = false,
}: AddSavingsDialogProps) {
  const form = useForm<AddSavingsForm>({
    resolver: zodResolver(addSavingsSchema),
    defaultValues: {
      amount: 0,
      date: new Date(),
      note: '',
    },
  });

  const newTotal = currentAmount + form.watch('amount');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add to {goalName}</DialogTitle>
          <DialogDescription>Add money to your savings goal</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Current Amount</Label>
            <Input value={formatINR(currentAmount)} readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount to Add (₹) *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              min="1"
              step="1"
              {...form.register('amount', { valueAsNumber: true })}
            />
            {form.formState.errors.amount && (
              <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>New Total</Label>
            <Input
              value={formatINR(newTotal)}
              readOnly
              className="font-semibold text-primary"
            />
            <p className="text-sm text-muted-foreground">
              {Math.round((newTotal / targetAmount) * 100)}% of target
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={toDateInputValue(form.watch('date'))}
              onChange={(e) => form.setValue('date', e.target.value ? new Date(e.target.value) : new Date())}
              onBlur={() => form.trigger('date')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              placeholder="Add a note..."
              {...form.register('note')}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Add Money
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}