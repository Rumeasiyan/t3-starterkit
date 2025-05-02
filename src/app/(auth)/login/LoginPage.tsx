import { AuthForm } from '@/app/_components/features/auth/AuthForm';
import { AuthLayout } from '@/app/_components/layouts/auth/AuthLayout';

interface LoginProps {
  handleLogin: () => void;
}

export default function Login({ handleLogin }: LoginProps) {
  return (
    <AuthLayout
      title="Login to T3 App"
      description="Enter your email below to login to your account"
    >
      <AuthForm
        type="login"
        handleSubmit={handleLogin}
      />
    </AuthLayout>
  );
}
