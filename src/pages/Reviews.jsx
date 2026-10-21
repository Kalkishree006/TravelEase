import { useMemo, useState } from "react";
import {
  Star,
  Camera,
  Flag,
  MessageCircle,
  ThumbsUp,
  Send,
  X,
} from "lucide-react";

const initialReviews = [
  {
    id: 1,
    name: "Priya S",
    location: "Chennai",
    rating: 5,
    date: "2 days ago",
    text: "Very smooth booking experience. The flight information was clear and the seat selection was easy.",
    helpful: 12,
    flagged: false,
    reply: "",
    photo: null,
  },
  {
    id: 2,
    name: "Rahul K",
    location: "Bengaluru",
    rating: 4,
    date: "5 days ago",
    text: "Good experience overall. Pricing information was transparent and the booking process was simple.",
    helpful: 8,
    flagged: false,
    reply: "Thank you for sharing your experience!",
    photo: null,
  },
  {
    id: 3,
    name: "Divya R",
    location: "Coimbatore",
    rating: 3,
    date: "1 week ago",
    text: "The booking was easy, but I had to wait a little longer for the confirmation.",
    helpful: 4,
    flagged: false,
    reply: "",
    photo: null,
  },
  {
    id: 4,
    name: "Arun P",
    location: "Madurai",
    rating: 5,
    date: "2 weeks ago",
    text: "Excellent travel experience. The interface is clean and very easy to understand.",
    helpful: 15,
    flagged: false,
    reply: "",
    photo: null,
  },
];

function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);

  const [filterRating, setFilterRating] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [photo, setPhoto] = useState(null);

  const [replyId, setReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const [message, setMessage] = useState("");

  const averageRating =
    reviews.length === 0
      ? "0.0"
      : (
          reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / reviews.length
        ).toFixed(1);

  const ratingCounts = {
    5: reviews.filter((review) => review.rating === 5).length,
    4: reviews.filter((review) => review.rating === 4).length,
    3: reviews.filter((review) => review.rating === 3).length,
    2: reviews.filter((review) => review.rating === 2).length,
    1: reviews.filter((review) => review.rating === 1).length,
  };

  const visibleReviews = useMemo(() => {
    let result = [...reviews];

    if (filterRating !== "All") {
      result = result.filter(
        (review) => review.rating === Number(filterRating)
      );
    }

    if (sortBy === "highest") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "lowest") {
      result.sort((a, b) => a.rating - b.rating);
    }

    if (sortBy === "helpful") {
      result.sort((a, b) => b.helpful - a.helpful);
    }

    return result;
  }, [reviews, filterRating, sortBy]);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setPhoto(URL.createObjectURL(file));
  };

  const submitReview = () => {
    if (newRating === 0) {
      setMessage("Please select a star rating.");
      return;
    }

    if (!newReview.trim()) {
      setMessage("Please write a review.");
      return;
    }

    const review = {
      id: Date.now(),
      name: "You",
      location: "Your location",
      rating: newRating,
      date: "Just now",
      text: newReview,
      helpful: 0,
      flagged: false,
      reply: "",
      photo,
    };

    setReviews((current) => [review, ...current]);

    setNewRating(0);
    setHoverRating(0);
    setNewReview("");
    setPhoto(null);
    setMessage("Your review has been added!");
  };

  const markHelpful = (id) => {
    setReviews((current) =>
      current.map((review) =>
        review.id === id
          ? {
              ...review,
              helpful: review.helpful + 1,
            }
          : review
      )
    );
  };

  const flagReview = (id) => {
    setReviews((current) =>
      current.map((review) =>
        review.id === id
          ? {
              ...review,
              flagged: true,
            }
          : review
      )
    );
  };

  const submitReply = (id) => {
    if (!replyText.trim()) return;

    setReviews((current) =>
      current.map((review) =>
        review.id === id
          ? {
              ...review,
              reply: replyText,
            }
          : review
      )
    );

    setReplyId(null);
    setReplyText("");
  };

  return (
    <section className="reviews-page">

      <div className="reviews-header">

        <div>
          <p className="eyebrow">
            REVIEWS & RATINGS
          </p>

          <h1>
            What travellers are saying.
          </h1>

          <p>
            Read real experiences and share your
            own travel feedback.
          </p>
        </div>

        <div className="review-rating-card">

          <strong>{averageRating}</strong>

          <div className="big-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={17}
                fill={
                  star <= Math.round(Number(averageRating))
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <span>{reviews.length} reviews</span>

        </div>

      </div>

      <div className="reviews-summary">

        <div className="rating-breakdown">

          {[5, 4, 3, 2, 1].map((rating) => {
            const percentage =
              reviews.length === 0
                ? 0
                : Math.round(
                    (ratingCounts[rating] / reviews.length) *
                      100
                  );

            return (
              <button
                key={rating}
                className={
                  filterRating === String(rating)
                    ? "rating-row active"
                    : "rating-row"
                }
                onClick={() =>
                  setFilterRating(
                    filterRating === String(rating)
                      ? "All"
                      : String(rating)
                  )
                }
              >

                <span>
                  {rating}
                  <Star
                    size={13}
                    fill="currentColor"
                  />
                </span>

                <div className="rating-bar">
                  <div
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <small>
                  {ratingCounts[rating]}
                </small>

              </button>
            );
          })}

        </div>

        <div className="review-summary-text">

          <span className="muted-label">
            TRAVELLER FEEDBACK
          </span>

          <h2>
            Trusted by travellers
          </h2>

          <p>
            Ratings help travellers make better
            decisions and help TravelEase improve
            the booking experience.
          </p>

        </div>

      </div>

      <div className="write-review-card">

        <div className="section-title">

          <span className="muted-label">
            SHARE YOUR EXPERIENCE
          </span>

          <h2>
            Write a review
          </h2>

        </div>

        <div className="write-review-content">

          <label>
            Your rating
          </label>

          <div className="rating-selector">

            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() =>
                  setHoverRating(star)
                }
                onMouseLeave={() =>
                  setHoverRating(0)
                }
                onClick={() =>
                  setNewRating(star)
                }
              >
                <Star
                  size={25}
                  fill={
                    star <= (hoverRating || newRating)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            ))}

          </div>

          <textarea
            value={newReview}
            onChange={(event) =>
              setNewReview(event.target.value)
            }
            placeholder="Tell other travellers about your experience..."
            rows="4"
          />

          <div className="review-form-actions">

            <label className="photo-upload">

              <Camera size={16} />

              Add photo

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />

            </label>

            <button
              className="submit-review"
              onClick={submitReview}
            >
              <Send size={15} />
              Submit Review
            </button>

          </div>

          {photo && (
            <div className="photo-preview">

              <img
                src={photo}
                alt="Review preview"
              />

              <button
                onClick={() => setPhoto(null)}
                type="button"
              >
                <X size={14} />
              </button>

            </div>
          )}

          {message && (
            <p className="review-message">
              {message}
            </p>
          )}

        </div>

      </div>

      <div className="reviews-controls">

        <div>
          <span className="muted-label">
            CUSTOMER REVIEWS
          </span>

          <h2>
            Traveller experiences
          </h2>
        </div>

        <div className="review-filters">

          <select
            value={filterRating}
            onChange={(event) =>
              setFilterRating(event.target.value)
            }
          >
            <option value="All">
              All ratings
            </option>

            <option value="5">
              5 stars
            </option>

            <option value="4">
              4 stars
            </option>

            <option value="3">
              3 stars
            </option>

            <option value="2">
              2 stars
            </option>

            <option value="1">
              1 star
            </option>
          </select>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="latest">
              Latest
            </option>

            <option value="highest">
              Highest rated
            </option>

            <option value="lowest">
              Lowest rated
            </option>

            <option value="helpful">
              Most helpful
            </option>
          </select>

        </div>

      </div>

      <div className="reviews-list">

        {visibleReviews.length === 0 ? (

          <div className="no-reviews">
            No reviews found for this filter.
          </div>

        ) : (

          visibleReviews.map((review) => (

            <article
              className="review-card"
              key={review.id}
            >

              <div className="review-top">

                <div className="review-user">

                  <div className="avatar">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <strong>
                      {review.name}
                    </strong>

                    <span>
                      {review.location} · {review.date}
                    </span>
                  </div>

                </div>

                <div className="review-stars">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      fill={
                        star <= review.rating
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}

                </div>

              </div>

              <p className="review-text">
                {review.text}
              </p>

              {review.photo && (
                <img
                  className="review-photo"
                  src={review.photo}
                  alt="Traveller review"
                />
              )}

              {review.reply && (
                <div className="review-reply">

                  <MessageCircle size={15} />

                  <div>
                    <strong>
                      TravelEase reply
                    </strong>

                    <p>
                      {review.reply}
                    </p>
                  </div>

                </div>
              )}

              <div className="review-actions">

                <button
                  onClick={() =>
                    markHelpful(review.id)
                  }
                >
                  <ThumbsUp size={14} />
                  Helpful · {review.helpful}
                </button>

                <button
                  onClick={() => {
                    setReplyId(review.id);
                    setReplyText("");
                  }}
                >
                  <MessageCircle size={14} />
                  Reply
                </button>

                <button
                  onClick={() =>
                    flagReview(review.id)
                  }
                  disabled={review.flagged}
                >
                  <Flag size={14} />
                  {review.flagged
                    ? "Flagged"
                    : "Flag"}
                </button>

              </div>

              {replyId === review.id && (
                <div className="reply-box">

                  <input
                    value={replyText}
                    onChange={(event) =>
                      setReplyText(event.target.value)
                    }
                    placeholder="Write a reply..."
                  />

                  <button
                    onClick={() =>
                      submitReply(review.id)
                    }
                  >
                    <Send size={14} />
                    Send
                  </button>

                </div>
              )}

            </article>

          ))

        )}

      </div>

    </section>
  );
}

export default Reviews;