import React from 'react'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register';
import Statistics from './components/Pages/Statistics';
import Votes from './components/Pages/Votes';

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="statitics" element={<Statistics />} />
        <Route path="votes" element={<Votes />} />
      </Routes>
    </div>
  );
}
