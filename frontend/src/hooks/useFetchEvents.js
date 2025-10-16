import { useState, useEffect } from 'react';
import { EVENT_URL as API_URL } from '../utils/api';

// setting api-url in const variable to import .env with vite
// const API_URL = import.meta.env.VITE_API_URL; // refac: not need anymore

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // extracting 'results' array and set state
        setEvents(data?.results || []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError(err.message);
        setEvents([]); // ensuring events is an array on failure
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, isLoading, error };
};

export default useFetchEvents;
