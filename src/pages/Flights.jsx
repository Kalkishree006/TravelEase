import { useEffect, useState } from "react";
import {
  Search,
  Plane,
  Clock3,
  MapPin,
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  Radio,
} from "lucide-react";

const initialFlights = [
  {
    id: "AI202",
    airline: "Air India",
    from: "Chennai",
    fromCode: "MAA",
    to: "Delhi",
    toCode: "DEL",
    departure: "10:30 AM",
    arrival: "01:20 PM",
    duration: "2h 50m",
    status: "On Time",
    price: 5200,
    delayMinutes: 0,
    reason: "No delay reported",
  },
  {
    id: "6E418",
    airline: "IndiGo",
    from: "Bengaluru",
    fromCode: "BLR",
    to: "Mumbai",
    toCode: "BOM",
    departure: "12:15 PM",
    arrival: "02:05 PM",
    duration: "1h 50m",
    status: "Delayed",
    price: 4300,
    delayMinutes: 35,
    reason: "Weather conditions at departure airport",
  },
  {
    id: "UK955",
    airline: "Vistara",
    from: "Chennai",
    fromCode: "MAA",
    to: "Mumbai",
    toCode: "BOM",
    departure: "03:40 PM",
    arrival: "05:35 PM",
    duration: "1h 55m",
    status: "Boarding",
    price: 6100,
    delayMinutes: 0,
    reason: "Boarding in progress",
  },
];

function Flights() {
  const [flights, setFlights] = useState(initialFlights);

  const [search, setSearch] = useState("");

  const [trackedFlights, setTrackedFlights] = useState([]);

  const [selectedFlight, setSelectedFlight] = useState(null);

  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);

  /* =========================
     MOCK REAL-TIME FLIGHT API
  ========================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setFlights((currentFlights) => {
        const updatedFlights = currentFlights.map((flight) => {
          const random = Math.random();

          // Only simulate changes occasionally
          if (random > 0.45) {
            return flight;
          }

          let newStatus = flight.status;
          let newDelay = flight.delayMinutes;
          let newReason = flight.reason;

          if (flight.status === "On Time") {
            newStatus = "Delayed";
            newDelay = 20;
            newReason = "Air traffic congestion";
          } else if (flight.status === "Delayed") {
            newStatus = "Boarding";
            newDelay = flight.delayMinutes;
            newReason = "Passengers are now boarding";
          } else {
            newStatus = "On Time";
            newDelay = 0;
            newReason = "Flight operating normally";
          }

          const updatedFlight = {
            ...flight,
            status: newStatus,
            delayMinutes: newDelay,
            reason: newReason,
          };

          /* Notification only for tracked flights */
          if (trackedFlights.includes(flight.id)) {
            const message =
              newStatus === "Delayed"
                ? `${flight.id} is delayed by ${newDelay} minutes.`
                : `${flight.id} status changed to ${newStatus}.`;

            addNotification(
              `${flight.airline} ${flight.id}`,
              message,
              newStatus
            );

            /* Browser notification */
            if (
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              new Notification(`TravelEase • ${flight.id}`, {
                body: message,
              });
            }
          }

          return updatedFlight;
        });

        /* Update selected modal flight */
        setSelectedFlight((selected) => {
          if (!selected) return null;

          return (
            updatedFlights.find((flight) => flight.id === selected.id) ||
            selected
          );
        });

        return updatedFlights;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [trackedFlights]);

  /* =========================
     NOTIFICATION
  ========================= */

  const addNotification = (title, message, status) => {
    const newNotification = {
      id: Date.now(),
      title,
      message,
      status,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setNotifications((current) => [
      newNotification,
      ...current.slice(0, 4),
    ]);
  };

  /* =========================
     TRACK FLIGHT
  ========================= */

  const trackFlight = async (flight) => {
    if (!trackedFlights.includes(flight.id)) {
      setTrackedFlights((current) => [...current, flight.id]);

      addNotification(
        `${flight.airline} ${flight.id}`,
        `You are now tracking this flight.`,
        flight.status
      );
    }

    /* Ask browser notification permission */
    if (
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      await Notification.requestPermission();
    }
  };

  const stopTracking = (flightId) => {
    setTrackedFlights((current) =>
      current.filter((id) => id !== flightId)
    );
  };

  /* =========================
     SEARCH
  ========================= */

  const filteredFlights = flights.filter((flight) => {
    const value = search.toLowerCase();

    return (
      flight.from.toLowerCase().includes(value) ||
      flight.to.toLowerCase().includes(value) ||
      flight.id.toLowerCase().includes(value) ||
      flight.airline.toLowerCase().includes(value)
    );
  });

  /* =========================
     STATUS CLASS
  ========================= */

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(" ", "-");
  };

  return (
    <section className="flights-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="page-heading">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          <div>
            <p className="eyebrow">LIVE FLIGHT TRACKING</p>

            <h1>Find your next flight</h1>

            <p>
              Search flights and stay updated with live journey information.
            </p>
          </div>

          {/* Notification button */}
          <button
            className="notification-btn"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            title="Notifications"
          >
            <Bell size={19} />

            {notifications.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  marginTop: "-24px",
                  marginLeft: "25px",
                  background: "#ef4444",
                  color: "white",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {notifications.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* =========================
          NOTIFICATION PANEL
      ========================= */}

      {showNotifications && (
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto 20px",
            background: "white",
            border: "1px solid #e5e8ef",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 12px 35px rgba(20,30,50,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <strong>Flight Notifications</strong>

            <button
              onClick={() => setNotifications([])}
              style={{
                border: "none",
                background: "transparent",
                color: "#667085",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Clear all
            </button>
          </div>

          {notifications.length === 0 ? (
            <p
              style={{
                color: "#7a8494",
                fontSize: "13px",
              }}
            >
              No new flight updates.
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px 0",
                  borderTop: "1px solid #edf0f5",
                }}
              >
                {notification.status === "Delayed" ? (
                  <AlertTriangle
                    size={18}
                    color="#d97706"
                  />
                ) : (
                  <CheckCircle2
                    size={18}
                    color="#238443"
                  />
                )}

                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "13px",
                    }}
                  >
                    {notification.title}
                  </strong>

                  <p
                    style={{
                      margin: "4px 0",
                      color: "#667085",
                      fontSize: "12px",
                    }}
                  >
                    {notification.message}
                  </p>

                  <span
                    style={{
                      color: "#98a2b3",
                      fontSize: "11px",
                    }}
                  >
                    {notification.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* =========================
          TRACKING SUMMARY
      ========================= */}

      {trackedFlights.length > 0 && (
        <div className="tracking-summary">

          <div>
            <Radio size={20} />

            <div>
              <strong>
                {trackedFlights.length} flight
                {trackedFlights.length > 1 ? "s" : ""} being tracked
              </strong>

              <p>
                Live mock updates are enabled. You will receive
                notifications when the flight status changes.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* =========================
          SEARCH
      ========================= */}

      <div className="flight-search">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search airline, flight number or destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* =========================
          FLIGHT LIST
      ========================= */}

      <div className="flight-list">

        {filteredFlights.map((flight) => {

          const isTracked = trackedFlights.includes(flight.id);

          return (
            <div
              className="flight-card"
              key={flight.id}
            >

              {/* Airline */}

              <div className="airline-info">

                <div className="airline-icon">
                  <Plane size={20} />
                </div>

                <div>
                  <strong>{flight.airline}</strong>
                  <span>{flight.id}</span>
                </div>

              </div>

              {/* Route */}

              <div className="route">

                <div>
                  <strong>{flight.departure}</strong>
                  <span>{flight.fromCode}</span>
                </div>

                <div className="route-line">
                  <Clock3 size={15} />
                  <span>{flight.duration}</span>
                </div>

                <div>
                  <strong>{flight.arrival}</strong>
                  <span>{flight.toCode}</span>
                </div>

              </div>

              {/* Destination */}

              <div className="destination">

                <MapPin size={15} />

                {flight.from} → {flight.to}

              </div>

              {/* Right side */}

              <div className="flight-right">

                <span
                  className={`flight-status ${getStatusClass(
                    flight.status
                  )}`}
                >
                  ● {flight.status}
                </span>

                <strong>
                  ₹{flight.price.toLocaleString()}
                </strong>

                <button
                  onClick={() =>
                    setSelectedFlight(flight)
                  }
                >
                  View Status
                </button>

                <button
                  onClick={() =>
                    isTracked
                      ? stopTracking(flight.id)
                      : trackFlight(flight)
                  }
                  style={{
                    background: isTracked
                      ? "#eef2f7"
                      : "#2563eb",
                    color: isTracked
                      ? "#475467"
                      : "white",
                  }}
                >
                  {isTracked
                    ? "Stop Tracking"
                    : "Track Flight"}
                </button>

              </div>

            </div>
          );
        })}

      </div>

      {/* =========================
          EMPTY SEARCH
      ========================= */}

      {filteredFlights.length === 0 && (
        <div className="no-flights">

          <Plane size={32} />

          <h3>No flights found</h3>

          <p>
            Try searching using an airline, flight number
            or destination.
          </p>

        </div>
      )}

      {/* =========================
          FLIGHT STATUS MODAL
      ========================= */}

      {selectedFlight && (
        <div
          className="flight-modal-overlay"
          onClick={() => setSelectedFlight(null)}
        >

          <div
            className="flight-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={() =>
                setSelectedFlight(null)
              }
            >
              <X size={18} />
            </button>

            <div className="modal-flight-icon">
              <Plane size={24} />
            </div>

            <p className="eyebrow">
              LIVE FLIGHT STATUS
            </p>

            <h2>
              {selectedFlight.id} —{" "}
              {selectedFlight.airline}
            </h2>

            <p className="modal-route">
              {selectedFlight.from} (
              {selectedFlight.fromCode}) →{" "}
              {selectedFlight.to} (
              {selectedFlight.toCode})
            </p>

            <span
              className={`live-status ${getStatusClass(
                selectedFlight.status
              )}`}
            >
              ● {selectedFlight.status}
            </span>

            <div className="status-grid">

              <div>
                <span>Original Departure</span>
                <strong>
                  {initialFlights.find(
                    (f) => f.id === selectedFlight.id
                  )?.departure}
                </strong>
              </div>

              <div>
                <span>Updated Departure</span>
                <strong>
                  {selectedFlight.departure}
                  {selectedFlight.delayMinutes > 0 &&
                    ` (+${selectedFlight.delayMinutes} min)`}
                </strong>
              </div>

              <div>
                <span>Original Arrival</span>
                <strong>
                  {
                    initialFlights.find(
                      (f) => f.id === selectedFlight.id
                    )?.arrival
                  }
                </strong>
              </div>

              <div>
                <span>Estimated Arrival</span>
                <strong>
                  {selectedFlight.arrival}
                </strong>
              </div>

              <div>
                <span>Flight Duration</span>
                <strong>
                  {selectedFlight.duration}
                </strong>
              </div>

              <div>
                <span>Update Reason</span>
                <strong>
                  {selectedFlight.reason}
                </strong>
              </div>

            </div>

            <button
              className="track-button"
              onClick={() =>
                trackedFlights.includes(selectedFlight.id)
                  ? stopTracking(selectedFlight.id)
                  : trackFlight(selectedFlight)
              }
            >
              <Bell size={17} />

              {trackedFlights.includes(selectedFlight.id)
                ? "Stop Tracking"
                : "Track This Flight"}
            </button>

          </div>

        </div>
      )}

    </section>
  );
}

export default Flights;