import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Flights from "./pages/Flights";
import FlightSeats from "./pages/FlightSeats";
import Hotels from "./pages/Hotels";
import Bookings from "./pages/Bookings";
import FlightStatus from "./pages/FlightStatus";
import Pricing from "./pages/Pricing";
import Reviews from "./pages/Reviews";
import Recommendations from "./pages/Recommendations";
import Cancellations from "./pages/Cancellations";
import SeatsRooms from "./pages/SeatsRooms";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Flights */}
          <Route
            path="/flights"
            element={<Flights />}
          />

          {/* Flight Seat Selection */}
          <Route
            path="/flight-seats"
            element={<FlightSeats />}
          />

          {/* Hotels */}
          <Route
            path="/hotels"
            element={<Hotels />}
          />

          {/* Bookings */}
          <Route
            path="/bookings"
            element={<Bookings />}
          />

          {/* Flight Status */}
          <Route
            path="/flight-status"
            element={<FlightStatus />}
          />

          {/* Dynamic Pricing */}
          <Route
            path="/pricing"
            element={<Pricing />}
          />

          {/* Reviews */}
          <Route
            path="/reviews"
            element={<Reviews />}
          />

          {/* Recommendations */}
          <Route
            path="/recommendations"
            element={<Recommendations />}
          />

          {/* Cancellation & Refund */}
          <Route
            path="/cancellations"
            element={<Cancellations />}
          />

          {/* Old combined Seat & Room page */}
          <Route
            path="/seats-rooms"
            element={<SeatsRooms />}
          />

        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;