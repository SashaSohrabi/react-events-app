import { useParams } from 'react-router'; //

// importing custom fetch hook
import useFetchEventDetail from '../hooks/useFetchEventDetail.js';

export default function EventDetail() {
  const { eventId } = useParams();
  const { event, isLoading, error } = useFetchEventDetail(eventId);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <span className="loading loading-spinner text-secondary"></span>
        <p className="mt-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ">
          Loading event details...
        </p>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-error">Error loading event: {error}</div>;
  }

  if (!event) {
    return (
      <div className="p-8 text-center">
        <p className="mt-4 text-error">Event with ID {eventId} not found</p>
        <div className="text-4xl m-1.5">😔</div>
      </div>
    );
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
              href={`https://maps.google.com/maps?q=${event.latitude},${event.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Show Location
            </a>
            <button className="btn btn-primary">Entry as CalDav</button>
          </div>
        </div>
      </div>
    </div>
  );
}
