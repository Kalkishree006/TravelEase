import { useEffect, useMemo, useState } from "react";
import {
  Plane,
  Hotel,
  Star,
  Users,
  RefreshCw,
  CheckCircle2,
  Lock,
  Sparkles,
  Save,
  Eye,
  X,
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

const rooms = [
  {
    id: "DLX-101",
    name: "Deluxe Room",
    type: "Standard",
    price: 6800,
    guests: "2 Guests",
    size: "320 sq.ft",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    features: ["King Bed", "Free Wi-Fi", "City View"],
  },
  {
    id: "PRE-202",
    name: "Premium City View",
    type: "Premium",
    price: 8200,
    guests: "2 Guests",
    size: "420 sq.ft",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    features: ["King Bed", "Breakfast", "City View"],
  },
  {
    id: "EXEC-303",
    name: "Executive Suite",
    type: "Upgrade",
    price: 10500,
    guests: "3 Guests",
    size: "560 sq.ft",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    features: ["King Bed", "Breakfast", "Lounge Access"],
  },
  {
    id: "FAM-404",
    name: "Family Suite",
    type: "Premium",
    price: 11800,
    guests: "4 Guests",
    size: "640 sq.ft",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
    features: ["2 Beds", "Breakfast", "Extra Space"],
  },
];

function SeatsRooms() {
  const [activeTab, setActiveTab] = useState("flight");

  const [seats, setSeats] = useState(initialSeats);

  const [selectedSeat, setSelectedSeat] = useState(
    localStorage.getItem("travelease-seat-preference") || ""
  );

  const [selectedRoom, setSelectedRoom] = useState(
    localStorage.getItem("travelease-room-preference") || ""
  );

  const [seatFilter, setSeatFilter] = useState("all");

  const [roomAvailability, setRoomAvailability] = useState({
    "DLX-101": true,
    "PRE-202": true,
    "EXEC-303": true,
    "FAM-404": true,
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const [previewRoom, setPreviewRoom] = useState(null);

  const [savedMessage, setSavedMessage] = useState("");

  const [refreshMessage, setRefreshMessage] = useState("");

  const selectedSeatData = seats.find(
    (seat) => seat.id === selectedSeat
  );

  const selectedRoomData = rooms.find(
    (room) => room.id === selectedRoom
  );

  const seatExtra =
    selectedSeatData?.type === "premium" ? 500 : 0;

  const roomExtra = selectedRoomData
    ? Math.max(selectedRoomData.price - 6800, 0)
    : 0;

  /*
   * REAL-TIME SIMULATION
   *
   * Every 10 seconds one seat and one room availability
   * can change automatically.
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

      setRoomAvailability((currentRooms) => {
        const roomIds = Object.keys(currentRooms);

        const randomRoomId =
          roomIds[
            Math.floor(Math.random() * roomIds.length)
          ];

        if (randomRoomId === selectedRoom) {
          return currentRooms;
        }

        return {
          ...currentRooms,
          [randomRoomId]:
            !currentRooms[randomRoomId],
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedSeat, selectedRoom]);

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

    setRoomAvailability((currentRooms) => {
      const roomIds = Object.keys(currentRooms);

      const randomRoomId =
        roomIds[
          Math.floor(Math.random() * roomIds.length)
        ];

      if (randomRoomId === selectedRoom) {
        return currentRooms;
      }

      return {
        ...currentRooms,
        [randomRoomId]:
          !currentRooms[randomRoomId],
      };
    });

    setRefreshMessage(
      "Availability refreshed successfully"
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
   * ROOM SELECTION
   */
  const handleRoomSelect = (room) => {
    if (!roomAvailability[room.id]) {
      return;
    }

    setSelectedRoom(room.id);

    setSavedMessage("");
  };

  /*
   * SAVE PREFERENCE
   */
  const savePreference = () => {
    if (activeTab === "flight" && selectedSeat) {
      localStorage.setItem(
        "travelease-seat-preference",
        selectedSeat
      );

      setSavedMessage(
        `Seat ${selectedSeat} preference saved`
      );
    }

    if (activeTab === "hotel" && selectedRoom) {
      localStorage.setItem(
        "travelease-room-preference",
        selectedRoom
      );

      setSavedMessage(
        `${selectedRoomData?.name} preference saved`
      );
    }

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  /*
   * FILTER LOGIC
   *
   * We don't remove seats from the map.
   * Instead, matching seats are highlighted.
   * This keeps the aircraft seat layout correct.
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
   * SEAT ROWS
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

      {/* HEADER */}
      <section className="sr-header">
        <div>
          <span className="sr-kicker">
            PERSONALIZED BOOKING
          </span>

          <h1>Choose your seat & stay</h1>

          <p>
            Select your preferred flight seat or hotel room,
            compare upgrades and save your preferences.
          </p>
        </div>

        <div className="sr-live">
          <span className="live-dot"></span>

          <div>
            <strong>Live availability</strong>

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
            title="Refresh availability"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </section>

      {/* REFRESH MESSAGE */}
      {refreshMessage && (
        <div className="refresh-message">
          <CheckCircle2 size={15} />
          {refreshMessage}
        </div>
      )}

      {/* TABS */}
      <div className="sr-tabs">

        <button
          type="button"
          className={
            activeTab === "flight"
              ? "active"
              : ""
          }
          onClick={() => setActiveTab("flight")}
        >
          <Plane size={16} />
          Flight Seats
        </button>

        <button
          type="button"
          className={
            activeTab === "hotel"
              ? "active"
              : ""
          }
          onClick={() => setActiveTab("hotel")}
        >
          <Hotel size={16} />
          Hotel Rooms
        </button>

      </div>

      {/* ================= FLIGHT ================= */}

      {activeTab === "flight" && (
        <section className="flight-selection">

          <div className="sr-section-head">

            <div>
              <span>AI202 · AIR INDIA</span>

              <h2>
                Chennai → Delhi
              </h2>

              <p>
                Select your preferred seat from
                the live seat map.
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

          {/* CLICKABLE FILTERS */}

          <div className="seat-legend">

            <button
              type="button"
              className={
                seatFilter === "all"
                  ? "legend-filter active"
                  : "legend-filter"
              }
              onClick={() =>
                setSeatFilter("all")
              }
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

          <div className="flight-layout">

            {/* SEAT MAP */}

            <div className="seat-map-card">

              <div className="aircraft-front">
                <Plane size={16} />
                Front of aircraft
              </div>

              <div className="seat-columns">
                <span>A</span>
                <span>B</span>
                <span>C</span>
                <span>D</span>
              </div>

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

              {/* MAP INFO */}

              <div className="seat-map-note">
                <span>
                  Click an available seat to select it.
                </span>

                <span>
                  Premium seats include +₹500.
                </span>
              </div>

            </div>

            {/* SEAT UPGRADE */}

            <div className="upgrade-card">

              <div className="upgrade-title">

                <Sparkles size={18} />

                <div>
                  <span>
                    SEAT UPGRADES
                  </span>

                  <h3>
                    More comfort, more choice
                  </h3>
                </div>

              </div>

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

              <div className="selection-summary">

                <span>
                  Selected Seat
                </span>

                <strong>
                  {selectedSeat || "None"}
                </strong>

              </div>

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

              <button
                type="button"
                className="save-preference"
                onClick={savePreference}
                disabled={!selectedSeat}
              >
                <Save size={15} />
                Save Seat Preference
              </button>

              {savedMessage &&
                activeTab === "flight" && (
                  <div className="saved-message">

                    <CheckCircle2 size={15} />

                    {savedMessage}

                  </div>
                )}

            </div>

          </div>

        </section>
      )}

      {/* ================= HOTEL ================= */}

      {activeTab === "hotel" && (
        <section className="hotel-selection">

          <div className="sr-section-head">

            <div>
              <span>
                HOTEL ROOM SELECTION
              </span>

              <h2>
                Choose your preferred room
              </h2>

              <p>
                Compare room types, upgrades,
                pricing and amenities before booking.
              </p>
            </div>

            <div className="availability-status">

              <span className="live-dot"></span>

              Live

              <small>
                Room availability
              </small>

            </div>

          </div>

          {/* HOTEL INFO */}

          <div className="room-info-banner">

            <div>

              <Hotel size={18} />

              <div>

                <strong>
                  Premium stay experience
                </strong>

                <span>
                  Room availability updates
                  automatically during selection.
                </span>

              </div>

            </div>

            <button
              type="button"
              onClick={refreshAvailability}
            >
              <RefreshCw size={14} />
              Refresh
            </button>

          </div>

          {/* ROOM GRID */}

          <div className="room-grid">

            {rooms.map((room) => {

              const isSelected =
                selectedRoom === room.id;

              const isAvailable =
                roomAvailability[room.id];

              return (
                <article
                  className={`room-card ${
                    isSelected
                      ? "selected-room"
                      : ""
                  } ${
                    !isAvailable
                      ? "room-unavailable"
                      : ""
                  }`}
                  key={room.id}
                >

                  <div className="room-image">

                    <img
                      src={room.image}
                      alt={room.name}
                    />

                    <span className="room-type-badge">
                      {room.type}
                    </span>

                    <button
                      type="button"
                      className="preview-button"
                      onClick={() =>
                        setPreviewRoom(room)
                      }
                    >
                      <Eye size={14} />
                      Preview
                    </button>

                  </div>

                  <div className="room-content">

                    <div className="room-title-row">

                      <div>

                        <h3>
                          {room.name}
                        </h3>

                        <div className="room-rating">

                          <Star
                            size={13}
                            fill="currentColor"
                          />

                          {room.rating}

                        </div>

                      </div>

                      <span
                        className={
                          isAvailable
                            ? "room-live"
                            : "room-live unavailable"
                        }
                      >

                        <span></span>

                        {isAvailable
                          ? "Available"
                          : "Currently booked"}

                      </span>

                    </div>

                    <div className="room-meta">

                      <span>
                        {room.guests}
                      </span>

                      <span>
                        {room.size}
                      </span>

                    </div>

                    <div className="room-features">

                      {room.features.map(
                        (feature) => (
                          <span key={feature}>
                            ✓ {feature}
                          </span>
                        )
                      )}

                    </div>

                    <div className="room-footer">

                      <div className="room-price">

                        <strong>
                          ₹
                          {room.price.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                        <span>
                          / night
                        </span>

                      </div>

                      <button
                        type="button"
                        disabled={!isAvailable}
                        className={
                          isSelected
                            ? "room-select selected"
                            : "room-select"
                        }
                        onClick={() =>
                          handleRoomSelect(
                            room
                          )
                        }
                      >

                        {isSelected ? (
                          <>
                            <CheckCircle2
                              size={15}
                            />
                            Selected
                          </>
                        ) : isAvailable ? (
                          "Select Room"
                        ) : (
                          "Unavailable"
                        )}

                      </button>

                    </div>

                    {room.price > 6800 && (
                      <div className="upgrade-price">

                        Upgrade from standard

                        <strong>
                          +₹
                          {(
                            room.price - 6800
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>
                    )}

                  </div>

                </article>
              );
            })}

          </div>

          {/* HOTEL SUMMARY */}

          <div className="hotel-selection-summary">

            <div>

              <span>
                Selected Room
              </span>

              <strong>
                {selectedRoomData
                  ? selectedRoomData.name
                  : "No room selected"}
              </strong>

            </div>

            <div>

              <span>
                Room Price
              </span>

              <strong>
                {selectedRoomData
                  ? `₹${selectedRoomData.price.toLocaleString(
                      "en-IN"
                    )}`
                  : "—"}
              </strong>

            </div>

            <div>

              <span>
                Upgrade Amount
              </span>

              <strong className="upgrade-green">
                +₹
                {roomExtra.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <button
              type="button"
              className="save-preference"
              onClick={savePreference}
              disabled={!selectedRoom}
            >
              <Save size={15} />
              Save Room Preference
            </button>

          </div>

          {savedMessage &&
            activeTab === "hotel" && (
              <div className="saved-message hotel-saved">

                <CheckCircle2 size={15} />

                {savedMessage}

              </div>
            )}

        </section>
      )}

      {/* ================= PREVIEW MODAL ================= */}

      {previewRoom && (
        <div
          className="preview-overlay"
          onClick={() =>
            setPreviewRoom(null)
          }
        >

          <div
            className="preview-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="preview-close"
              onClick={() =>
                setPreviewRoom(null)
              }
            >
              <X size={18} />
            </button>

            <img
              src={previewRoom.image}
              alt={previewRoom.name}
            />

            <div className="preview-modal-content">

              <span>
                {previewRoom.type}
              </span>

              <h2>
                {previewRoom.name}
              </h2>

              <p>
                Visual room preview to help
                you compare your stay before
                selecting.
              </p>

              <div>

                <strong>
                  ₹
                  {previewRoom.price.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <small>
                  {" "}
                  / night
                </small>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default SeatsRooms;