import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from "react-router-dom"; 
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';
import Navbar from "./components/navbar"; // Import Navbar component
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import DashboardReport from './pages/dashboard/dashboard-report';
import 'tailwindcss/tailwind.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleSignOut() {
    try {
      await signOut(getAuth());
      setUser(null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {user ? (
        <AuthenticatedRoutes handleSignOut={handleSignOut} />
      ) : (
        <UnauthenticatedRoutes />
      )}
    </div>
  );
}

function AuthenticatedRoutes({ handleSignOut }) {
  return (
    <>
      <Navbar handleSignOut={handleSignOut} /> {/* Ensure Navbar is correctly referenced */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<Dashboard />} />
        <Route path="/report" element={<DashboardReport />} />
      </Routes>
    </>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
