import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthForm } from '@/components';
import { useAuth } from '@/context/auth/useAuth.js';
import { saveToLocalStorage } from '@/utils/storage.js';
import { AUTH_STORAGE_KEY } from '@/utils/constants.js';
import { useAuthAlert } from '@/hooks/useAuthAlert.js';

export default function Auth({ mode }) {
  const { signup, login, status, error } = useAuth();
  const navigate = useNavigate();
  const alert = useAuthAlert({ status, error });

  const handleSubmit = async (data) => {
    if (mode === 'signup') {
      await signup(data);
      toast.success('Account created successfully. You can log in now.', { duration: 2000 });
      navigate('/login', { replace: true });
    } else {
      const { token } = await login(data);
      saveToLocalStorage(AUTH_STORAGE_KEY, token);
      toast.success('Logged in successfully.', { duration: 2000 });
      navigate('/new-event', { replace: true });
    }
  };

  const copy = useMemo(
    () =>
      ({
        login: { title: 'Login', subtitle: 'Welcome back' },
        signup: { title: 'Create Account', subtitle: 'Join the platform' },
      })[mode] ?? { title: 'Login', subtitle: 'Welcome back' },
    [mode]
  );

  const isSubmitting = status === 'loading';
  useEffect(() => {
    if (!alert) return;
    toast.error(alert.text);
  }, [alert]);

  return (
    <div className="flex min-h-[calc(100vh-15rem)] w-full items-center justify-center px-4 py-6">
      <section className="w-full max-w-md flex flex-col gap-4 rounded-box bg-base-100 p-6 shadow-lg">
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">{copy.title}</h1>
          {copy.subtitle ? <p className="text-sm text-base-content/70">{copy.subtitle}</p> : null}
        </header>

        <AuthForm type={mode} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </section>
    </div>
  );
}
