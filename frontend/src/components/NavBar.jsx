import { Link, useNavigate } from 'react-router';
import ThemeController from './ThemeController';
import appLogo from '@/assets/app-logo.svg';
import { useAuth } from '@/context/auth/useAuth.js';

export default function NavBar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const hasToken = token != null && String(token).length > 0;
  const authLink = hasToken ? { to: '/', label: 'Logout' } : { to: '/login', label: 'Login' };

  const navLinks = [
    { to: '/', label: 'Homepage' },
    { to: '/events', label: 'Events' },
    { to: '/new-event', label: 'New Event' },
  ];

  return (
    <>
      <nav className="navbar bg-base-100 border-b border-transparent shadow-sm mb-7">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="justify-start">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate(authLink.to, { replace: true });
                  }}
                  className="menu-link w-full justify-start"
                >
                  {authLink.label}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to="/">
            <img src={appLogo} className="logo w-10 h-10" alt="App logo" />
          </Link>
        </div>
        <div className="navbar-end">
          <ThemeController />
        </div>
      </nav>
    </>
  );
}
