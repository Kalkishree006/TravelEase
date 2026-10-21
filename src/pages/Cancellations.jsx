import { useSearchParams } from "react-router-dom";
import {
  Plane,
  Hotel,
  CalendarDays,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import "./Cancellations.css";

const bookingData = {
  // FLIGHT
  "TE-2026-001": {
    type: "Flight",
    title: "Air India AI202",
    route: "Chennai → Delhi",
    date: "28 Sep 2026",
    time: "10:30 AM",
    price: 5200,
    refund: 2600,
    policy: "50% refund within 24 hours",
  },

  //flight 2
  "TE-2026-002": {
  type: "Flight",
  title: "Taj Chennai",
  route: "Chennai, Tamil Nadu",
  date: "02 Oct 2026",
  time: "11.00AM",
  price: 13600,
  refund: 6800,
  policy: "50% refund under cancellation policy",
},

  // HOTEL 1
  "TE-2026-003": {
    type: "Hotel",
    title: "Taj Chennai",
    route: "Chennai, Tamil Nadu",
    date: "30 Sep – 02 Oct 2026",
    time: "2 Nights",
    price: 6800,
    refund: 3400,
    policy: "50% refund under cancellation policy",
  },

  // HOTEL 2
  "TE-2026-004": {
    type: "Hotel",
    title: "The Leela Palace",
    route: "New Delhi",
    date: "01 Oct – 03 Oct 2026",
    time: "2 Nights",
    price: 9200,
    refund: 4600,
    policy: "50% refund under cancellation policy",
  },

  // HOTEL 3
  "TE-2026-005": {
    type: "Hotel",
    title: "ITC Gardenia",
    route: "Bengaluru, Karnataka",
    date: "02 Oct – 04 Oct 2026",
    time: "2 Nights",
    price: 7400,
    refund: 3700,
    policy: "50% refund under cancellation policy",
  },

  // HOTEL 4
  "TE-2026-006": {
    type: "Hotel",
    title: "Novotel Mumbai",
    route: "Mumbai, Maharashtra",
    date: "03 Oct – 05 Oct 2026",
    time: "2 Nights",
    price: 5600,
    refund: 2800,
    policy: "50% refund under cancellation policy",
  },
};

function Cancellations() {
  const [searchParams] = useSearchParams();

  const bookingId =
    searchParams.get("booking") || "TE-2026-001";

  const booking =
    bookingData[bookingId] || bookingData["TE-2026-001"];

  const handleCancel = () => {
    alert(
      `Cancellation request submitted for ${bookingId}\n\nRefund Amount: ₹${booking.refund.toLocaleString(
        "en-IN"
      )}`
    );
  };

  return (
    <div className="cancellation-page">

      {/* HEADER */}
      <div className="cancellation-header">

        <div>
          <span className="cancellation-kicker">
            BOOKING MANAGEMENT
          </span>

          <h1>
            Cancel Booking
          </h1>

          <p>
            Review your booking details and refund
            information before cancelling.
          </p>
        </div>

        <div className="cancellation-id">
          Booking ID

          <strong>
            {bookingId}
          </strong>
        </div>

      </div>

      {/* BOOKING + POLICY */}
      <div className="cancellation-grid">

        {/* BOOKING CARD */}
        <div className="cancellation-card">

          <div className="cancel-card-top">

            <div className="cancel-booking-type">

              <div className="cancel-icon">
                {booking.type === "Flight" ? (
                  <Plane size={20} />
                ) : (
                  <Hotel size={20} />
                )}
              </div>

              <div>
                <span>
                  {booking.type}
                </span>

                <h2>
                  {booking.title}
                </h2>
              </div>

            </div>

            <div className="confirmed-badge">
              <CheckCircle2 size={14} />
              Confirmed
            </div>

          </div>

          {/* DETAILS */}
          <div className="cancel-details">

            <div>
              <MapPin size={16} />

              <div>
                <small>
                  Route / Location
                </small>

                <strong>
                  {booking.route}
                </strong>
              </div>
            </div>

            <div>
              <CalendarDays size={16} />

              <div>
                <small>
                  Date
                </small>

                <strong>
                  {booking.date}
                </strong>
              </div>
            </div>

            <div>
              <Clock3 size={16} />

              <div>
                <small>
                  Time / Stay
                </small>

                <strong>
                  {booking.time}
                </strong>
              </div>
            </div>

          </div>

          {/* FARE */}
          <div className="fare-box">

            <div>
              <span>
                Original Fare
              </span>

              <strong>
                ₹{booking.price.toLocaleString("en-IN")}
              </strong>
            </div>

            <div>
              <span>
                Estimated Refund
              </span>

              <strong className="refund-amount">
                ₹{booking.refund.toLocaleString("en-IN")}
              </strong>
            </div>

          </div>

        </div>

        {/* POLICY CARD */}
        <div className="policy-card">

          <div className="policy-icon">
            <AlertCircle size={20} />
          </div>

          <h3>
            Cancellation Policy
          </h3>

          <p>
            {booking.policy}
          </p>

          <div className="policy-row">

            <span>
              Booking Amount
            </span>

            <strong>
              ₹{booking.price.toLocaleString("en-IN")}
            </strong>

          </div>

          <div className="policy-row">

            <span>
              Refund Amount
            </span>

            <strong className="refund-text">
              ₹{booking.refund.toLocaleString("en-IN")}
            </strong>

          </div>

          <div className="policy-note">
            Refund amount is an estimated value based
            on the current cancellation policy.
          </div>

        </div>

      </div>

      {/* CANCELLATION REASON */}
      <div className="reason-card">

        <div>
          <h3>
            Reason for Cancellation
          </h3>

          <p>
            Please select a reason to help us improve
            our service.
          </p>
        </div>

        <select defaultValue="">
          <option value="" disabled>
            Select cancellation reason
          </option>

          <option>
            Change of plans
          </option>

          <option>
            Found a better option
          </option>

          <option>
            Travel dates changed
          </option>

          <option>
            Personal reasons
          </option>

          <option>
            Other
          </option>
        </select>

      </div>

      {/* REFUND TRACKER */}
      <div className="refund-card">

        <div className="refund-header">

          <div>
            <span className="cancellation-kicker">
              REFUND TRACKER
            </span>

            <h2>
              Refund Status
            </h2>
          </div>

          <span className="refund-pending">
            Pending
          </span>

        </div>

        <div className="refund-steps">

          <div className="refund-step active">

            <div className="step-circle">
              <Clock3 size={15} />
            </div>

            <div>
              <strong>
                Pending
              </strong>

              <span>
                Cancellation requested
              </span>
            </div>

          </div>

          <div className="refund-line"></div>

          <div className="refund-step">

            <div className="step-circle">
              <CheckCircle2 size={15} />
            </div>

            <div>
              <strong>
                Processed
              </strong>

              <span>
                Refund being processed
              </span>
            </div>

          </div>

          <div className="refund-line"></div>

          <div className="refund-step">

            <div className="step-circle">
              <CheckCircle2 size={15} />
            </div>

            <div>
              <strong>
                Completed
              </strong>

              <span>
                Amount credited
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* ACTION */}
      <div className="cancel-action">

        <div className="cancel-warning">
          <XCircle size={18} />

          <span>
            Cancellation cannot be undone once confirmed.
          </span>
        </div>

        <button
          type="button"
          className="confirm-cancel-btn"
          onClick={handleCancel}
        >
          <XCircle size={17} />
          Confirm Cancellation
        </button>

      </div>

    </div>
  );
}

export default Cancellations;