'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { borrowedTransactionSchema, type BorrowedTransactionForm } from '@/lib/validations/schemas';
import { cn } from '@/lib/utils/money';

interface BorrowedMoneyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BorrowedTransactionForm) => Promise<void>;
  defaultValues?: Partial<BorrowedTransactionForm>;
  loading?: boolean;
  title?: string;
}

function toDateInputValue(date: Date | null | undefined): string {
  return date ? format(date, 'yyyy-MM-dd') : '';
}

export function BorrowedMoneyForm({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  loading = false,
  title = 'Add Borrowed Money',
}: BorrowedMoneyFormProps) {
  const form = useForm<BorrowedTransactionForm>({
    resolver: zodResolver(borrowedTransactionSchema),
    defaultValues: {
      personName: '',
      amount: 0,
      date: new Date(),
      dueDate: undefined,
      category: 'Friend',
      description: '',
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (open && defaultValues) {
      form.reset({
        personName: defaultValues.personName || '',
        amount: defaultValues.amount || 0,
        date: defaultValues.date ? new Date(defaultValues.date) : new Date(),
        dueDate: defaultValues.dueDate ? new Date(defaultValues.dueDate) : undefined,
        category: defaultValues.category || 'Friend',
        description: defaultValues.description || '',
      });
    } else if (open) {
      form.reset({
        personName: '',
        amount: 0,
        date: new Date(),
        dueDate: undefined,
        category: 'Friend',
        description: '',
      });
    }
  }, [open, defaultValues, form]);

  const handleSubmit = async (data: BorrowedTransactionForm) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {defaultValues?.personName ? 'Update the borrowed money details' : 'Enter the details of money you borrowed'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personName">Lender Name *</Label>
            <Input
              id="personName"
              placeholder="Enter lender's name"
              {...form.register('personName')}
            />
            {form.formState.errors.personName && (
              <p className="text-sm text-destructive">{form.formState.errors.personName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹) *</Label>
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
            <Label htmlFor="date">Date Borrowed *</Label>
            <Input
              id="date"
              type="date"
              value={toDateInputValue(form.watch('date'))}
              onChange={(e) => form.setValue('date', e.target.value ? new Date(e.target.value) : new Date())}
              onBlur={() => form.trigger('date')}
            />
            {form.formState.errors.date && (
              <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date (Optional)</Label>
            <Input
              id="dueDate"
              type="date"
              value={toDateInputValue(form.watch('dueDate'))}
              onChange={(e) => form.setValue('dueDate', e.target.value ? new Date(e.target.value) : undefined)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => form.setValue('category', value as BorrowedTransactionForm['category'])}
              defaultValue={form.getValues('category') || 'Friend'}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Family">Family</SelectItem>
                <SelectItem value="Friend">Friend</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a note..."
              rows={3}
              {...form.register('description')}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {defaultValues?.personName ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}