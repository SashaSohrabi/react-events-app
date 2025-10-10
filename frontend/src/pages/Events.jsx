import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useMemo } from 'react';

// importing custom fetch hook
import useFetchEvents from '../hooks/useFetchEvents.js';

const PlayIcon = () => (
  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      fill="none"
      stroke="currentColor"
    >
      <path d="M6 3L20 12 6 21 6 3z"></path>
    </g>
  </svg>
);

const HeartIcon = ({ isHearted }) => (
  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      fill={isHearted ? 'red' : 'none'}
      stroke={isHearted ? 'red' : 'currentColor'}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </g>
  </svg>
);

const LOCAL_STORAGE_KEY = 'heartedEvents';

/// TODO REFAC > remove prob

// const getRandomEvents = (events) => {
//   if (events.length <= 3) {
//     return events; // Return all if 3 or fewer are available
//   }

//   // Create an array of indices (0, 1, 2, 3, ...)
//   const indices = Array.from({ length: events.length }, (_, i) => i);

//   // Shuffle the indices using the Fisher-Yates algorithm
//   for (let i = indices.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [indices[i], indices[j]] = [indices[j], indices[i]];
//   }

//   return indices.map((index) => events[index]);
// };

export default function Events() {
  const { events, isLoading, error } = useFetchEvents();
  //   const randomEvents = useMemo(() => {
  //     return getRandomEvents(events);
  //   }, [events]);

  // User Favorites State
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Could not load favorites from localStorage', e);
      return [];
    }
  });

  // saving favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Could not save favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (eventId) => {
    const idToToggle = parseInt(eventId);

    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(idToToggle)) {
        return prevFavorites.filter((id) => id !== idToToggle);
      } else {
        return [...prevFavorites, idToToggle];
      }
    });
  };

  // rendering logic
  // states handled by useFetchEvents >> custom hook

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <span class="loading loading-spinner text-info"></span>
        <p className="mt-4 text-info">Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-error">Error loading events: {error}</div>;
  }

  if (events.length === 0) {
    return <div className="p-8 text-center">No events found.</div>;
  }

  const getSlideId = (index) => `item${index + 1}`;
  //   const totalSlides = events.length;

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>

      {/* CAROUSEL SECTION */}
      <div className="carousel w-full max-w-4xl mx-auto rounded-box shadow-xl">
        {events.map((event, index) => {
          const currentSlideId = getSlideId(index);

          return (
            <div
              key={`carousel-${event.id}`}
              id={currentSlideId}
              className="carousel-item w-full relative"
            >
              {/* // refactored to use as Link */}
              <Link to={`/events/${event.id}`} className="w-full">
                <img src={event.image} alt={event.title} className="w-full object-cover h-96" />
              </Link>

              <div className="absolute inset-x-0 bottom-0 p-4 text-white bg-black bg-opacity-50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold">{event.title}</h3>
                <p className="mt-1">
                  {event.location} on {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm mt-2 line-clamp-2">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Navigation Buttons */}
      <div className="flex w-full max-w-4xl justify-center gap-2 py-2 mb-12">
        {events.map((_, index) => (
          <a key={`nav-${index}`} href={`#${getSlideId(index)}`} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>

      {/* Event list */}
      <h3 className="text-2xl font-bold mb-4 w-full max-w-3xl text-center">Top Event Highlights</h3>

      <ul className="list bg-base-100 rounded-box shadow-md w-full max-w-3xl">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Featured Events from the API ({favorites.length} hearted)
        </li>

        {events.map((event, index) => {
          const isHearted = favorites.includes(event.id);

          return (
            <li
              key={`list-${event.id}`}
              className="list-row group hover:bg-base-200 transition-colors duration-150"
            >
              <Link to={`/events/${event.id}`} className="contents">
                <div>
                  <img className="size-10 rounded-box" src={event.image} alt={event.title} />
                </div>
                <div>
                  <div className="font-semibold group-hover:text-primary transition-colors">
                    {event.title}
                  </div>
                  <div className="text-xs uppercase opacity-60">{event.location}</div>
                </div>
                <p className="list-col-wrap text-xs line-clamp-2">{event.description}</p>
              </Link>

              <Link
                to={`/events/${event.id}`}
                className="btn btn-square btn-ghost"
                title="View Event Details"
              >
                <PlayIcon />
              </Link>

              <button
                className="btn btn-square btn-ghost"
                title={isHearted ? 'Remove from Favorites' : 'Add to Favorites'}
                onClick={() => toggleFavorite(event.id)}
              >
                <HeartIcon isHearted={isHearted} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
