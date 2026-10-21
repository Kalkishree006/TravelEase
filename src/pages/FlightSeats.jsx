import { useEffect, useMemo, useState } from "react";
import {
  Plane,
  Star,
  Users,
  RefreshCw,
  CheckCircle2,
  Lock,
  Sparkles,
  Save,
} from "lucide-react";

import "./SeatsRooms.css";

const initialSeats = [
  { id: "1A", type: "standard", status: "available" },
  { id: "1B", type: "premium", status: "available" },
  { id: "1C", type: "premium", status: "occupied" },
  { id: "1D", type: "standard", status: "available" },

  { id: "2A", type: "standard", status: "occupied" },
  { id: "2B", type: "standard", status: "available" },
  { id: "2C", type: "standard", status: "available" },
  { id: "2D", type: "standard", status: "occupied" },

  { id: "3A", type: "premium", status: "available" },
  { id: "3B", type: "premium", status: "available" },
  { id: "3C", type: "premium", status: "occupied" },
  { id: "3D", type: "premium", status: "available" },

  { id: "4A", type: "standard", status: "available" },
  { id: "4B", type: "standard", status: "occupied" },
  { id: "4C", type: "standard", status: "available" },
  { id: "4D", type: "standard", status: "available" },

  { id: "5A", type: "standard", status: "available" },
  { id: "5B", type: "standard", status: "available" },
  { id: "5C", type: "standard", status: "occupied" },
  { id: "5D", type: "standard", status: "available" },
];

function FlightSeats() {
  const [seats, setSeats] = useState(initialSeats);

  const [selectedSeat, setSelectedSeat] = useState(
    localStorage.getItem("travelease-seat-preference") || ""
  );

  const [seatFilter, setSeatFilter] = useState("all");

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const [savedMessage, setSavedMessage] = useState("");

  const [refreshMessage, setRefreshMessage] = useState("");

  /*
   * SELECTED SEAT DATA
   */
  const selectedSeatData = seats.find(
    (seat) => seat.id === selectedSeat
  );

  /*
   * PREMIUM SEAT EXTRA PRICE
   */
  const seatExtra =
    selectedSeatData?.type === "premium" ? 500 : 0;

  /*
   * REAL-TIME SEAT AVAILABILITY SIMULATION
   *
   * Every 10 seconds one seat can change
   * between available and occupied.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());

      setSeats((currentSeats) => {
        const changeableSeats = currentSeats.filter(
          (seat) => seat.id !== selectedSeat
        );

        if (changeableSeats.length === 0) {
          return currentSeats;
        }

        const randomIndex = Math.floor(
          Math.random() * changeableSeats.length
        );

        const targetSeat = changeableSeats[randomIndex];

        return currentSeats.map((seat) => {
          if (seat.id !== targetSeat.id) {
            return seat;
          }

          return {
            ...seat,
            status:
              seat.status === "occupied"
                ? "available"
                : "occupied",
          };
        });
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedSeat]);

  /*
   * MANUAL REFRESH
   */
  const refreshAvailability = () => {
    setLastUpdated(new Date());

    setSeats((currentSeats) => {
      const changeableSeats = currentSeats.filter(
        (seat) => seat.id !== selectedSeat
      );

      if (changeableSeats.length === 0) {
        return currentSeats;
      }

      const randomIndex = Math.floor(
        Math.random() * changeableSeats.length
      );

      const targetSeat = changeableSeats[randomIndex];

      return currentSeats.map((seat) => {
        if (seat.id !== targetSeat.id) {
          return seat;
        }

        return {
          ...seat,
          status:
            seat.status === "occupied"
              ? "available"
              : "occupied",
        };
      });
    });

    setRefreshMessage(
      "Seat availability refreshed successfully"
    );

    setTimeout(() => {
      setRefreshMessage("");
    }, 2500);
  };

  /*
   * SEAT SELECTION
   */
  const handleSeatSelect = (seat) => {
    if (seat.status === "occupied") {
      return;
    }

    setSelectedSeat(
      selectedSeat === seat.id ? "" : seat.id
    );

    setSavedMessage("");
  };

  /*
   * SAVE SEAT PREFERENCE
   */
  const savePreference = () => {
    if (!selectedSeat) {
      return;
    }

    localStorage.setItem(
      "travelease-seat-preference",
      selectedSeat
    );

    setSavedMessage(
      `Seat ${selectedSeat} preference saved successfully`
    );

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  /*
   * FILTER LOGIC
   *
   * Seats are not removed from the aircraft layout.
   * Non-matching seats are simply dimmed.
   */
  const isSeatMatchingFilter = (seat) => {
    if (seatFilter === "all") {
      return true;
    }

    if (seatFilter === "available") {
      return seat.status === "available";
    }

    if (seatFilter === "occupied") {
      return seat.status === "occupied";
    }

    if (seatFilter === "premium") {
      return seat.type === "premium";
    }

    return true;
  };

  /*
   * CREATE SEAT ROWS
   */
  const seatRows = useMemo(() => {
    const rows = [];

    for (let i = 0; i < seats.length; i += 4) {
      rows.push(seats.slice(i, i + 4));
    }

    return rows;
  }, [seats]);

  return (
    <div className="sr-page">

      {/* ================= HEADER ================= */}

      <section className="sr-header">

        <div>
          <span className="sr-kicker">
            FLIGHT SEAT SELECTION
          </span>

          <h1>
            Choose your preferred seat
          </h1>

          <p>
            Select an available seat for your
            Air India flight and save your preference.
          </p>
        </div>

        <div className="sr-live">

          <span className="live-dot"></span>

          <div>
            <strong>
              Live availability
            </strong>

            <small>
              Updated{" "}
              {lastUpdated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>

          <button
            type="button"
            onClick={refreshAvailability}
            title="Refresh seat availability"
          >
            <RefreshCw size={15} />
          </button>

        </div>

      </section>

      {/* ================= REFRESH MESSAGE ================= */}

      {refreshMessage && (
        <div className="refresh-message">

          <CheckCircle2 size={15} />

          {refreshMessage}

        </div>
      )}

      {/* ================= FLIGHT INFO ================= */}

      <section className="flight-selection">

        <div className="sr-section-head">

          <div>

            <span>
              AI202 · AIR INDIA
            </span>

            <h2>
              Chennai → Delhi
            </h2>

            <p>
              28 Sep 2026 · 10:30 AM
              &nbsp;•&nbsp;
              2h 50m
            </p>

          </div>

          <div className="availability-status">

            <span className="live-dot"></span>

            Live

            <small>
              Seat availability
            </small>

          </div>

        </div>

        {/* ================= SEAT FILTERS ================= */}

        <div className="seat-legend">

          <button
            type="button"
            className={
              seatFilter === "all"
                ? "legend-filter active"
                : "legend-filter"
            }
            onClick={() => setSeatFilter("all")}
          >
            <i className="legend available"></i>
            All Seats
          </button>

          <button
            type="button"
            className={
              seatFilter === "available"
                ? "legend-filter active"
                : "legend-filter"
            }
            onClick={() =>
              setSeatFilter("available")
            }
          >
            <i className="legend available"></i>
            Available
          </button>

          <button
            type="button"
            className={
              seatFilter === "occupied"
                ? "legend-filter active"
                : "legend-filter"
            }
            onClick={() =>
              setSeatFilter("occupied")
            }
          >
            <i className="legend occupied"></i>
            Occupied
          </button>

          <button
            type="button"
            className={
              seatFilter === "premium"
                ? "legend-filter active"
                : "legend-filter"
            }
            onClick={() =>
              setSeatFilter("premium")
            }
          >
            <i className="legend premium"></i>
            Premium +₹500
          </button>

        </div>

        {/* ================= MAIN FLIGHT LAYOUT ================= */}

        <div className="flight-layout">

          {/* ================= SEAT MAP ================= */}

          <div className="seat-map-card">

            <div className="aircraft-front">

              <Plane size={16} />

              Front of aircraft

            </div>

            {/* COLUMN LABELS */}

            <div className="seat-columns">

              <span>A</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>

            </div>

            {/* SEAT GRID */}

            <div className="seat-grid">

              {seatRows.map(
                (row, rowIndex) => (
                  <div
                    className="seat-row"
                    key={rowIndex}
                  >

                    <small>
                      {rowIndex + 1}
                    </small>

                    {row.map((seat) => {

                      const matchesFilter =
                        isSeatMatchingFilter(
                          seat
                        );

                      return (
                        <button
                          type="button"
                          key={seat.id}
                          disabled={
                            seat.status ===
                            "occupied"
                          }
                          className={[
                            "seat",
                            seat.type,
                            seat.status,
                            selectedSeat ===
                            seat.id
                              ? "selected"
                              : "",
                            !matchesFilter
                              ? "filter-dimmed"
                              : "",
                          ].join(" ")}
                          onClick={() =>
                            handleSeatSelect(
                              seat
                            )
                          }
                        >

                          {seat.status ===
                          "occupied" ? (
                            <Lock size={13} />
                          ) : (
                            seat.id
                          )}

                        </button>
                      );
                    })}

                  </div>
                )
              )}

            </div>

            {/* MAP NOTE */}

            <div className="seat-map-note">

              <span>
                Click an available seat to select it.
              </span>

              <span>
                Premium seats include +₹500.
              </span>

            </div>

          </div>

          {/* ================= SEAT SUMMARY ================= */}

          <div className="upgrade-card">

            <div className="upgrade-title">

              <Sparkles size={18} />

              <div>

                <span>
                  SEAT OPTIONS
                </span>

                <h3>
                  More comfort, more choice
                </h3>

              </div>

            </div>

            {/* PREMIUM */}

            <div className="upgrade-item">

              <div className="upgrade-icon">

                <Star size={17} />

              </div>

              <div>

                <strong>
                  Premium Seat
                </strong>

                <span>
                  Preferred position & extra comfort
                </span>

              </div>

              <b>
                +₹500
              </b>

            </div>

            {/* EXTRA LEGROOM */}

            <div className="upgrade-item">

              <div className="upgrade-icon">

                <Users size={17} />

              </div>

              <div>

                <strong>
                  Extra Legroom
                </strong>

                <span>
                  More space to stretch
                </span>

              </div>

              <b>
                +₹800
              </b>

            </div>

            {/* SELECTED SEAT */}

            <div className="selection-summary">

              <span>
                Selected Seat
              </span>

              <strong>
                {selectedSeat || "None"}
              </strong>

            </div>

            {/* ADDITIONAL PRICE */}

            <div className="price-summary">

              <span>
                Additional price
              </span>

              <strong>
                +₹
                {seatExtra.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            {/* SAVE */}

            <button
              type="button"
              className="save-preference"
              onClick={savePreference}
              disabled={!selectedSeat}
            >

              <Save size={15} />

              Save Seat Preference

            </button>

            {/* SUCCESS */}

            {savedMessage && (
              <div className="saved-message">

                <CheckCircle2 size={15} />

                {savedMessage}

              </div>
            )}

          </div>

        </div>

      </section>

    </div>
  );
}

export default FlightSeats;