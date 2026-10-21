import { Link } from "react-router-dom";
import {
  Plane,
  Clock3,
  MapPin,
  ArrowRight,
  Bell,
  Radio,
} from "lucide-react";

const flights = [
  {
    id: "AI202",
    airline: "Air India",
    from: "Chennai",
    fromCode: "MAA",
    to: "Delhi",
    toCode: "DEL",
    departure: "10:30 AM",
    arrival: "1:20 PM",
    status: "Delayed",
    delay: "20 min",
    reason: "Air traffic congestion",
  },
  {
    id: "6E418",
    airline: "IndiGo",
    from: "Bengaluru",
    fromCode: "BLR",
    to: "Mumbai",
    toCode: "BOM",
    departure: "12:15 PM",
    arrival: "2:05 PM",
    status: "Boarding",
    delay: "35 min",
    reason: "Passengers are now boarding",
  },
  {
    id: "UK955",
    airline: "Vistara",
    from: "Chennai",
    fromCode: "MAA",
    to: "Mumbai",
    toCode: "BOM",
    departure: "3:40 PM",
    arrival: "5:35 PM",
    status: "On Time",
    delay: "No delay",
    reason: "Flight operating normally",
  },
];

function FlightStatus() {
  return (
    <div className="status-page">

      <section className="status-header">

        <div>
          <div className="status-kicker">
            <Radio size={14} />
            LIVE FLIGHT TRACKING
          </div>

          <h1>Live Flight Status</h1>

          <p>
            Monitor departures, delays and arrival updates in one place.
          </p>
        </div>

        <Link to="/flights" className="status-book-button">
          Search Flights
          <ArrowRight size={15} />
        </Link>

      </section>

      <section className="status-live-banner">

        <div className="live-icon">
          <Radio size={20} />
        </div>

        <div>
          <strong>Live updates are active</strong>
          <span>
            Flight information is refreshed automatically for a realistic
            real-time tracking experience.
          </span>
        </div>

      </section>

      <section className="status-grid">

        {flights.map((flight) => (

          <div className="status-card" key={flight.id}>

            <div className="status-card-top">

              <div>
                <span className="airline-name">
                  {flight.airline}
                </span>

                <strong className="flight-number">
                  {flight.id}
                </strong>
              </div>

              <span
                className={`status-badge ${
                  flight.status === "Delayed"
                    ? "status-delayed"
                    : flight.status === "Boarding"
                    ? "status-boarding"
                    : "status-ontime"
                }`}
              >
                {flight.status}
              </span>

            </div>

            <div className="route-section">

              <div className="airport">

                <strong>{flight.fromCode}</strong>

                <span>{flight.from}</span>

                <small>{flight.departure}</small>

              </div>

              <div className="route-line">

                <div className="route-dot"></div>

                <div className="route-path"></div>

                <Plane size={17} />

                <div className="route-path"></div>

                <div className="route-dot"></div>

              </div>

              <div className="airport airport-right">

                <strong>{flight.toCode}</strong>

                <span>{flight.to}</span>

                <small>{flight.arrival}</small>

              </div>

            </div>

            <div className="status-details">

              <div>
                <Clock3 size={15} />
                <span>
                  {flight.delay === "No delay"
                    ? "On schedule"
                    : `Updated ${flight.delay}`}
                </span>
              </div>

              <div>
                <MapPin size={15} />
                <span>{flight.reason}</span>
              </div>

            </div>

            <div className="status-card-bottom">

              <button
                type="button"
                className="track-button"
                onClick={() =>
                  alert(`Tracking ${flight.id}`)
                }
              >
                <Bell size={14} />
                Track Flight
              </button>

              <span className="updated-text">
                Updated just now
              </span>

            </div>

          </div>

        ))}

      </section>

      <section className="status-info">

        <div className="status-info-icon">
          <Bell size={19} />
        </div>

        <div>
          <strong>Stay updated automatically</strong>
          <p>
            Track multiple flights and receive alerts when departure,
            delay or arrival information changes.
          </p>
        </div>

      </section>

    </div>
  );
}

export default FlightStatus;