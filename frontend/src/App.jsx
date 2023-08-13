import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import About from "./pages/About";
import axios from "axios";
import PageNotFound from "./components/PageNotFound";
import Privacy from "./pages/Privacy";
import PrivateRoute from "./Protected/PrivateRoute";
import Dashboard from "./user/Dashboard";
import Account from "./user/Account";
import Bookings from "./user/Bookings";
import Accomodation from "./user/Accomodation";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Account />} />
            <Route path="user/bookings" element={<Bookings />} />
            <Route path="user/place" element={<Accomodation />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;