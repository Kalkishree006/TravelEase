import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Users,
  ArrowRight,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";

import "./Hotels.css";

const hotels = [
 
  {
    id: 2,
    name: "The Leela Palace",
    location: "New Delhi",
    rating: 4.8,
    reviews: 982,
    price: 9200,
    type: "Luxury",
    bookingId: "TE-2026-003",
  },
  {
    id: 3,
    name: "ITC Gardenia",
    location: "Bengaluru, Karnataka",
    rating: 4.6,
    reviews: 756,
    price: 7400,
    type: "Premium",
    bookingId: "TE-2026-004",
  },
  {
    id: 4,
    name: "Novotel Mumbai",
    location: "Mumbai, Maharashtra",
    rating: 4.4,
    reviews: 613,
    price: 5600,
    type: "Premium",
    bookingId: "TE-2026-005",
  },
];

function Hotels() {
  const [search, setSearch] = useState("");
  const [guestFilter, setGuestFilter] = useState("All");

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      hotel.location.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      guestFilter === "All" || hotel.type === guestFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="hotels-page">

      {/* HEADER */}
      <section className="hotels-header">
        <div>
          <span className="hotels-kicker">
            HOTEL BOOKING
          </span>

          <h1>
            Find your perfect stay
          </h1>

          <p>
            Discover comfortable hotels with transparent pricing and
            personalized options.
          </p>
        </div>

        <div className="hotel-header-icon">
          🏨
        </div>
      </section>

      {/* SEARCH */}
      <section className="hotel-search-card">

        <div className="hotel-search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search hotel or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="hotel-filter">
          <SlidersHorizontal size={15} />

          <select
            value={guestFilter}
            onChange={(e) =>
              setGuestFilter(e.target.value)
            }
          >
            <option value="All">
              All Hotels
            </option>

            <option value="Luxury">
              Luxury
            </option>

            <option value="Premium">
              Premium
            </option>
          </select>
        </div>

      </section>

      {/* RESULTS COUNT */}
      <div className="hotel-results-heading">
        <div>
          <strong>
            {filteredHotels.length} stays found
          </strong>

          <span>
            Available for your search
          </span>
        </div>
      </div>

      {/* HOTEL CARDS */}
      <section className="hotel-grid">

        {filteredHotels.map((hotel) => (

          <article
            className="hotel-card"
            key={hotel.id}
          >

            {/* IMAGE */}
            <div className="hotel-image">

              <div className="hotel-image-placeholder">
                🏨
              </div>

              <span className="hotel-type">
                {hotel.type}
              </span>

            </div>

            {/* CONTENT */}
            <div className="hotel-content">

              <div className="hotel-title-row">

                <div>
                  <h3>
                    {hotel.name}
                  </h3>

                  <div className="hotel-location">
                    <MapPin size={12} />
                    {hotel.location}
                  </div>
                </div>

                <div className="hotel-rating">
                  <Star
                    size={12}
                    fill="currentColor"
                  />

                  {hotel.rating}
                </div>

              </div>

              <div className="hotel-review">
                {hotel.reviews} traveller reviews
              </div>

              {/* PRICE + ACTIONS */}
              <div className="hotel-bottom">

                <div className="hotel-price">
                  <strong>
                    ₹{hotel.price.toLocaleString("en-IN")}
                  </strong>

                  <span>
                    / night
                  </span>
                </div>

                <div className="hotel-actions">

                  {/* SELECT ROOM */}
                  <Link
                    to="/seats-rooms"
                    className="hotel-book-button"
                  >
                    Select Room
                    <ArrowRight size={14} />
                  </Link>

                  {/* CANCEL */}
                  <Link
                    to={`/cancellations?booking=${hotel.bookingId}`}
                    className="hotel-cancel-button"
                  >
                    <XCircle size={14} />
                    Cancel
                  </Link>

                </div>

              </div>

            </div>

          </article>

        ))}

      </section>

      {/* EMPTY STATE */}
      {filteredHotels.length === 0 && (
        <div className="hotel-empty">

          <Search size={25} />

          <strong>
            No hotels found
          </strong>

          <span>
            Try another hotel or destination.
          </span>

        </div>
      )}

      {/* INFO */}
      <section className="hotel-info">

        <Users size={20} />

        <div>
          <strong>
            Flexible stay options
          </strong>

          <p>
            Compare hotels, check availability and select your
            preferred room before completing your booking.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Hotels;