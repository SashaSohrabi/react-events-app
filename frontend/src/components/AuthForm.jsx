import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { LEGENDS, SUBMIT_LABELS } from '@/utils/constants';

const initialForm = {
  email: '',
  password: '',
};

export default function AuthForm({ type = 'login', onSubmit, isSubmitting = false }) {
  const legend = LEGENDS[type] ?? LEGENDS.login;
  const submitLabel = SUBMIT_LABELS[type] ?? SUBMIT_LABELS.login;

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validationErrors;
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (onSubmit) {
      try {
        await onSubmit({ ...form });
        setForm(initialForm);
      } catch (error) {
        setSubmitError(error?.message ?? 'Something went wrong. Please try again.');
      }
    }
  };

  const fieldConfigs = [
    {
      key: 'email',
      label: 'Email',
      autoComplete: 'email',
      placeholder: 'user@example.com',
      type: 'email',
    },
    {
      key: 'password',
      label: 'Password',
      autoComplete: type === 'signup' ? 'new-password' : 'current-password',
      placeholder: '••••••••',
      type: showPassword ? 'text' : 'password',
      renderEndAdornment: () => (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-primary hover:text-primary/80"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-5"
              aria-hidden="true"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.51 10.51 0 0 1 12 19.5c-6.98 0-11-7.5-11-7.5a18.335 18.335 0 0 1 4.92-5.82m3.37-1.93a10.45 10.45 0 0 1 2.71-.35c6.98 0 11 7.5 11 7.5a18.255 18.255 0 0 1-2.32 3.24" />
              <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
              <path d="M1 1l22 22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-5"
              aria-hidden="true"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          )}
        </button>
      ),
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="space-y-4 rounded-2xl border border-base-300 bg-base-100/60 p-6 shadow-inner">
          <legend className="px-4 text-lg font-semibold uppercase tracking-wide text-primary">
            {legend}
          </legend>

          {fieldConfigs.map(({ key, label, renderEndAdornment, ...inputProps }) => {
            const inputId = `auth-${key}`;
            const hasToggle = typeof renderEndAdornment === 'function';

            return (
              <div key={key} className="space-y-2">
                <label htmlFor={inputId} className="label-text font-medium text-base-content">
                  {label}
                </label>

                <div className={hasToggle ? 'relative' : undefined}>
                  <input
                    id={inputId}
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className={`input input-bordered w-full focus:border-primary focus:outline-none focus:ring focus:ring-primary/20 mb-1 ${hasToggle ? 'pr-12' : ''}`}
                    required
                    {...inputProps}
                  />

                  {hasToggle ? renderEndAdornment() : null}
                </div>

                {errors[key] ? (
                  <span className="mt-1 block text-sm text-error">{errors[key]}</span>
                ) : null}
              </div>
            );
          })}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary mt-2 w-full rounded-xl text-base font-semibold tracking-wide shadow-lg shadow-primary/20 transition hover:-translate-y-[1px] hover:shadow-xl disabled:pointer-events-none disabled:opacity-60"
          >
            {isSubmitting ? 'Please wait…' : submitLabel}
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
