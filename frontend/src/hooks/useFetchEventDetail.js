//***  Helper function to fetch events
//**   some type hinting
// that's how the pro's do it, isn't it?
// actually that's all some BS as react hooks are supposed to be pure
// and needed since react query I guess... whatever... so much talking...
// so less code... so... more code...
/**
 * Custom hook to fetch a single event's details.
 * @param {string | number} eventId The ID of the event to fetch.
 * @returns {{ event: object | null, isLoading: boolean, error: string | null }}
 */

import { useState, useEffect } from 'react';

// setting api-url in const variable to import .env with vite
const API_URL = import.meta.env.VITE_API_URL;
// if (API_URL.endsWith('/')) {
//   API_URL = API_URL.slice(0, -1);
// }  // refac: not needed, should work out of the box

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
