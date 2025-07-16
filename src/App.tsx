import './App.css';
import { AuthProvider } from '@/contexts/auth-context';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './route/route';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
