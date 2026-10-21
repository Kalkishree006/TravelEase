import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  Hotel,
  Search,
  ArrowRight,
  Clock3,
  IndianRupee,
  ShieldCheck,
  Armchair,
  Star,
  Sparkles,
  RefreshCcw,
  MapPin,
  ArrowLeftRight,
} from "lucide-react";

const features = [
  {
    icon: Clock3,
    title: "Live Flight Status",
    text: "Track flights with real-time-like status and delay updates.",
    link: "/flight-status",
    button: "Track Flights",
  },
  {
    icon: IndianRupee,
    title: "Smart Pricing",
    text: "See demand-based fares, price history and price freeze.",
    link: "/pricing",
    button: "View Pricing",
  },
  {
    icon: RefreshCcw,
    title: "Cancellation & Refund",
    text: "Cancel bookings and track your refund status easily.",
    link: "/cancellations",
    button: "Manage Refund",
  },
  {
    icon: Armchair,
    title: "Seat & Room Selection",
    text: "Choose seats and hotel rooms based on availability.",
    link: "/seats-rooms",
    button: "Select Now",
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    text: "Share your experience and explore traveller reviews.",
    link: "/reviews",
    button: "View Reviews",
  },
  {
    icon: Sparkles,
    title: "Personalized For You",
    text: "Get recommendations based on your travel preferences.",
    link: "/recommendations",
    button: "Explore",
  },
];

const airports = [
  { city: "Chennai", code: "MAA" },
  { city: "Delhi", code: "DEL" },
  { city: "Bengaluru", code: "BLR" },
  { city: "Mumbai", code: "BOM" },
];

function Home() {
  const [from, setFrom] = useState("Chennai");
  const [to, setTo] = useState("Delhi");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchText, setSearchText] = useState("");

  const getAirport = (city) =>
    airports.find((airport) => airport.city === city) || airports[0];

  const selectAirport = (type, city) => {
    if (type === "from") {
      setFrom(city);
    } else {
      setTo(city);
    }

    setActiveDropdown(null);
    setSearchText("");
  };

  const swapAirports = () => {
    setFrom(to);
    setTo(from);
    setActiveDropdown(null);
    setSearchText("");
  };

  const renderAirportDropdown = (type, selectedCity) => {
    const selectedAirport = getAirport(selectedCity);

    const filteredAirports = airports.filter((airport) =>
      `${airport.city} ${airport.code}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

    return (
      <div className="te-airport-wrapper">
        <button
          type="button"
          className={`te-airport-trigger ${
            activeDropdown === type ? "te-airport-trigger-active" : ""
          }`}
          onClick={() => {
            setActiveDropdown(activeDropdown === type ? null : type);
            setSearchText("");
          }}
          aria-expanded={activeDropdown === type}
          aria-label={`Select ${type === "from" ? "departure" : "destination"} airport`}
        >
          <span className="te-airport-pin">
            <MapPin size={20} />
          </span>

          <span className="te-airport-text">
            <span className="te-airport-label">
              {type === "from" ? "FROM" : "TO"}
            </span>

            <strong>{selectedAirport.city}</strong>

            <small>{selectedAirport.code}</small>
          </span>

          <span className="te-airport-chevron">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m7 10 5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {activeDropdown === type && (
          <>
            <button
              type="button"
              className="te-dropdown-backdrop"
              aria-label="Close airport dropdown"
              onClick={() => {
                setActiveDropdown(null);
                setSearchText("");
              }}
            />

            <div className="te-airport-menu">
              <div className="te-airport-menu-heading">
                <strong>
                  {type === "from"
                    ? "Choose departure city"
                    : "Choose destination"}
                </strong>
                <span>India · Airports</span>
              </div>

              <div className="te-airport-search">
                <Search size={17} />

                <input
                  type="text"
                  placeholder="Search city or airport code"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  autoFocus
                />
              </div>

              <div className="te-airport-options">
                {filteredAirports.map((airport) => {
                  const isSelected = airport.city === selectedCity;

                  return (
                    <button
                      type="button"
                      key={airport.code}
                      className={`te-airport-option ${
                        isSelected ? "te-airport-option-selected" : ""
                      }`}
                      onClick={() =>
                        selectAirport(type, airport.city)
                      }
                    >
                      <span className="te-option-icon">
                        <Plane size={17} />
                      </span>

                      <span className="te-option-city">
                        <strong>{airport.city}</strong>
                        <small>{airport.code} · India</small>
                      </span>

                      {isSelected && (
                        <span className="te-option-check">✓</span>
                      )}
                    </button>
                  );
                })}

                {filteredAirports.length === 0 && (
                  <p className="te-airport-empty">
                    No matching airports found.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="home-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            Smart Travel Booking Platform
          </div>

          <h1>
            Travel smarter.
            <br />
            <span>Travel with confidence.</span>
          </h1>

          <p>
            Book flights and hotels, track your journey, manage prices,
            cancellations, seats and more — all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/flights" className="hero-primary">
              <Plane size={17} />
              Search Flights
              <ArrowRight size={16} />
            </Link>

            <Link to="/hotels" className="hero-secondary">
              <Hotel size={17} />
              Explore Hotels
            </Link>
          </div>
        </div>

        {/* QUICK SEARCH */}
        <div
          className="hero-search-card"
          onClick={(event) => {
            if (!event.target.closest(".te-airport-wrapper")) {
              setActiveDropdown(null);
            }
          }}
        >
          <div className="search-card-header">
            <div>
              <span className="small-label">QUICK SEARCH</span>
              <h3>Where are you going?</h3>
              <p className="te-search-subtitle">
                Choose your departure and destination.
              </p>
            </div>

            <div className="search-icon">
              <Search size={21} />
            </div>
          </div>

          <div className="search-fields te-search-fields">
            {renderAirportDropdown("from", from)}

            <button
              type="button"
              className="te-swap-button"
              onClick={swapAirports}
              aria-label="Swap departure and destination"
              title="Swap cities"
            >
              <ArrowLeftRight size={19} />
            </button>

            {renderAirportDropdown("to", to)}
          </div>

          <Link
            to={`/flights?from=${encodeURIComponent(
              from
            )}&to=${encodeURIComponent(to)}`}
            className="search-button"
          >
            Search Flights
            <ArrowRight size={17} />
          </Link>

          {from === to && (
            <p className="te-search-warning">
              Choose two different cities to plan your journey.
            </p>
          )}
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="home-stats">
        <div className="stat-card">
          <Plane size={20} />
          <div>
            <strong>Live Tracking</strong>
            <span>Flight status updates</span>
          </div>
        </div>

        <div className="stat-card">
          <IndianRupee size={20} />
          <div>
            <strong>Dynamic Pricing</strong>
            <span>Transparent fares</span>
          </div>
        </div>

        <div className="stat-card">
          <ShieldCheck size={20} />
          <div>
            <strong>Easy Refunds</strong>
            <span>Clear cancellation policy</span>
          </div>
        </div>

        <div className="stat-card">
          <Sparkles size={20} />
          <div>
            <strong>Smart Recommendations</strong>
            <span>Personalized travel</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="home-features">
        <div className="section-heading">
          <div>
            <span className="section-kicker">TRAVELEASE FEATURES</span>
            <h2>Everything you need for your journey</h2>
            <p>
              One platform for booking, managing and improving your travel
              experience.
            </p>
          </div>
        </div>

        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                to={feature.link}
                className="feature-card"
                key={feature.title}
              >
                <div className="feature-icon">
                  <Icon size={20} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.text}</p>

                <div className="feature-link">
                  {feature.button}
                  <ArrowRight size={15} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div>
          <span className="section-kicker">READY TO TRAVEL?</span>

          <h2>
            Plan your next journey
            <br />
            with TravelEase.
          </h2>

          <p>
            Search flights, compare prices and manage your complete trip
            from one simple dashboard.
          </p>
        </div>

        <Link to="/flights" className="cta-button">
          Start Exploring
          <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}

export default Home;