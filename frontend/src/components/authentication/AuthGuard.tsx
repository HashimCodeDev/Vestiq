// components/AuthGuard.tsx
import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSafeRouter } from '@/hooks/useSafeRouter';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useSafeRouter();

  useEffect(() => {
    if (!loading && user && router) {
      router.push('/'); // Redirect to home if already logged in
    }
  }, [user, loading, router]);

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If user is authenticated, return null (redirect will happen)
  if (user) {
    return null;
  }

  // If user is not authenticated, render the auth forms
  return children;
};

export default AuthGuard;
