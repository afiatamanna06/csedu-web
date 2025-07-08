import LoginForm from "@/components/auth/login/login-form";

export function FacultyLogin() {
  return <LoginForm role="faculty" />;
}

export function StudentLogin() {
  return <LoginForm role="student" />;
}

export function AdminLogin() {
  return <LoginForm role="admin" />;
}

export function AlumniLogin() {
  return <LoginForm role="alumni" />;
}
