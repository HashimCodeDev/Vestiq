'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        // Get the Firebase ID token
        const idToken = await user.getIdToken();
        setToken(idToken);

        // Send token to your backend for verification and user creation
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              userId: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            }),
          });
        } catch (error) {
          console.error('Error verifying user with backend:', error);
          router.push('/login');
        }
      } else {
        setToken(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [router]);

  // Refresh token every 50 minutes (tokens expire after 1 hour)
  useEffect(() => {
    if (user) {
      const interval = setInterval(
        async () => {
          try {
            const newToken = await user.getIdToken(true); // Force refresh
            setToken(newToken);
          } catch (error) {
            console.error('Error refreshing token:', error);
          }
        },
        50 * 60 * 1000,
      ); // 50 minutes

      return () => clearInterval(interval);
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      await signInWithPopup(auth, provider);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    token,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
