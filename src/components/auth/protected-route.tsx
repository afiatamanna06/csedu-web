import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/contexts/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate({ to: '/login/student' as string });
        return;
      }

      if (!allowedRoles.includes(currentUser.role.toLowerCase())) {
        // Redirect to appropriate dashboard based on role
        switch (currentUser.role.toLowerCase()) {
          case 'student':
            navigate({ to: '/dashboard/student' as string });
            break;
          case 'faculty':
            navigate({ to: '/dashboard/faculty' as string });
            break;
          case 'admin':
            navigate({ to: '/dashboard/admin' as string });
            break;
          case 'alumni':
            navigate({ to: '/dashboard/alumni' as string });
            break;
          default:
            navigate({ to: '/' });
        }
      }
    }
  }, [currentUser, loading, allowedRoles, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#2B1472]"></div>
      </div>
    );
  }

  if (!currentUser || !allowedRoles.includes(currentUser.role.toLowerCase())) {
    return null;
  }

  return <>{children}</>;
} 