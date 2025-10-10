import { Link } from 'react-router';

export default function Home() {
  const HERO_IMAGE_URL =
    'https://agcdn-1d97e.kxcdn.com/wp-content/uploads/2018/05/alphagamma-best-US-tech-events-you-cant-miss-in-2018-entrepreneurship-002.jpg';

  return (
    <>
      {/* <h1>Home Page</h1> */}

      <div className="hero min-h-[50vh]" id="hero-image">
        <img src={HERO_IMAGE_URL} alt="Hero Image" className="object-cover" />
        <div className="hero-overlay bg-black opacity-80"></div>

        <div className="hero-content text-center text-neutral-content py-20 ">
          <div className="max-w-3xl ">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Discover Your Next Adventure
            </h1>
            <p className="mb-8 text-xl font-light">
              Find the best local festivals, tech conferences, and markets near you. Your event
              journey starts here.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to={'/events'}
                className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                Explore Our Events
              </Link>
              {/* <button className="btn btn-outline btn-primary btn-lg border-2">SignUp</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
