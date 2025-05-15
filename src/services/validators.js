
/** Validates required event fields */
exports.validateEventInput = (data) => {
  const requiredFields = ["name", "date", "location", "ticketPrice", "availableTickets"];

  const missingFields = requiredFields.filter(field => !data[field]);

  if (missingFields.length > 0) {
    return {
      valid: false,
      message: `Missing required fields: ${missingFields.join(", ")}`
    };
  }

  if (isNaN(Number(data.ticketPrice)) || isNaN(Number(data.availableTickets))) {
    return {
      valid: false,
      message: "ticketPrice and availableTickets must be numbers"
    };
  }

  return { valid: true };
}