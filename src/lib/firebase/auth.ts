import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export const firebaseAuth = {
  signOut: () => signOut(auth),
};