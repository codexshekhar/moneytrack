import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { LentTransaction, BorrowedTransaction, Repayment, SavingsGoal, Activity } from '@/types';

const COLLECTIONS = {
  LENT_MONEY: 'lentMoney',
  BORROWED_MONEY: 'borrowedMoney',
  REPAYMENTS: 'repayments',
  SAVINGS_GOALS: 'savingsGoals',
} as const;

function getUserCollectionRef(userId: string, collectionName: string) {
  return collection(db, 'users', userId, collectionName);
}

function convertTimestamps(data: DocumentData): DocumentData {
  const result: DocumentData = { ...data };
  for (const key of Object.keys(result)) {
    if (result[key] instanceof Timestamp) {
      result[key] = result[key].toDate();
    }
  }
  return result;
}

function serializeTransaction(transaction: Omit<LentTransaction, 'id' | 'createdAt' | 'updatedAt'>): DocumentData {
  return {
    ...transaction,
    date: Timestamp.fromDate(transaction.date),
    dueDate: transaction.dueDate ? Timestamp.fromDate(transaction.dueDate) : null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

function serializeBorrowedTransaction(transaction: Omit<BorrowedTransaction, 'id' | 'createdAt' | 'updatedAt'>): DocumentData {
  return {
    ...transaction,
    date: Timestamp.fromDate(transaction.date),
    dueDate: transaction.dueDate ? Timestamp.fromDate(transaction.dueDate) : null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

function serializeRepayment(repayment: Omit<Repayment, 'id' | 'createdAt'>): DocumentData {
  return {
    ...repayment,
    date: Timestamp.fromDate(repayment.date),
    createdAt: serverTimestamp(),
  };
}

function serializeSavingsGoal(goal: Omit<SavingsGoal, 'id' | 'createdAt' | 'updatedAt'>): DocumentData {
  return {
    ...goal,
    targetDate: goal.targetDate ? Timestamp.fromDate(goal.targetDate) : null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

function deserializeTransaction(doc: { id: string; data: () => DocumentData }): LentTransaction | BorrowedTransaction {
  const data = convertTimestamps(doc.data());
  return {
    id: doc.id,
    ...data,
    date: data.date instanceof Date ? data.date : new Date(data.date),
    dueDate: data.dueDate ? (data.dueDate instanceof Date ? data.dueDate : new Date(data.dueDate)) : undefined,
    createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
    updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt),
  } as LentTransaction | BorrowedTransaction;
}

function deserializeRepayment(doc: { id: string; data: () => DocumentData }): Repayment {
  const data = convertTimestamps(doc.data());
  return {
    id: doc.id,
    ...data,
    date: data.date instanceof Date ? data.date : new Date(data.date),
    createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
  } as Repayment;
}

function deserializeSavingsGoal(doc: { id: string; data: () => DocumentData }): SavingsGoal {
  const data = convertTimestamps(doc.data());
  return {
    id: doc.id,
    ...data,
    targetDate: data.targetDate ? (data.targetDate instanceof Date ? data.targetDate : new Date(data.targetDate)) : undefined,
    createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
    updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt),
  } as SavingsGoal;
}

function deserializeActivity(doc: { id: string; data: () => DocumentData }): Activity {
  const data = convertTimestamps(doc.data());
  return {
    id: doc.id,
    ...data,
    date: data.date instanceof Date ? data.date : new Date(data.date),
  } as Activity;
}

export const lentMoneyService = {
  async getAll(userId: string): Promise<LentTransaction[]> {
    const q = query(
      getUserCollectionRef(userId, COLLECTIONS.LENT_MONEY),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(deserializeTransaction) as LentTransaction[];
  },

  async getById(userId: string, id: string): Promise<LentTransaction | null> {
    const docRef = doc(getUserCollectionRef(userId, COLLECTIONS.LENT_MONEY), id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return deserializeTransaction(snapshot) as LentTransaction;
  },

  async create(userId: string, data: Omit<LentTransaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(getUserCollectionRef(userId, COLLECTIONS.LENT_MONEY), serializeTransaction(data));
    return docRef.id;
  },

  async update(userId: string, id: string, data: Partial<LentTransaction>): Promise<void> {
    const docRef = doc(getUserCollectionRef(userId, COLLECTIONS.LENT_MONEY), id);
    const updateData: DocumentData = { updatedAt: serverTimestamp() };
    
    for (const [key, value] of Object.entries(data)) {
      if (key === 'date' || key === 'dueDate') {
        updateData[key] = value ? Timestamp.fromDate(value as Date) : null;
      } else if (key !== 'id' && key !== 'userId' && key !== 'createdAt') {
        updateData[key] = value;
      }
    }
    
    await updateDoc(docRef, updateData);
  },

  async delete(userId: string, id: string): Promise<void> {
    const docRef = doc(getUserCollectionRef(userId, COLLECTIONS.LENT_MONEY), id);
    await deleteDoc(docRef);
  },
};

export const borrowedMoneyService = {
  async getAll(userId: string): Promise<BorrowedTransaction[]> {
    const q = query(
      getUserCollectionRef(userId, COLLECTIONS.BORROWED_MONEY),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(deserializeTransaction) as BorrowedTransaction[];
  },

  async getById(userId: string, id: string): Promise<BorrowedTransaction | null> {
    const docRef = doc(getUserCollectionRef(userId, COLLECTIONS.BORROWED_MONEY), id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return deserializeTransaction(snapshot) as BorrowedTransaction;
  },

  async create(userId: string, data: Omit<BorrowedTransaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(getUserCollectionRef(userId, COLLECTIONS.BORROWED_MONEY), serializeBorrowedTransaction(data));
    return docRef.id;
  },

  async update(userId: string, id: string, data: Partial<BorrowedTransaction>): Promise<void> {
    const docRef = doc(getUserCollectionRef(userId, COLLECTIONS.BORROWED_MONEY), id);
    const updateData: DocumentData = { updatedAt: serverTimestamp() };
    
    for (const [key, value] of Object.entries(data)) {
      if (key === 'date' || key === 'dueDate') {
        updateData[key] = value ? Timestamp.fromDate(value as Date) : null;
      } else if (key !== 'id' && key !== 'userId' && key !== 'createdAt') {
        updateData[key] = value;
      }
    }
    
    await updateDoc(docRef, updateData);
  },

  async delete(userId: string, id: string): Promise<void> {
    const docRef = doc(getUserCollectionRef(userId, COLLECTIONS.BORROWED_MONEY), id);
    await deleteDoc(docRef);
  },
};

export const repaymentService = {
  async getByTransaction(userId: string, transactionId: string, type: 'lent' | 'borrowed'): Promise<Repayment[]> {
    const q = query(
      getUserCollectionRef(userId, COLLECTIONS.REPAYMENTS),
      where('transactionId', '==', transactionId),
      where('transactionType', '==', type),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(deserializeRepayment);
  },

  async getAll(userId: string): Promise<Repayment[]> {
    const q = query(
      getUserCollectionRef(userId, COLLECTIONS.REPAYMENTS),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(deserializeRepayment);
  },

  async create(userId: string, data: Omit<Repayment, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(getUserCollectionRef(userId, COLLECTIONS.REPAYMENTS), serializeRepayment(data));
    return docRef.id;
  },

  async delete(userId: string, id: string): Promise<void> {
    const docRef = doc(getUserCollectionRef(userId, COLLECTIONS.REPAYMENTS), id);
    await deleteDoc(docRef);
  },
};

export const savingsGoalService = {
  async getAll(userId: string): Promise<SavingsGoal[]> {
    const q = query(
      getUserCollectionRef(userId, COLLECTIONS.SAVINGS_GOALS),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(deserializeSavingsGoal);
  },

  async getById(userId: string, id: string): Promise<SavingsGoal | null> {
    const docRef = doc(getUserCollectionRef(userId, COLLECTIONS.SAVINGS_GOALS), id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return deserializeSavingsGoal(snapshot);
  },

  async create(userId: string, data: Omit<SavingsGoal, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(getUserCollectionRef(userId, COLLECTIONS.SAVINGS_GOALS), serializeSavingsGoal(data));
    return docRef.id;
  },

  async update(userId: string, id: string, data: Partial<SavingsGoal>): Promise<void> {
    const docRef = doc(getUserCollectionRef(userId, COLLECTIONS.SAVINGS_GOALS), id);
    const updateData: DocumentData = { updatedAt: serverTimestamp() };
    
    for (const [key, value] of Object.entries(data)) {
      if (key === 'targetDate') {
        updateData[key] = value ? Timestamp.fromDate(value as Date) : null;
      } else if (key !== 'id' && key !== 'userId' && key !== 'createdAt') {
        updateData[key] = value;
      }
    }
    
    await updateDoc(docRef, updateData);
  },

  async delete(userId: string, id: string): Promise<void> {
    const docRef = doc(getUserCollectionRef(userId, COLLECTIONS.SAVINGS_GOALS), id);
    await deleteDoc(docRef);
  },
};