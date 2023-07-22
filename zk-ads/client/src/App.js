import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';

const App = () => {
  if (typeof window.ethereum == 'object') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} exact />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </BrowserRouter>

    );
  } else {
    return (
      <div>Download Metamask to proceed</div>
    )
  }

}

export default App;
