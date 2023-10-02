import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} exact />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
