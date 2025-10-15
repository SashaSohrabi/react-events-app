// import { useState } from 'react'; // not needed
import { useAuth } from '@/context/auth/useAuth.js';
import { useNavigate } from 'react-router';
import { useCreateEvent } from '../hooks/useCreateEvent.js';

/// refac:
// removed by using native elements, cally's breaking div-layout regarding colors?!
//
// import 'cally';
// {
//  imported cally as dependency
//   /*
// * Use npm to install cally:
// npm i cally
// */
// }

const getFormData = (event) => {
  const form = event.target;
  return {
    title: form.title.value,
    description: form.description.value,
    date: form.date.value,
    image: form.image.value,
    location: form.location.value,
    latitude: form.latitude.value,
    longitude: form.longitude.value,
  };
};

export default function NewEvent() {
  const { token } = useAuth();
  const { createEvent, isLoading, error, status } = useCreateEvent();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // is it needed?

    try {
      const eventData = getFormData(event);
      await createEvent(eventData, token);

      // pseudo logic: if eventCreation = successful { navigate to events }
      navigate('/events', { replace: true });
    } catch (err) {
      // err handling
      console.error('Event submission failed:', err);
    }
  };

  return (
    <>
      {' '}
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-3xl mb-6 text-center uppercase text-zinc-300 font-light">
          Add New Event
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-4 md:p-8 w-full">
          <div className="flex flex-col gap-8 p-4 md:p-8 w-full">
            {status === 'error' && (
              <p className="rounded-md border border-error/40 bg-error/10 px-3 py-2 text-sm text-error">
                Error submitting event: {error}
              </p>
            )}

            {/* title & description */}
            <div className="bg-base-100 rounded-box shadow-lg border border-base-200 p-6 flex flex-col gap-4">
              <div className="text-xs font-light text-right text-info tracking-widest">
                events description
              </div>
              <div className="bg-base-100 border border-base-300 shadow-xl rounded-box p-4 w-full">
                <label className="label">
                  <span className="label-text font-semibold">General information</span>
                </label>
              </div>
              {/* Title Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title (absolutely necessary)</span>
                </label>
                <input
                  type="text"
                  name="title" // title here
                  placeholder="e.g., Champions Leage Final in Berlin 2026"
                  className="input input-bordered w-full input-info"
                />
              </div>

              {/* description */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description" // desc here
                  placeholder="Tell us more about your event..."
                  className="textarea textarea-bordered h-24 textarea-primary w-full"
                ></textarea>
              </div>

              {/* LocationName */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">location name</span>
                </label>
                <input
                  type="text"
                  name="location" // title here
                  placeholder="Cologne, Germany"
                  className="input input-bordered w-full input-info"
                />
              </div>
              {/* image */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full select-primary">
                  {/* SVG icon */}
                  <svg
                    className="h-4 w-4 opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </g>
                  </svg>
                  <input
                    type="url"
                    name="image" // img here
                    // required
                    placeholder="https://your-image-src.com/path/to/image.jpg"
                    defaultValue="https://your-image-src.com/path/to/image.jpg"
                    pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                    title="Must be valid URL"
                    className="grow"
                  />
                </label>
                <label className="label">
                  <span className="label-text-alt text-error validator-hint hidden">
                    Must be a valid URL.
                  </span>
                </label>
              </div>

              {/* freemium btn & sponsored btn */}
              {/* removed while testing, it's just for visuals either */}
            </div>

            {/* time & location */}
            <div className="flex flex-col gap-2">
              <div className="text-xs font-light text-right text-info tracking-widest">
                time & location
              </div>

              {/* section date/ time */}
              <div className="bg-base-100 border border-base-300 shadow-xl rounded-box p-4 w-full">
                <label className="label">
                  <span className="label-text font-semibold">Event Date & Location</span>
                </label>
              </div>
              {/* End Date/Time Input Section */}

              {/* time & location */}
              <div className="flex flex-col gap-4 mt-4">
                {/* lat/long */}
                <div className="form-control w-full bg-base-200 border border-base-300 rounded-box p-4">
                  <div className="flex-1 gap-2">
                    {/* time */}
                    <div className="flex flex-col">
                      <input
                        type="datetime-local"
                        name="date"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="latitude"
                      className="input input-bordered input-sm w-1/2"
                      placeholder="Latitude (e.g., 51.234)"
                    />
                    <input
                      type="text"
                      name="longitude"
                      className="input input-bordered input-sm w-1/2"
                      placeholder="Longitude (e.g., 11.234)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* categories */}
            <div className="bg-base-100 rounded-box shadow-lg border border-base-200 p-6 flex flex-col gap-4">
              <div className="text-xs font-light text-right text-info tracking-widest">
                categories
              </div>
              <div className="form-control">
                <div role="tablist" className="btn-group flex flex-wrap gap-2">
                  <input
                    className="btn btn-sm btn-outline btn-info"
                    type="radio"
                    name="frameworks"
                    aria-label="Meetup"
                  />
                  <input
                    className="btn btn-sm btn-outline btn-info"
                    type="radio"
                    name="frameworks"
                    aria-label="Concert"
                  />
                  <input
                    className="btn btn-sm btn-outline btn-info"
                    type="radio"
                    name="frameworks"
                    aria-label="Meetup"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-secondary mt-4 w-full uppercase"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner"></span> : 'create event'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
