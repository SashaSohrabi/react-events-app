import { Route, Routes } from 'react-router';
import MainLayout from '@/layouts/MainLayout.jsx';
import ProtectedLayout from '@/layouts/ProtectedLayout.jsx';
import { Home, NotFound, NewEvent, Auth, Events, EventDetail } from '@/pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Auth mode="login" />} />
          <Route path="signup" element={<Auth mode="signup" />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route element={<ProtectedLayout />}>
            <Route path="new-event" element={<NewEvent />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
