
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

// Allowed update fields
const allowedUpdateFields = [
  "name",
  "date",
  "location",
  "ticketPrice",
  "availableTickets",
  "expiresAt"
];

// Cherry-pick only allowed fields from the input data
// and add backend-controlled updatedAt timestamp
exports.getFieldsToUpdate = (data) => {
  const updateFields = {
    updatedAt: new Date().toISOString()
  };

  allowedUpdateFields.forEach((field) => { 
    if((data[field])){
      updateFields[field] = data[field];
    }
  });

  return updateFields
}