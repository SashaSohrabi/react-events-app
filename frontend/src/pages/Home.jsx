import { Link } from 'react-router';
import { useMemo } from 'react';

import useFetchEvents from '../hooks/useFetchEvents';

const getRandomEvents = (events) => {
  if (!events || events.length === 0) {
    return [];
  }

  const indices = Array.from({ length: events.length }, (_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

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
        <h2 className="text-4xl font-stretch-ultra-condensed font-extrabold text-center mb-12 text-base-content tracking-widest">
          Featured Events
        </h2>

        {/* Grid layout for responsive cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {randomEvents.map((event) => (
            <div
              key={event.id}
              // Added subtle lift (hover:-translate-y-1) and cleaner shadow transitions
              className="card bg-base-200 w-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              <figure className="h-48 overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* badge */}
                <span className="badge badge-accent absolute top-3 left-3 text-xs font-semibold">
                  {event.location}
                </span>
              </figure>

              <div className="card-body p-6">
                {/* title */}
                <h2 className="card-title text-xl text-base-content mb-1 line-clamp-1">
                  {event.title}
                </h2>

                {/* date */}
                <div className="badge badge-secondary text-sm font-bold mt-1">
                  {new Date(event.date).toLocaleDateString()}
                </div>

                {/* description  */}
                <p className="text-sm text-opacity-70 text-base-content line-clamp-3 my-3">
                  {event.description}
                </p>

                <div className="card-actions justify-end mt-4">
                  {/* Detail Button - using btn-ghost for a cleaner, less heavy look */}
                  <Link
                    to={`/events/${event.id}`}
                    className="btn btn-ghost btn-sm btn-outline hover:bg-base-300 text-accent"
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

export default function Home() {
  // YouTube embed URL is updated to use the ID: hOgVAYpHPCc
  const YOUTUBE_EMBED_URL =
    'https://www.youtube.com/embed/hOgVAYpHPCc?autoplay=1&mute=1&loop=1&playlist=hOgVAYpHPCc&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1';

  return (
    <>
      {/* HERO SECTION - Taller (max-h-72) and clean shadow */}
      <div
        className="hero w-full min-h-0 max-h-72 relative overflow-hidden rounded-[14px] drop-shadow-xs shadow-black/69 shadow-2xl mb-8"
        id="hero-video-banner"
      >
        {/* iframe right here */}
        <iframe
          className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] object-cover pointer-events-none"
          src={YOUTUBE_EMBED_URL}
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Event Promotion Banner Video"
        ></iframe>

        <div className="hero-overlay bg-black opacity-70 absolute inset-0"></div>
        <div className="hero-content text-center text-neutral-content py-10 z-10">
          <div className="max-w-3xl ">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-widest">
              DISCOVER YOUR NEXT ADVENTURE
            </h2>
            <p className="mb-6 text-lg font-light hidden md:block opacity-90">
              Your comprehensive guide to local festivals, conferences, and markets.
            </p>
          </div>
        </div>
      </div>

      <RandomEventsCardSection />
    </>
  );
}
