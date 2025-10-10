/// TODO : outsource fetching > move to custom hook
// hardcored urls to const variables

import { useState, useEffect } from 'react';
import { useParams } from 'react-router'; //

export default function EventDetail() {
  // Get the event ID from the URL parameters
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) {
      setError('No event ID provided in the URL.');
      setIsLoading(false);
      return;
    }

    const fetchEventDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/events/${eventId}`);

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

  if (isLoading) {
    return <div className="p-8 text-center">Loading event details...</div>;
  }

  if (error) {
    return <div className="p-8 text-error">Error loading event: {error}</div>;
  }

  if (!event) {
    return <div className="p-8 text-center">Event not found.</div>;
  }

  const eventDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-8 flex justify-center">
      <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-5xl">
        {/* Figure (Image) */}
        <figure className="lg:w-1/2">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        </figure>

        {/* Card Body (Details) */}
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-3xl mb-4">{event.title}</h2>

          <p className="text-sm uppercase font-semibold text-primary">{event.location}</p>

          <p className="mb-4 text-lg font-medium">{eventDate}</p>

          <p className="text-gray-700">{event.description}</p>

          <div className="card-actions justify-end mt-6">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${event.latitude},${event.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Show Location
              {/* /// TODO inserting google maps / embed / iframe > find solution */}
            </a>
            <button className="btn btn-primary">Entry as CalDav</button>
          </div>
        </div>
      </div>
    </div>
  );
}
