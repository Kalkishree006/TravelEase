import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Plane,
  Hotel,
  LayoutDashboard,
  Star,
  Sparkles,
  User,
  Menu,
  X,
  ChevronDown,
  Clock3,
  IndianRupee,
  RefreshCcw,
  Armchair,
  BedDouble,
  ArrowLeft,
} from "lucide-react";

import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => {
    setMenuOpen(false);
    setToolsOpen(false);
  };

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }

    closeMenu();
  };

  return (
    <nav className="travel-navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <Link to="/" className="travel-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <Plane size={17} />
          </div>
          <span>TravelEase</span>
        </Link>

        {/* BACK BUTTON - DESKTOP */}
        <button
          type="button"
          className="navbar-back-btn"
          onClick={goBack}
          title="Go back"
        >
          <ArrowLeft size={15} />
          <span>Back</span>
        </button>

        {/* DESKTOP NAVIGATION */}
        <div className="navbar-links">

          <Link
            to="/"
            className={isActive("/") ? "nav-link active" : "nav-link"}
          >
            Home
          </Link>

          <Link
            to="/flights"
            className={isActive("/flights") ? "nav-link active" : "nav-link"}
          >
            <Plane size={15} />
            Flights
          </Link>

          <Link
            to="/hotels"
            className={isActive("/hotels") ? "nav-link active" : "nav-link"}
          >
            <Hotel size={15} />
            Hotels
          </Link>

          <Link
            to="/bookings"
            className={isActive("/bookings") ? "nav-link active" : "nav-link"}
          >
            <LayoutDashboard size={15} />
            Bookings
          </Link>

          <Link
            to="/reviews"
            className={isActive("/reviews") ? "nav-link active" : "nav-link"}
          >
            <Star size={15} />
            Reviews
          </Link>

          <Link
            to="/recommendations"
            className={
              isActive("/recommendations")
                ? "nav-link active"
                : "nav-link"
            }
          >
            <Sparkles size={15} />
            For You
          </Link>

          {/* TRAVEL TOOLS */}
          <div className="tools-wrapper">
            <button
              type="button"
              className="tools-button"
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              Travel Tools
              <ChevronDown
                size={15}
                className={toolsOpen ? "chevron rotate" : "chevron"}
              />
            </button>

            {toolsOpen && (
              <div className="tools-dropdown">

                <div className="tools-heading">
                  <span>Travel Tools</span>
                  <small>Quick access</small>
                </div>

                <Link
                  to="/flight-status"
                  onClick={closeMenu}
                  className="tool-item"
                >
                  <div className="tool-icon">
                    <Clock3 size={16} />
                  </div>

                  <div>
                    <strong>Live Flight Status</strong>
                    <span>Track live flight updates</span>
                  </div>
                </Link>

                <Link
                  to="/pricing"
                  onClick={closeMenu}
                  className="tool-item"
                >
                  <div className="tool-icon">
                    <IndianRupee size={16} />
                  </div>

                  <div>
                    <strong>Smart Pricing</strong>
                    <span>Check fares and price history</span>
                  </div>
                </Link>

                <Link
                  to="/cancellations"
                  onClick={closeMenu}
                  className="tool-item"
                >
                  <div className="tool-icon">
                    <RefreshCcw size={16} />
                  </div>

                  <div>
                    <strong>Cancellation & Refund</strong>
                    <span>Manage cancellation and refunds</span>
                  </div>
                </Link>

                <Link
                  to="/flight-seats"
                  onClick={closeMenu}
                  className="tool-item"
                >
                  <div className="tool-icon">
                    <Armchair size={16} />
                  </div>

                  <div>
                    <strong>Flight Seat Selection</strong>
                    <span>Choose your preferred seat</span>
                  </div>
                </Link>

                <Link
                  to="/hotel-rooms"
                  onClick={closeMenu}
                  className="tool-item"
                >
                  <div className="tool-icon">
                    <BedDouble size={16} />
                  </div>

                  <div>
                    <strong>Hotel Room Selection</strong>
                    <span>Choose your preferred room</span>
                  </div>
                </Link>

                <Link
                  to="/reviews"
                  onClick={closeMenu}
                  className="tool-item"
                >
                  <div className="tool-icon">
                    <Star size={16} />
                  </div>

                  <div>
                    <strong>Reviews & Ratings</strong>
                    <span>Explore traveller reviews</span>
                  </div>
                </Link>

              </div>
            )}
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="navbar-actions">

          <Link
            to="/bookings"
            className="navbar-login"
            onClick={closeMenu}
          >
            <User size={15} />
            My Trips
          </Link>

          <Link
            to="/flights"
            className="navbar-cta"
            onClick={closeMenu}
          >
            Book a Trip
          </Link>

        </div>

        {/* MOBILE BACK + MENU */}
        <div className="mobile-nav-actions">

          <button
            type="button"
            className="mobile-back-btn"
            onClick={goBack}
            aria-label="Go back"
          >
            <ArrowLeft size={19} />
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">

          <Link
            to="/"
            onClick={closeMenu}
            className={isActive("/") ? "mobile-link active" : "mobile-link"}
          >
            Home
          </Link>

          <Link
            to="/flights"
            onClick={closeMenu}
            className={
              isActive("/flights")
                ? "mobile-link active"
                : "mobile-link"
            }
          >
            <Plane size={16} />
            Flights
          </Link>

          <Link
            to="/hotels"
            onClick={closeMenu}
            className={
              isActive("/hotels")
                ? "mobile-link active"
                : "mobile-link"
            }
          >
            <Hotel size={16} />
            Hotels
          </Link>

          <Link
            to="/bookings"
            onClick={closeMenu}
            className={
              isActive("/bookings")
                ? "mobile-link active"
                : "mobile-link"
            }
          >
            <LayoutDashboard size={16} />
            Bookings
          </Link>

          <Link
            to="/reviews"
            onClick={closeMenu}
            className={
              isActive("/reviews")
                ? "mobile-link active"
                : "mobile-link"
            }
          >
            <Star size={16} />
            Reviews
          </Link>

          <Link
            to="/recommendations"
            onClick={closeMenu}
            className={
              isActive("/recommendations")
                ? "mobile-link active"
                : "mobile-link"
            }
          >
            <Sparkles size={16} />
            For You
          </Link>

          {/* MOBILE TRAVEL TOOLS */}
          <div className="mobile-tools">

            <button
              type="button"
              className="mobile-tools-button"
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              <span>
                <Sparkles size={16} />
                Travel Tools
              </span>

              <ChevronDown
                size={16}
                className={toolsOpen ? "rotate" : ""}
              />
            </button>

            {toolsOpen && (
              <div className="mobile-tools-list">

                <Link to="/flight-status" onClick={closeMenu}>
                  <Clock3 size={16} />
                  Live Flight Status
                </Link>

                <Link to="/pricing" onClick={closeMenu}>
                  <IndianRupee size={16} />
                  Smart Pricing
                </Link>

                <Link to="/cancellations" onClick={closeMenu}>
                  <RefreshCcw size={16} />
                  Cancellation & Refund
                </Link>

                <Link to="/flight-seats" onClick={closeMenu}>
                  <Armchair size={16} />
                  Flight Seat Selection
                </Link>

                <Link to="/hotel-rooms" onClick={closeMenu}>
                  <BedDouble size={16} />
                  Hotel Room Selection
                </Link>

                <Link to="/reviews" onClick={closeMenu}>
                  <Star size={16} />
                  Reviews & Ratings
                </Link>

              </div>
            )}
          </div>

          <div className="mobile-actions">

            <Link
              to="/bookings"
              onClick={closeMenu}
              className="mobile-trip-btn"
            >
              <User size={16} />
              My Trips
            </Link>

            <Link
              to="/flights"
              onClick={closeMenu}
              className="mobile-book-btn"
            >
              Book a Trip
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;