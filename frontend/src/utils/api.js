import { BASE_URL } from './constants';

const pathNewEvent = '/api/events';

const request = async (path, options) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error((await res.text()) || res.statusText);
  return res.status === 204 ? null : res.json();
};

export const registerUser = (user) =>
  request('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });

export const loginUser = (user) =>
  request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(user),
  });

// refac
// extended code: added postEvent
export async function postEvent(eventData, token) {
  const response = await fetch(BASE_URL + pathNewEvent, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // isn't really bearing anything
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'Failed to create event' }));
    throw new Error(errorBody.message || `HTTP error! Status: ${response.status}`);
  }

  return response.json(); // returning new created event data
}
