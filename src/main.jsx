import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import 'flowbite/dist/flowbite.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CounterContextProvider from './Context/CounterContext.jsx';
import AuthContextProvider from './Context/AuthContext.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lazy } from 'react';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 3000,
      staleTime: 2000,
      gcTime: 200000,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CounterContextProvider>
        <AuthContextProvider>
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <ToastContainer autoClose={500} />
          <App />
        </AuthContextProvider>
      </CounterContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
