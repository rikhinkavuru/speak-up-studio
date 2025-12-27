import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Kid {
  id: string;
  name: string;
  age: number;
  avatar: string;
  points: number;
  lessonsCompleted: number;
  totalLessons: number;
  streak: number;
  lastActive: string;
  badges: string[];
  goals: string[];
}

interface Parent {
  id: string;
  name: string;
  email: string;
}

interface AppContextType {
  isParentLoggedIn: boolean;
  isKidLoggedIn: boolean;
  currentParent: Parent | null;
  currentKid: Kid | null;
  kids: Kid[];
  setIsParentLoggedIn: (value: boolean) => void;
  setIsKidLoggedIn: (value: boolean) => void;
  setCurrentParent: (parent: Parent | null) => void;
  setCurrentKid: (kid: Kid | null) => void;
  setKids: (kids: Kid[]) => void;
  addKid: (kid: Kid) => void;
  updateKid: (kidId: string, updates: Partial<Kid>) => void;
  loginAsKid: (kid: Kid) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample data
const sampleKids: Kid[] = [
  {
    id: '1',
    name: 'Emma',
    age: 8,
    avatar: '🦁',
    points: 250,
    lessonsCompleted: 3,
    totalLessons: 10,
    streak: 3,
    lastActive: '2 hours ago',
    badges: ['voice-explorer', 'inspiration-seeker'],
    goals: ['Building confidence', 'Understanding their voice'],
  },
  {
    id: '2',
    name: 'Jake',
    age: 10,
    avatar: '🐼',
    points: 50,
    lessonsCompleted: 1,
    totalLessons: 10,
    streak: 1,
    lastActive: 'Yesterday',
    badges: ['voice-explorer'],
    goals: ['Speaking practice', 'Learning from role models'],
  },
];

const sampleParent: Parent = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [isParentLoggedIn, setIsParentLoggedIn] = useState(false);
  const [isKidLoggedIn, setIsKidLoggedIn] = useState(false);
  const [currentParent, setCurrentParent] = useState<Parent | null>(null);
  const [currentKid, setCurrentKid] = useState<Kid | null>(null);
  const [kids, setKids] = useState<Kid[]>(sampleKids);

  const addKid = (kid: Kid) => {
    setKids((prev) => [...prev, kid]);
  };

  const updateKid = (kidId: string, updates: Partial<Kid>) => {
    setKids((prev) =>
      prev.map((kid) => (kid.id === kidId ? { ...kid, ...updates } : kid))
    );
    if (currentKid?.id === kidId) {
      setCurrentKid((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const loginAsKid = (kid: Kid) => {
    setCurrentKid(kid);
    setIsKidLoggedIn(true);
  };

  const logout = () => {
    setIsParentLoggedIn(false);
    setIsKidLoggedIn(false);
    setCurrentParent(null);
    setCurrentKid(null);
  };

  // Demo login helper
  React.useEffect(() => {
    if (isParentLoggedIn && !currentParent) {
      setCurrentParent(sampleParent);
    }
  }, [isParentLoggedIn, currentParent]);

  return (
    <AppContext.Provider
      value={{
        isParentLoggedIn,
        isKidLoggedIn,
        currentParent,
        currentKid,
        kids,
        setIsParentLoggedIn,
        setIsKidLoggedIn,
        setCurrentParent,
        setCurrentKid,
        setKids,
        addKid,
        updateKid,
        loginAsKid,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
