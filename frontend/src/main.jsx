import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from '@/context/auth/AuthContext.jsx';

if (import.meta.env.DEV) {
  localStorage.removeItem('heartedEvents');
  localStorage.removeItem('authUser');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="bottom-right" />
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
