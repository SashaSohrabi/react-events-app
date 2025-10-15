import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();
  // small way to go back to home
  const handleGoHome = () => {
    navigate('/', { replace: true });
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow-2xl border border-base-200 max-w-lg w-full">
          {/* Cool message */}
          <h3 className="font-extrabold text-error mb-4 select-none">404</h3>
          <p className="text-lg font-semibold text-base-content mb-3">
            Damn it, the page you're looking for, has not been found! 😔 <br /> Maybe it's gone...
            you could go back in time 🧭 or go hard...
          </p>

          {/* Action button */}
          <button
            onClick={handleGoHome}
            className="btn btn-primary btn-lg uppercase shadow-lg transition-transform duration-200 hover:scale-[1.02]"
          >
            or go home!
          </button>
        </div>
      </div>
    </>
  );
}
