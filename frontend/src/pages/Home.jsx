import { Link } from 'react-router';
// Assuming useFetchEvents is correctly located relative to Home.jsx or in the root
import useFetchEvents from '../hooks/useFetchEvents';
import { useMemo } from 'react';

// --- Utility Functions ---

/**
 * Shuffles an array of events and selects up to 3 random items.
 * Uses Fisher-Yates shuffle for true randomness.
 * @param {Array<Object>} events - The full list of events.
 * @returns {Array<Object>} - An array containing up to 3 random events.
 */
const getRandomEvents = (events) => {
  if (!events || events.length === 0) {
    return [];
  }

  // Create an array of indices
  const indices = Array.from({ length: events.length }, (_, i) => i);

  // Shuffle the indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Select up to the first 3
  return indices.slice(0, 3).map((index) => events[index]);
};

// --- Sub-Components ---

/**
 * Renders a section showing 3 random events in DaisyUI cards
 * using the requested template structure.
 */
const RandomEventsCardSection = () => {
  // Use the existing fetch hook
  const { events, isLoading, error } = useFetchEvents();

  // Cache the random selection
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
    return null; // Don't show the section if no events are found
  }

  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-neutral-content">
          Featured Adventures
        </h2>

        {/* Flex layout for cards, adjusting for responsiveness */}
        <div className="flex flex-wrap justify-center gap-8">
          {randomEvents.map((event) => (
            // Applying requested card structure with dynamic content
            <div
              key={event.id}
              className="card bg-base-100 w-full sm:w-80 shadow-xl hover:shadow-2xl transition duration-300"
            >
              <figure className="h-40 overflow-hidden">
                {/* Use event image */}
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </figure>

              <div className="card-body p-6">
                <h2 className="card-title text-xl">
                  {event.title}
                  {/* Use a badge for quick identification */}
                  <div className="badge badge-secondary">HOT</div>
                </h2>

                {/* Use the event description */}
                <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>

                <div className="card-actions justify-end mt-4">
                  {/* Badges for location and date */}
                  <div className="badge badge-outline badge-info">{event.location}</div>
                  <div className="badge badge-outline badge-neutral">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  {/* Link button */}
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
  const HERO_IMAGE = import.meta.env.VITE_HERO_IMAGE_URL;

  const YOUTUBE_EMBED_URL =
    'https://www.youtube.com/embed/f20VaVNCXN0?autoplay=1&mute=1&loop=1&playlist=f20VaVNCXN0&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1';

  return (
    <>
      {/* HERO SECTION - Halved the size from min-h-[50vh] to min-h-[25vh] (or 35vh on larger screens) // sm:min-h-[35vh] */}
      <div className="hero relative" id="hero-image">
        <div className="hero-overlay bg-black opacity-7">
          {' '}
          <iframe
            className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] object-cover pointer-events-none"
            src={YOUTUBE_EMBED_URL}
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Event Promotion Banner Video"
          ></iframe>
        </div>

        <div className="hero-content text-center text-neutral-content py-12 ">
          <div className="max-w-3xl ">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
              Discover Your Next Adventure
            </h1>
            <p className="mb-6 text-lg font-light hidden sm:block">
              Your event journey starts here.
            </p>
            <div className="flex justify-center">
              <Link
                to={'/events'}
                className="btn btn-info btn-lg shadow-lg hover:shadow-xl transition duration-300"
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
