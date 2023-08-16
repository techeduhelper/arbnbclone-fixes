import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
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
import PlaceForm from "./user/PlaceForm";
import SinglePlace from "./pages/SinglePlace";

axios.defaults.baseURL = `https://arbnb-backend.onrender.com`;

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
            <Route path="user/place/:id" element={<PlaceForm />} />
          </Route>
          <Route path="/place/:id" element={<SinglePlace />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
