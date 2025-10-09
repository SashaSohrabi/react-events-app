import { Route, Routes } from 'react-router';
import MainLayout from '@/layouts/MainLayout.jsx';
import { Home, NotFound } from '@/pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
