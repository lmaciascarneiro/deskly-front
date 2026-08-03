import { createContext, ReactNode, useContext, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { firebaseAuth, googleAuthProvider } from '@/firebase/firebase';
import { authService } from '@/services/auth.service';
import { tokenStorage } from '@/lib/token-storage';
import { AuthUser } from '@/types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(
    () => tokenStorage.get()?.user ?? null
  );
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const credential = await signInWithPopup(
        firebaseAuth,
        googleAuthProvider
      );
      const idToken = await credential.user.getIdToken();
      const session = await authService.authenticate(idToken);
      tokenStorage.save(session);
      setUser(session.user);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
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
      setUser(session.user);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
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
      setUser(session.user);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(firebaseAuth);
    tokenStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
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
