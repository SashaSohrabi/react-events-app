import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { LEGENDS, SUBMIT_LABELS } from '@/utils/constants';

const initialForm = {
  email: '',
  password: '',
};

export default function AuthForm({ type = 'login', onSubmit }) {
  const legend = LEGENDS[type] ?? LEGENDS.login;
  const submitLabel = SUBMIT_LABELS[type] ?? SUBMIT_LABELS.login;

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitError('');
  };

  const validationErrors = useMemo(() => {
    const nextErrors = {};
    const email = form.email.trim();

    if (!email) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Password is required';
    } else if (form.password.trim().length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    return nextErrors;
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validationErrors;
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (onSubmit) {
      try {
        onSubmit({ ...form, type });
        setForm(initialForm);
      } catch (error) {
        setSubmitError(error?.message ?? 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <fieldset className="space-y-5 rounded-2xl border border-base-300 bg-base-100/60 p-6 shadow-inner">
          <legend className="px-4 text-lg font-semibold uppercase tracking-wide text-primary">
            {legend}
          </legend>

          {submitError ? <p className="text-sm text-error">{submitError}</p> : null}

          <label className="form-control w-full gap-2">
            <span className="label-text font-medium text-base-content">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full focus:border-primary focus:outline-none focus:ring focus:ring-primary/20"
              placeholder="user@example.com"
              required
            />
            {errors.email ? (
              <span className="mt-1 block text-sm text-error">{errors.email}</span>
            ) : null}
          </label>

          <label className="form-control w-full gap-2">
            <span className="label-text font-medium text-base-content">Password</span>
            <input
              type="password"
              name="password"
              autoComplete={type === 'signup' ? 'new-password' : 'current-password'}
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full focus:border-primary focus:outline-none focus:ring focus:ring-primary/20"
              placeholder="••••••••"
              required
            />
            {errors.password ? (
              <span className="mt-1 block text-sm text-error">{errors.password}</span>
            ) : null}
          </label>

          <button
            type="submit"
            className="btn btn-primary mt-2 w-full rounded-xl text-base font-semibold tracking-wide shadow-lg shadow-primary/20 transition hover:-translate-y-[1px] hover:shadow-xl disabled:pointer-events-none disabled:opacity-60"
          >
            {submitLabel}
          </button>
        </fieldset>
      </form>
      {type === 'login' && (
        <Link to="/signup" className="text-sm text-center text-primary block">
          Create Account
        </Link>
      )}
    </>
  );
}
