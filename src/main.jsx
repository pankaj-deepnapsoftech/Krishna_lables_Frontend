import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import AuthContextProvider from './Context/authcontext';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ToastContainer />
    <App />
  </AuthContextProvider>
 
);