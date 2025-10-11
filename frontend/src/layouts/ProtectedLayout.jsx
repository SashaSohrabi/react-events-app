import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { AUTH_STORAGE_KEY } from '@/utils/constants';

export default function ProtectedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return <Outlet />;
}
