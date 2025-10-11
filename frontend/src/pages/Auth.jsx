import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { AuthForm } from '@/components';
import { useAuth } from '@/context/auth/useAuth.js';
import { saveToLocalStorage } from '@/utils/storage.js';
import { AUTH_STORAGE_KEY } from '@/utils/constants.js';

export default function Auth({ mode }) {
  const { signup, login, status, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    if (mode === 'signup') {
      await signup(data);
      navigate('/login', { replace: true });
    } else {
      const { token } = await login(data);
      saveToLocalStorage(AUTH_STORAGE_KEY, token);
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

  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 rounded-box bg-base-100 p-6 shadow-lg">
      <header className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold">{copy.title}</h1>
        {copy.subtitle ? <p className="text-sm text-base-content/70">{copy.subtitle}</p> : null}
      </header>

      {status === 'error' ? (
        <p className="rounded-md border border-error/40 bg-error/10 px-3 py-2 text-sm text-error">
          {error}
        </p>
      ) : null}

      <AuthForm type={mode} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </section>
  );
}
