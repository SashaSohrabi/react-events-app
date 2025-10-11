import { AuthForm } from '@/components';
import { loginUser, registerUser } from '@/utils/api';

export default function Auth({ mode }) {
  const handleSubmit = (data) => {
    if (mode === 'signup') {
      registerUser(data);
    } else {
      loginUser(data);
    }
  };

  const headings = {
    login: { title: 'Login', subtitle: 'Welcome back' },
    signup: { title: 'Create Account', subtitle: 'Join the platform' },
  };

  const copy = headings[mode] ?? headings.login;

  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 rounded-box bg-base-100 p-6 shadow-lg">
      <header className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold">{copy.title}</h1>
        {copy.subtitle ? <p className="text-sm text-base-content/70">{copy.subtitle}</p> : null}
      </header>

      <AuthForm type={mode} onSubmit={handleSubmit} />
    </section>
  );
}
