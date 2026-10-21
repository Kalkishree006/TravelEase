// TravelEase Mock Flight API
// Simulates a real flight-status service for internship demonstration.

const flightUpdates = {
  AI202: {
    status: "Delayed",
    delayMinutes: 20,
    reason: "Air traffic congestion",
  },

  "6E418": {
    status: "Boarding",
    delayMinutes: 35,
    reason: "Passengers are now boarding",
  },

  UK955: {
    status: "On Time",
    delayMinutes: 0,
    reason: "Flight operating normally",
  },
};

export const getFlightUpdate = (flightId) => {
  const update = flightUpdates[flightId];

  if (!update) {
    return {
      status: "On Time",
      delayMinutes: 0,
      reason: "No delay reported",
    };
  }

  return {
    ...update,
    updatedAt: new Date().toISOString(),
  };
};

export const fetchLiveFlightStatus = async (flight) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const update = getFlightUpdate(flight.id);

      resolve({
        ...flight,
        ...update,
      });
    }, 500);
  });
};