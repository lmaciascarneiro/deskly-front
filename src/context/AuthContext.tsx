import { createContext, ReactNode, useContext, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { firebaseAuth, googleAuthProvider } from '@/firebase/firebase';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { tokenStorage } from '@/lib/token-storage';
import { ActiveRole, roleStorage } from '@/lib/role-storage';
import { AuthUser } from '@/types/auth';

const NEW_ACCOUNT_THRESHOLD_MS = 5 * 60 * 1000;

const isNewFirebaseAccount = (firebaseUser: FirebaseUser): boolean => {
  const { creationTime } = firebaseUser.metadata;
  if (!creationTime) return false;
  return Date.now() - new Date(creationTime).getTime() < NEW_ACCOUNT_THRESHOLD_MS;
};

interface AuthResult {
  isNewAccount: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  activeRole: ActiveRole;
  setActiveRole: (role: ActiveRole) => void;
  signInWithGoogle: () => Promise<AuthResult>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResult>;
  signUpWithEmail: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<AuthUser | null>(
    () => tokenStorage.get()?.user ?? null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRoleState] = useState<ActiveRole>(() => {
    const initialUser = tokenStorage.get()?.user ?? null;
    return initialUser?.isHost ? roleStorage.get() : 'guest';
  });

  const setActiveRole = (role: ActiveRole) => {
    const nextRole = role === 'host' && user?.isHost ? 'host' : 'guest';
    setActiveRoleState(nextRole);
    roleStorage.set(nextRole);
  };

  const setUser = (nextUser: AuthUser) => {
    setUserState(nextUser);
    tokenStorage.updateUser(nextUser);
    if (!nextUser.isHost && activeRole === 'host') {
      setActiveRole('guest');
    }
  };

  const signInWithGoogle = async (): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const credential = await signInWithPopup(
        firebaseAuth,
        googleAuthProvider
      );
      const idToken = await credential.user.getIdToken();
      const session = await authService.authenticate(idToken);
      tokenStorage.save(session);
      setUserState(session.user);
      return { isNewAccount: isNewFirebaseAccount(credential.user) };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const idToken = await credential.user.getIdToken();
      const session = await authService.authenticate(idToken);
      tokenStorage.save(session);
      setUserState(session.user);
      return { isNewAccount: isNewFirebaseAccount(credential.user) };
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const idToken = await credential.user.getIdToken();
      const session = await authService.authenticate(idToken);
      tokenStorage.save(session);
      setUserState(session.user);
      return { isNewAccount: true };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(firebaseAuth);
    tokenStorage.clear();
    roleStorage.clear();
    setUserState(null);
    setActiveRoleState('guest');
  };

  const refreshUser = async () => {
    const freshUser = await userService.getMe();
    setUser(freshUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        activeRole,
        setActiveRole,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        refreshUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
