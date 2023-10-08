import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Navbar from "./components/Navbar";
import { Auth0Provider } from "@auth0/auth0-react";

const App = () => {
  return (
    <BrowserRouter>
      <Auth0Provider
        domain="dev-63zyub2tmag74b70.us.auth0.com"
        clientId="UGFlphh0HK1BEcw0WAcRS55BCNJcvWP8"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  );
};

export default App;
