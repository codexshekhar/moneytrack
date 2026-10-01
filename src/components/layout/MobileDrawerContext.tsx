'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MobileDrawerContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const MobileDrawerContext = createContext<MobileDrawerContextType | undefined>(undefined);

export function MobileDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileDrawerContext.Provider value={{
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen(prev => !prev),
    }}>
      {children}
    </MobileDrawerContext.Provider>
  );
}

export function useMobileDrawer() {
  const context = useContext(MobileDrawerContext);
  if (context === undefined) {
    throw new Error('useMobileDrawer must be used within a MobileDrawerProvider');
  }
  return context;
}