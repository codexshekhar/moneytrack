import { z } from 'zod';

export const lentTransactionSchema = z.object({
  personName: z.string().min(1, 'Person name is required').max(100),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  date: z.date({ message: 'Date is required' }),
  dueDate: z.date().optional().nullable(),
  category: z.enum(['Personal', 'Family', 'Friend', 'Business', 'Other']),
  description: z.string().max(500).optional(),
});

export const borrowedTransactionSchema = z.object({
  personName: z.string().min(1, 'Lender name is required').max(100),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  date: z.date({ message: 'Date is required' }),
  dueDate: z.date().optional().nullable(),
  category: z.enum(['Personal', 'Family', 'Friend', 'Business', 'Other']),
  description: z.string().max(500).optional(),
});

export const repaymentSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  date: z.date({ message: 'Date is required' }),
  note: z.string().max(500).optional(),
});

export const savingsGoalSchema = z.object({
  name: z.string().min(1, 'Goal name is required').max(100),
  targetAmount: z.number().min(1, 'Target amount must be greater than 0'),
  savedAmount: z.number().min(0, 'Saved amount cannot be negative'),
  targetDate: z.date().optional().nullable(),
  description: z.string().max(500).optional(),
});

export const addSavingsSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  date: z.date({ message: 'Date is required' }),
  note: z.string().max(500).optional(),
});

export type LentTransactionForm = z.infer<typeof lentTransactionSchema>;
export type BorrowedTransactionForm = z.infer<typeof borrowedTransactionSchema>;
export type RepaymentForm = z.infer<typeof repaymentSchema>;
export type SavingsGoalForm = z.infer<typeof savingsGoalSchema>;
export type AddSavingsForm = z.infer<typeof addSavingsSchema>;