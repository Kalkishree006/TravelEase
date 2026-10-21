import { useMemo, useState } from "react";
import {
  Plane,
  Hotel,
  MapPin,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Info,
  Clock,
  IndianRupee,
} from "lucide-react";

const initialRecommendations = [
  {
    id: 1,
    type: "flight",
    title: "Chennai → Delhi",
    subtitle: "Air India · AI202",
    price: 5200,
    duration: "2h 50m",
    tag: "Best Match",
    score: 94,
    reason:
      "You recently searched for flights from Chennai to Delhi.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 2,
    type: "flight",
    title: "Chennai → Mumbai",
    subtitle: "IndiGo · 6E418",
    price: 4300,
    duration: "1h 50m",
    tag: "Budget Pick",
    score: 88,
    reason:
      "You often prefer lower-fare flights with shorter travel time.",
    image:
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 3,
    type: "hotel",
    title: "TravelEase Grand Hotel",
    subtitle: "Chennai · 4.6 ★",
    price: 2800,
    duration: "1 night",
    tag: "Highly Rated",
    score: 91,
    reason:
      "Recommended because you prefer highly rated hotels near the city centre.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: 4,
    type: "hotel",
    title: "City View Residency",
    subtitle: "Delhi · 4.4 ★",
    price: 3200,
    duration: "1 night",
    tag: "For You",
    score: 86,
    reason:
      "This hotel matches your preferred price range and location.",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
  },
];

function Recommendations() {
  const [recommendations, setRecommendations] = useState(
    initialRecommendations
  );

  const [activeType, setActiveType] = useState("all");

  const [feedback, setFeedback] = useState({});

  const [showReason, setShowReason] = useState(null);

  /*
   * Filter recommendations
   */
  const filteredRecommendations = useMemo(() => {
    if (activeType === "all") {
      return recommendations;
    }

    return recommendations.filter(
      (item) => item.type === activeType
    );
  }, [recommendations, activeType]);

  /*
   * Fixed counts
   */
  const flightCount = initialRecommendations.filter(
    (item) => item.type === "flight"
  ).length;

  const hotelCount = initialRecommendations.filter(
    (item) => item.type === "hotel"
  ).length;

  /*
   * Helpful button
   */
  const handleHelpful = (id) => {
    setFeedback((current) => ({
      ...current,
      [id]: "helpful",
    }));

    setRecommendations((current) =>
      current.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          score: Math.min(item.score + 2, 99),
        };
      })
    );
  };

  /*
   * Not relevant button
   */
  const handleNotRelevant = (id) => {
    setFeedback((current) => ({
      ...current,
      [id]: "not-relevant",
    }));

    setRecommendations((current) =>
      current.filter((item) => item.id !== id)
    );

    if (showReason === id) {
      setShowReason(null);
    }
  };

  /*
   * Change filter
   */
  const changeFilter = (type) => {
    setActiveType(type);
  };

  return (
    <section className="recommendations-page">

      {/* ================= HEADER ================= */}

      <div className="recommendations-header">

        <div>

          <p className="eyebrow">
            PERSONALIZED FOR YOU
          </p>

          <h1>
            Trips picked for you.
          </h1>

          <p>
            TravelEase learns from your searches,
            preferences and interactions to suggest
            relevant travel options.
          </p>

        </div>

        <div className="ai-recommendation-badge">
          <Sparkles size={17} />
          AI Recommendations
        </div>

      </div>

      {/* ================= PREFERENCES ================= */}

      <div className="preference-strip">

        <div className="preference-item">

          <div className="preference-icon">
            <MapPin size={18} />
          </div>

          <div>

            <span>
              Recent interest
            </span>

            <strong>
              Chennai → Delhi
            </strong>

          </div>

        </div>

        <div className="preference-item">

          <div className="preference-icon">
            <IndianRupee size={18} />
          </div>

          <div>

            <span>
              Preferred budget
            </span>

            <strong>
              ₹3,000 – ₹6,000
            </strong>

          </div>

        </div>

        <div className="preference-item">

          <div className="preference-icon">
            <Hotel size={18} />
          </div>

          <div>

            <span>
              Hotel preference
            </span>

            <strong>
              Highly rated
            </strong>

          </div>

        </div>

        <div className="preference-item">

          <div className="preference-icon">
            <Clock size={18} />
          </div>

          <div>

            <span>
              Travel style
            </span>

            <strong>
              Short journeys
            </strong>

          </div>

        </div>

      </div>

      {/* ================= FILTER HEADER ================= */}

      <div className="recommendation-controls">

        <div>

          <span className="muted-label">
            RECOMMENDATIONS
          </span>

          <h2>
            Selected for you
          </h2>

        </div>

        <div className="recommendation-tabs">

          {/* ALL */}

          <button
            type="button"
            className={
              activeType === "all"
                ? "recommendation-tab active"
                : "recommendation-tab"
            }
            onClick={() => changeFilter("all")}
          >
            All
          </button>

          {/* FLIGHTS */}

          <button
            type="button"
            className={
              activeType === "flight"
                ? "recommendation-tab active"
                : "recommendation-tab"
            }
            onClick={() => changeFilter("flight")}
          >
            <Plane size={14} />

            Flights

            <span>
              {flightCount}
            </span>

          </button>

          {/* HOTELS */}

          <button
            type="button"
            className={
              activeType === "hotel"
                ? "recommendation-tab active"
                : "recommendation-tab"
            }
            onClick={() => changeFilter("hotel")}
          >
            <Hotel size={14} />

            Hotels

            <span>
              {hotelCount}
            </span>

          </button>

        </div>

      </div>

      {/* ================= RECOMMENDATION CARDS ================= */}

      {filteredRecommendations.length === 0 ? (

        <div className="no-recommendations">

          <Sparkles size={28} />

          <h3>
            No recommendations available
          </h3>

          <p>
            Try exploring more flights and hotels
            to improve your recommendations.
          </p>

        </div>

      ) : (

        <div className="recommendations-grid">

          {filteredRecommendations.map((item) => (

            <article
              className="recommendation-card"
              key={item.id}
            >

              {/* IMAGE */}

              <div className="recommendation-image">

                <img
                  src={item.image}
                  alt={item.title}
                />

                <span className="recommendation-tag">

                  <Sparkles size={12} />

                  {item.tag}

                </span>

                <div className="match-score">
                  {item.score}% match
                </div>

              </div>

              {/* CONTENT */}

              <div className="recommendation-content">

                <div className="recommendation-title">

                  <div>

                    <span className="recommendation-type">

                      {item.type === "flight"
                        ? "FLIGHT"
                        : "HOTEL"}

                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.subtitle}
                    </p>

                  </div>

                  {item.type === "flight" ? (
                    <Plane size={19} />
                  ) : (
                    <Hotel size={19} />
                  )}

                </div>

                {/* PRICE / DURATION */}

                <div className="recommendation-details">

                  <div>

                    <span>
                      Price
                    </span>

                    <strong>
                      ₹{item.price.toLocaleString()}
                    </strong>

                  </div>

                  <div>

                    <span>
                      {item.type === "flight"
                        ? "Duration"
                        : "Stay"}
                    </span>

                    <strong>
                      {item.duration}
                    </strong>

                  </div>

                </div>

                {/* WHY RECOMMENDATION */}

                <button
                  type="button"
                  className="why-button"
                  onClick={() =>
                    setShowReason(
                      showReason === item.id
                        ? null
                        : item.id
                    )
                  }
                >

                  <Info size={14} />

                  {showReason === item.id
                    ? "Hide recommendation reason"
                    : "Why this recommendation?"}

                </button>

                {showReason === item.id && (

                  <div className="recommendation-reason">

                    <Sparkles size={15} />

                    <p>
                      {item.reason}
                    </p>

                  </div>

                )}

                {/* FEEDBACK */}

                <div className="recommendation-feedback">

                  <span>
                    Is this recommendation useful?
                  </span>

                  <div>

                    {/* HELPFUL */}

                    <button
                      type="button"
                      className={
                        feedback[item.id] ===
                        "helpful"
                          ? "feedback-button selected"
                          : "feedback-button"
                      }
                      onClick={() =>
                        handleHelpful(item.id)
                      }
                    >

                      <ThumbsUp size={13} />

                      Helpful

                    </button>

                    {/* NOT RELEVANT */}

                    <button
                      type="button"
                      className={
                        feedback[item.id] ===
                        "not-relevant"
                          ? "feedback-button selected"
                          : "feedback-button"
                      }
                      onClick={() =>
                        handleNotRelevant(item.id)
                      }
                    >

                      <ThumbsDown size={13} />

                      Not relevant

                    </button>

                  </div>

                </div>

                {/* VIEW BUTTON */}

                <button
                  type="button"
                  className="view-recommendation"
                  onClick={() =>
                    alert(
                      `${item.type === "flight" ? "Flight" : "Hotel"} selected: ${item.title}`
                    )
                  }
                >

                  {item.type === "flight"
                    ? "View Flight"
                    : "View Hotel"}

                </button>

              </div>

            </article>

          ))}

        </div>

      )}

      {/* ================= EXPLANATION ================= */}

      <div className="recommendation-explanation">

        <div className="explanation-icon">
          <Sparkles size={20} />
        </div>

        <div>

          <strong>
            How TravelEase personalizes recommendations
          </strong>

          <p>
            Recommendations use recent searches,
            travel preferences, price range and
            interaction feedback. When a user marks
            an option as helpful, similar options
            receive a higher relevance score.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Recommendations;