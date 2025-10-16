import { useState } from 'react';

/// REFAC:  extending api.js >> creating postEvent // we did it! 🙌🏽
import { postEvent } from '@/utils/api';

export const useCreateEvent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle'); // poss. vals: idle | loading | success | error

  const createEvent = async (eventData, token) => {
    setIsLoading(true);
    setStatus('loading');
    setError(null);
    setData(null);

    try {
      if (!token) {
        throw new Error('Authentication token is missing. Please log in.');
      }

      const newEvent = await postEvent(eventData, token);

      setData(newEvent);
      setStatus('success');
      return newEvent;
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err.message || 'An unknown error occurred.');
      setStatus('error');
      throw err; // throwing new error bla
    } finally {
      setIsLoading(false);
    }
  };

  return { createEvent, data, isLoading, error, status };
};
