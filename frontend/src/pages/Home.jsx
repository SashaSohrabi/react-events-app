import { Link } from 'react-router';

import useFetchEvents from '../hooks/useFetchEvents';
import { useMemo } from 'react';

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
      <div className="p-8 text-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-info"></span>
        <p className="mt-4 text-gray-500">Discovering featured events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-error text-center bg-base-200">
        Error loading featured events: {error}.
      </div>
    );
  }

  if (randomEvents.length === 0) {
    return null; // Don't show section if events equals 0
  }

  return (
    <section className="py-12 bg-base-200 rounded-b-3xl">
      <div className="container mx-auto px-4 max-w-7xl ">
        <h2 className="text-3xl font-bold text-center mb-10 text-base-content">
          Featured Adventures
        </h2>

        {/* Flex layout for cards, adjusting for responsiveness */}
        <div className="flex flex-wrap justify-center gap-8">
          {randomEvents.map((event) => (
            <div
              key={event.id}
              className="card bg-base-100 w-full sm:w-80 shadow-xl hover:shadow-2xl transition duration-300"
            >
              <figure className="h-40 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </figure>

              <div className="card-body p-6">
                <h2 className="card-title text-xl text-base-content">
                  {event.title}
                  <div className="badge badge-secondary">HOT</div>
                </h2>

                {/* text slightly muted */}
                <p className="text-sm text-opacity-80 text-base-content line-clamp-2">
                  {event.description}
                </p>

                <div className="card-actions justify-end mt-4">
                  {/* Badges for location and date */}
                  <div className="badge badge-outline badge-info">{event.location}</div>
                  <div className="badge badge-outline badge-neutral">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm mt-3 w-full">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main Home Component ---

export default function Home() {
  // YouTube embed URL updated to use the new video ID: hOgVAYpHPCc
  // Parameters ensure autoplay, mute, and looping for a non-disruptive banner.
  const YOUTUBE_EMBED_URL =
    'https://www.youtube.com/embed/hOgVAYpHPCc?autoplay=1&mute=1&loop=1&playlist=hOgVAYpHPCc&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1';

  return (
    <>
      {/* HERO SECTION - Minimal Height, Max Width, now with Video */}
      <div
        className="hero w-full min-h-0 max-h-60 relative overflow-hidden rounded-t-3xl drop-shadow-2xl"
        id="hero-video-banner"
      >
        {/* Iframe for the YouTube Video */}
        <iframe
          className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] object-cover pointer-events-none"
          src={YOUTUBE_EMBED_URL}
          frameBorder="0"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Event Promotion Banner Video"
        ></iframe>

        {/* Hero Overlay to ensure text readability */}
        <div className="hero-overlay bg-black opacity-75 absolute inset-0"></div>

        {/* Hero Content positioned over the video */}
        <div className="hero-content text-center text-neutral-content py-8 z-10">
          <div className="max-w-3xl ">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
              Discover Your Next Adventure
            </h1>
            <p className="mb-4 text-base font-light hidden md:block">
              Your event journey starts here.
            </p>
            <div className="flex justify-center">
              <Link
                to={'/events'}
                className="btn btn-info btn-md shadow-lg hover:shadow-xl transition duration-300"
              >
                Explore All Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RANDOM EVENTS SECTION */}
      <RandomEventsCardSection />
    </>
  );
}
