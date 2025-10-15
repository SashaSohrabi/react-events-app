import { useState, useEffect } from 'react';
import { EVENT_URL as API_URL } from '../utils/api'; // refac: using URL declared in constants

const useFetchEventDetail = (eventId) => {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) {
      setError('No event ID provided.');
      setIsLoading(false);
      return;
    }

    const fetchEventDetail = async () => {
      setIsLoading(true);
      setError(null);
      setEvent(null);

      try {
        const url = `${API_URL}/${eventId}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEvent(data);
      } catch (err) {
        console.error(`Failed to fetch event ${eventId}:`, err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetail();
  }, [eventId]);

  return { event, isLoading, error };
};

export default useFetchEventDetail;
