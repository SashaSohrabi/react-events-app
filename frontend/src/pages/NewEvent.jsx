import 'cally';
{
  //! imported cally as dependency
  /*
* Use npm to install cally:
npm i cally
*/
}

export default function NewEvent() {
  return (
    <>
      <div className="flex flex-col gap-8 p-4 md:p-8 w-full">
        {/* title & description */}
        <div className="bg-base-100 rounded-box shadow-lg border border-base-200 p-6 flex flex-col gap-4">
          <div className="text-xs font-light text-right text-info tracking-widest">
            events description
          </div>

          {/* Title Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Title (absolutely necessary)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Champions Leage Final in Berlin 2026"
              className="input input-bordered w-full input-info"
            />
          </div>

          {/* description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text"></span>
            </label>
            <textarea
              placeholder="Tell us more about your event..."
              className="textarea textarea-bordered h-24 textarea-primary w-full"
            ></textarea>
          </div>

          {/* image */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text"></span>
            </label>
            {/*  input group: DaisyUI */}
            <label className="input input-bordered flex items-center gap-2 w-full select-primary">
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
                required
                placeholder="https://your-image-src.com/path/to/image.jpg"
                defaultValue="https://your-image-src-as-url.com"
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
          {/* freemium btn  */}

          <div className="btn btn-outline btn-info p-2 w-full sm:w-auto">
            <label className="swap swap-rotate">
              <input type="checkbox" />
              <div className="swap-on font-semibold">🤑 premium only</div>
              <div className="swap-off">🤗 free for all</div>
            </label>
          </div>
          {/* sponsored btn */}
          <div className="btn btn-outline btn-info p-2 w-full sm:w-auto">
            <label className="swap swap-rotate">
              <input type="checkbox" />
              <div className="swap-on font-semibold">⭐ sponsored event</div>
              <div className="swap-off">🗓️ regular event</div>
            </label>
          </div>
        </div>

        {/* time & location */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-light text-right text-info tracking-widest">
            time & location
          </div>

          {/* Calendar */}
          <calendar-date class="cally bg-base-100 border border-base-300 shadow-xl rounded-box p-4 w-full">
            <div className="flex items-center justify-between mb-3">
              {/* Previous Button */}
              <button className="btn btn-ghost btn-sm btn-circle" aria-label="Previous">
                <svg
                  className="fill-current size-4"
                  slot="previous"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                </svg>
              </button>
              {/* Month Title Area */}
              <calendar-month className="text-lg font-semibold text-info"></calendar-month>
              {/* Next Button */}
              <button className="btn btn-ghost btn-sm btn-circle" aria-label="Next">
                <svg
                  className="fill-current size-4"
                  slot="next"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                </svg>
              </button>
            </div>
          </calendar-date>

          {/* time & location */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="form-control sm:w-1/3">
              <label className="label">
                <span className="label-text">Event Time</span>
              </label>
              <input type="time" className="input input-bordered" />
            </div>
            {/* lat/long */}
            <div className="form-control sm:w-2/3 bg-base-200 border border-base-300 rounded-box p-4">
              <label className="label">
                <span className="label-text font-semibold">Location Coordinates (Lat/Long)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered input-sm flex-1"
                  placeholder="Latitude (e.g., 51.234)"
                />
                <input
                  type="text"
                  className="input input-bordered input-sm flex-1"
                  placeholder="Longitude (e.g., 11.234)"
                />
              </div>
            </div>
          </div>
        </div>

        {/* categories */}
        <div className="pt-4">
          <div className="text-xs font-light text-right text-info tracking-widest mb-2">
            event categories
          </div>
          {/* categories btn */}
          <form className="filter bg-base-100 p-4 rounded-box shadow-md border border-base-200">
            <div className="flex flex-wrap gap-2 justify-center">
              <input className="btn btn-sm btn-ghost" type="reset" value="Clear" />
              <div className="btn-group flex flex-wrap gap-2">
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
                  aria-label="Sports"
                />
                <input
                  className="btn btn-sm btn-outline btn-info"
                  type="radio"
                  name="frameworks"
                  aria-label="Culture"
                />
                <input
                  className="btn btn-sm btn-outline btn-info"
                  type="radio"
                  name="frameworks"
                  aria-label="Friendship"
                />
                <input
                  className="btn btn-sm btn-outline btn-info"
                  type="radio"
                  name="frameworks"
                  aria-label="other event"
                />
              </div>
            </div>
          </form>
        </div>

        <button type="submit" className="btn btn-primary mt-4 w-full uppercase">
          create event
        </button>
      </div>
    </>
  );
}
