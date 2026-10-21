import { useEffect, useMemo, useState } from "react";
import {
  TrendingUp,
  Lock,
  CalendarDays,
  Flame,
  Info,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BASE_PRICE = 5200;

const priceHistory = [
  { time: "6 AM", price: 4900 },
  { time: "9 AM", price: 5050 },
  { time: "12 PM", price: 5200 },
  { time: "3 PM", price: 5450 },
  { time: "6 PM", price: 5650 },
  { time: "Now", price: 5800 },
];

const demandMultiplier = {
  Low: 0.9,
  Medium: 1,
  High: 1.1,
};

const seasonMultiplier = {
  Normal: 1,
  Holiday: 1.2,
  "Peak Season": 1.15,
};

function Pricing() {
  const [demand, setDemand] = useState("High");
  const [season, setSeason] = useState("Normal");

  const [isFrozen, setIsFrozen] = useState(false);
  const [freezeSeconds, setFreezeSeconds] = useState(300);

  const dynamicPrice = useMemo(() => {
    return Math.round(
      BASE_PRICE *
        demandMultiplier[demand] *
        seasonMultiplier[season]
    );
  }, [demand, season]);

  const currentPrice = isFrozen
    ? BASE_PRICE
    : dynamicPrice;

  const difference = currentPrice - BASE_PRICE;

  const percentage =
    BASE_PRICE === 0
      ? 0
      : Math.round((difference / BASE_PRICE) * 100);

  /* Price freeze countdown */
  useEffect(() => {
    if (!isFrozen) return;

    if (freezeSeconds <= 0) {
      setIsFrozen(false);
      setFreezeSeconds(300);
      return;
    }

    const timer = setInterval(() => {
      setFreezeSeconds((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isFrozen, freezeSeconds]);

  const minutes = String(
    Math.floor(freezeSeconds / 60)
  ).padStart(2, "0");

  const seconds = String(
    freezeSeconds % 60
  ).padStart(2, "0");

  const freezePrice = () => {
    setIsFrozen(true);
    setFreezeSeconds(300);
  };

  const unfreezePrice = () => {
    setIsFrozen(false);
    setFreezeSeconds(300);
  };

  return (
    <section className="pricing-page">

      {/* Header */}
      <div className="pricing-header">

        <div>
          <p className="eyebrow">
            SMART PRICING ENGINE
          </p>

          <h1>
            Book at the right price.
          </h1>

          <p>
            TravelEase automatically adjusts prices
            based on demand and seasonal conditions.
          </p>
        </div>

        <div className="live-pricing">
          <span className="live-dot"></span>
          Live Pricing
        </div>

      </div>

      {/* Main section */}
      <div className="pricing-grid">

        {/* Current price */}
        <div className="price-card">

          <div className="price-card-top">

            <div>
              <span className="muted-label">
                FLIGHT FARE
              </span>

              <h2>
                Chennai → Delhi
              </h2>

              <p className="flight-name">
                Air India · AI202
              </p>
            </div>

            <TrendingUp size={25} />

          </div>

          {/* Current price */}
          <div className="current-price">

            <span>
              Current fare
            </span>

            <strong>
              ₹{currentPrice.toLocaleString()}
            </strong>

            {difference !== 0 && (
              <small
                className={
                  difference > 0
                    ? "price-up"
                    : "price-down"
                }
              >
                {difference > 0 ? "+" : ""}
                {percentage}% from base price
              </small>
            )}

          </div>

          {/* Factors */}
          <div className="price-factors">

            <div className="factor">

              <div className="factor-icon">
                <Flame size={18} />
              </div>

              <div>
                <span>
                  Demand
                </span>

                <strong>
                  {demand}
                </strong>
              </div>

            </div>

            <div className="factor">

              <div className="factor-icon">
                <CalendarDays size={18} />
              </div>

              <div>
                <span>
                  Season
                </span>

                <strong>
                  {season}
                </strong>
              </div>

            </div>

          </div>

          {/* Freeze */}
          {isFrozen ? (

            <div className="freeze-active">

              <div className="freeze-info">

                <Lock size={19} />

                <div>
                  <strong>
                    Price Frozen
                  </strong>

                  <span>
                    Protected for {minutes}:{seconds}
                  </span>
                </div>

              </div>

              <button
                onClick={unfreezePrice}
              >
                Unlock
              </button>

            </div>

          ) : (

            <button
              className="freeze-button"
              onClick={freezePrice}
            >
              <Lock size={17} />

              Freeze this price for 5 minutes
            </button>

          )}

        </div>

        {/* Price history */}
        <div className="history-card">

          <div className="card-heading">

            <div>
              <span className="muted-label">
                PRICE HISTORY
              </span>

              <h3>
                Fare movement
              </h3>
            </div>

            <TrendingUp size={20} />

          </div>

          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <LineChart
                data={priceHistory}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="time"
                  tick={{
                    fontSize: 11,
                  }}
                />

                <YAxis
                  tick={{
                    fontSize: 11,
                  }}
                  domain={[
                    "dataMin - 200",
                    "dataMax + 200",
                  ]}
                />

                <Tooltip
                  formatter={(value) => [
                    `₹${value.toLocaleString()}`,
                    "Fare",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                  }}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

          <div className="history-note">

            <Info size={15} />

            <span>
              Historical fares are simulated for
              demonstration purposes.
            </span>

          </div>

        </div>

      </div>

      {/* Pricing controls */}
      <div className="pricing-controls">

        <div className="controls-heading">

          <span className="muted-label">
            PRICING FACTORS
          </span>

          <h3>
            Adjust market conditions
          </h3>

        </div>

        <div className="controls-grid">

          {/* Demand */}
          <div className="control-box">

            <label>
              Travel Demand
            </label>

            <select
              value={demand}
              onChange={(e) =>
                setDemand(e.target.value)
              }
            >
              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>
            </select>

            <p>
              Demand multiplier:{" "}
              <strong>
                {demandMultiplier[demand]}x
              </strong>
            </p>

          </div>

          {/* Season */}
          <div className="control-box">

            <label>
              Season
            </label>

            <select
              value={season}
              onChange={(e) =>
                setSeason(e.target.value)
              }
            >
              <option value="Normal">
                Normal
              </option>

              <option value="Holiday">
                Holiday
              </option>

              <option value="Peak Season">
                Peak Season
              </option>
            </select>

            <p>
              Seasonal multiplier:{" "}
              <strong>
                {seasonMultiplier[season]}x
              </strong>
            </p>

          </div>

        </div>

      </div>

      {/* Transparent explanation */}
      <div className="pricing-explanation">

        <div className="explanation-icon">
          <Info size={20} />
        </div>

        <div>

          <strong>
            Why did the price change?
          </strong>

          <p>
            The current fare is calculated using
            travel demand and seasonal conditions.
            This makes pricing changes transparent
            and predictable.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Pricing;