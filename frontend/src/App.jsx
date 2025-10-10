import { Route, Routes } from 'react-router';
import MainLayout from '@/layouts/MainLayout.jsx';
import { Home, Events, EventDetail, NotFound } from '@/pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
