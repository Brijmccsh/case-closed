import { createContext, useContext, useMemo, type ReactNode } from 'react';

import type { TopicId } from '@/theme/tokens/topics';

import { KEYS, usePersistentState } from './storage';

export type User = {
  name: string;
  email: string;
  grade: number;
  state: string;
  topics: TopicId[];
};

type Session = { user: User | null; onboarded: boolean };

type SessionApi = Session & {
  ready: boolean;
  signUp: (u: Omit<User, 'topics'>) => void;
  setTopics: (topics: TopicId[]) => void;
  completeOnboarding: () => void;
  updateUser: (patch: Partial<User>) => void;
  logout: () => void;
};

const Ctx = createContext<SessionApi | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession, ready] = usePersistentState<Session>(KEYS.session, () => ({ user: null, onboarded: false }));

  const api = useMemo<SessionApi>(
    () => ({
      ...session,
      ready,
      signUp: (u) => setSession({ user: { ...u, topics: [] }, onboarded: false }),
      setTopics: (topics) => setSession((s) => (s.user ? { ...s, user: { ...s.user, topics } } : s)),
      completeOnboarding: () => setSession((s) => ({ ...s, onboarded: true })),
      updateUser: (patch) => setSession((s) => (s.user ? { ...s, user: { ...s.user, ...patch } } : s)),
      logout: () => setSession({ user: null, onboarded: false }),
    }),
    [session, ready, setSession],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useSession() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}
