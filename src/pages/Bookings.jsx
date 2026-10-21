import { Link } from "react-router-dom";
import {
  Plane,
  Hotel,
  CalendarDays,
  MapPin,
  Clock,
  ArrowRight,
  XCircle,
  CheckCircle2,
} from "lucide-react";

import "./Bookings.css";

const bookings = [
  {
    id: "TE-2026-001",
    type: "Flight",
    status: "Confirmed",
    title: "Air India AI202",
    route: "Chennai → Delhi",
    date: "28 Sep 2026",
    time: "10:30 AM",
    duration: "2h 50m",
    price: "₹5,200",
  },
  {
    id: "TE-2026-002",
    type: "Flight",
    status: "Confirmed",
    title: "Taj Chennai",
    route: "Chennai, Tamil Nadu",
    date: "02 Oct 2026",
    time: "12:00 AM",
    duration: "3h 05m",
    price: "₹13,600",
  },
];

function Bookings() {
  return (
    <div className="bookings-page">

      {/* HEADER */}
      <div className="bookings-header">
        <div>
          <span className="bookings-kicker">MY TRAVEL</span>

          <h1>My Bookings</h1>

          <p>
            Manage your flights, hotels and upcoming travel plans in one place.
          </p>
        </div>

        <div className="booking-summary">
          <div>
            <strong>{bookings.length}</strong>
            <span>Total Trips</span>
          </div>

          <div>
            <strong>2</strong>
            <span>Confirmed</span>
          </div>
        </div>
      </div>

      {/* UPCOMING */}
      <div className="booking-section-title">
        <div>
          <h2>Upcoming Trips</h2>
          <p>Your active travel bookings</p>
        </div>
      </div>

      {/* BOOKING CARDS */}
      <div className="booking-list">

        {bookings.map((booking) => (
          <div className="booking-card" key={booking.id}>

            {/* TOP */}
            <div className="booking-card-top">

              <div className="booking-type">
                <div className="booking-icon">
                  {booking.type === "Flight" ? (
                    <Plane size={18} />
                  ) : (
                    <Hotel size={18} />
                  )}
                </div>

                <div>
                  <span>{booking.type}</span>
                  <strong>{booking.title}</strong>
                </div>
              </div>

              <div className="booking-status">
                <CheckCircle2 size={13} />
                {booking.status}
              </div>

            </div>

            {/* DETAILS */}
            <div className="booking-details">

              <div className="booking-route">
                <MapPin size={15} />
                <span>{booking.route}</span>
              </div>

              <div className="booking-detail">
                <CalendarDays size={15} />
                <div>
                  <small>Date</small>
                  <strong>{booking.date}</strong>
                </div>
              </div>

              <div className="booking-detail">
                <Clock size={15} />
                <div>
                  <small>Time / Stay</small>
                  <strong>{booking.time}</strong>
                </div>
              </div>

              <div className="booking-detail">
                <div>
                  <small>Details</small>
                  <strong>{booking.duration}</strong>
                </div>
              </div>

            </div>

            {/* FOOTER */}
            <div className="booking-card-footer">

              <div>
                <small>Total Fare</small>
                <strong>{booking.price}</strong>
              </div>

              <div className="booking-actions">
                <Link
  to={`/cancellations?booking=${booking.id}`}
  className="booking-cancel"
>
  <XCircle size={14} />
  Cancel
</Link>
                <button
                  type="button"
                  className="booking-view"
                  onClick={() =>
                    alert(`Booking ID: ${booking.id}`)
                  }
                >
                  View Details
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>

            {/* BOOKING ID */}
            <div className="booking-id">
              Booking ID: <strong>{booking.id}</strong>
            </div>

          </div>
        ))}

      </div>

      {/* EMPTY / INFO */}
      <div className="booking-info">

        <div className="booking-info-icon">
          <CalendarDays size={19} />
        </div>

        <div>
          <strong>Everything in one place</strong>

          <p>
            Track your upcoming trips, manage cancellations and access
            your booking details from your dashboard.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Bookings;