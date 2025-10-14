import { Link } from 'react-router';
import { useMemo } from 'react';

// importing custom fetch hook
import useFetchEvents from '../hooks/useFetchEvents';

//* working as util in Home */
const getRandomEvents = (events) => {
  if (!events || events.length === 0) {
    return [];
  }

  const indices = Array.from({ length: events.length }, (_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // selecting 3 random events
  return indices.slice(0, 3).map((index) => events[index]);
};

const RandomEventsCardSection = () => {
  const { events, isLoading, error } = useFetchEvents();
  const randomEvents = useMemo(() => getRandomEvents(events), [events]);

  if (isLoading) {
    return (
      <div className="p-12 text-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-info"></span>
        <p className="mt-4 text-base-content text-opacity-70">Loading featured events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-error text-center bg-base-100">
        Error loading featured events: {error}.
      </div>
    );
  }

  if (randomEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl mb-6 text-center uppercase text-zinc-300 font-light">
          Featured Adventures
        </h2>

        {/* Grid layout for responsive cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {randomEvents.map((event) => (
            <div
              key={event.id}
              className="card bg-base-200 w-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              <figure className="h-48 overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* location */}
                <span className="badge badge-accent absolute top-3 left-3 text-xs font-semibold">
                  {event.location}
                </span>
              </figure>

              <div className="card-body p-6">
                {/* title */}
                <h2 className="card-title text-xl text-base-content mb-1 line-clamp-1">
                  {event.title}
                </h2>
                {/* date >> accent ?*/}
                <div className="badge badge-accent text-sm font-bold mt-1">
                  {new Date(event.date).toLocaleDateString()}
                </div>
                {/* description */}
                <p className="text-sm text-opacity-70 text-base-content line-clamp-3 my-3">
                  {event.description}
                </p>
                <div className="card-actions justify-end mt-4">
                  {/* Detail Button - btn-ghost for a cleaner, less heavy look */}
                  <Link
                    to={`/events/${event.id}`}
                    className="btn btn-ghost btn-sm btn-outline hover:bg-base-300 text-secondary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to={'/events'}
            className="btn btn-lg btn-accent shadow-lg hover:shadow-xl transition duration-300"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RandomEventsCardSection;
