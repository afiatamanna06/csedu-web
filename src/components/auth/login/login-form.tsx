// components/LoginForm.tsx
import { z } from 'zod';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm, type ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface LoginFormProps {
  role: 'student' | 'faculty' | 'admin' | 'alumni';
}

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm({ role }: LoginFormProps) {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Login data:', data);
    navigate({ to: `/dashboard/${role}` });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2B1472]">
      <div className="bg-white dark:bg-black rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[#2B1472] mb-6">
          {role.charAt(0).toUpperCase() + role.slice(1)} Login
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }: { field: ControllerRenderProps<FormValues, "username"> }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }: { field: ControllerRenderProps<FormValues, "password"> }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-[#FFB606] text-black w-full">
              Login
            </Button>

            {role === 'admin' && (
            <div>
              Don't have an account? <a href="/signup/admin" className="text-blue-500">Sign up as Admin</a>
            </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}