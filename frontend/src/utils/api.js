import { BASE_URL } from './constants';

const request = async (path, options) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text() || res.statusText);
  return res.status === 204 ? null : res.json();
};

export const registerUser = (user) => request('/api/users', {
  method: 'POST',
  body: JSON.stringify(user),
});

export const loginUser = (user) => request('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify(user),
});
