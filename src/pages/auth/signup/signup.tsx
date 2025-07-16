import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/contexts/auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function Signup() {
  const [email, setEmail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student'); // student or faculty
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { studentSignup, teacherSignup } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);

      const signupData = {
        email,
        registration_number: registrationNumber,
        password
      };

      if (userType === 'student') {
        await studentSignup(signupData);
        navigate({ to: '/' });
      } else {
        await teacherSignup(signupData);
        navigate({ to: '/' });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-center text-[#2B1472]">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your details to sign up
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>

            <div>
              <Input
                id="registration-number"
                name="registration-number"
                type="text"
                required
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="Registration Number"
              />
            </div>

            <div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <div>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2B1472] hover:bg-[#1a0c45]"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export function AdminSignup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { adminSignup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);

      await adminSignup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone
      });
      navigate({ to: '/' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create admin account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2B1472]">
            Create Admin Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your details to create an admin account
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px bg-white shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="rounded-t-md border-b-0"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="border-b-0"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="border-b-0"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="border-b-0"
                placeholder="Password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="rounded-b-md"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2B1472] hover:bg-[#1a0c45] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B1472]"
            >
              {loading ? 'Creating Account...' : 'Create Admin Account'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Button
                type="button"
                variant="link"
                className="font-medium text-[#2B1472] hover:text-[#1a0c45] p-0"
                onClick={() => navigate({ to: '/' })}
              >
                Sign in
              </Button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 
