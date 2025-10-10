import RandomEventsCardSection from '../components/RandomEventsCardSection';

export default function Home() {
  // YouTube embed URL is updated to use the ID: hOgVAYpHPCc
  const YOUTUBE_EMBED_URL =
    'https://www.youtube.com/embed/hOgVAYpHPCc?autoplay=1&mute=1&loop=1&playlist=hOgVAYpHPCc&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1';

  return (
    <>
      {/* hero section */}
      <div
        className="hero w-full min-h-0 max-h-72 relative overflow-hidden shadow-2xl"
        id="hero-video-banner"
      >
        {/* iframe */}
        <iframe
          className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] object-cover pointer-events-none"
          src={YOUTUBE_EMBED_URL}
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Event Promotion Banner Video"
        ></iframe>

        {/* Hero Overlay to ensure text readability (more contrast) */}
        <div className="hero-overlay bg-black opacity-70 absolute inset-0"></div>

        {/* Hero >> Content positioned over video */}
        <div className="hero-content text-center text-neutral-content py-10 z-10">
          <div className="max-w-3xl ">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-widest">
              DISCOVER YOUR NEXT ADVENTURE
            </h1>
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
