import { useState, useEffect } from 'react';

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // setting api-url in const variable
  const API_URL = 'http://localhost:3001/api/events';

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
