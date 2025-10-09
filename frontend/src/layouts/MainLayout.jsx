import { Outlet } from 'react-router';
import { Header, Footer } from '@/components';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
