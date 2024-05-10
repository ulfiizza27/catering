import React from 'react';
import { createRoot } from 'react-dom/client'; // Mengimpor createRoot dari "react-dom/client"
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <Router>
    <ToastContainer />
    <App />
  </Router>
);
