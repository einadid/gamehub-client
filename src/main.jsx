// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider.jsx';
import { router } from './routes/Routes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast'; // Toaster ইম্পোর্ট করো

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster /> {/* এখানে Toaster যোগ করো */}
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)