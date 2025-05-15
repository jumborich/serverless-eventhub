// Handler to create an event

const { createEvent } = require("../services/dynamoService");
const { validateEventInput } = require("../services/validators");
const { getEventTTL, sendFinalResponse } = require("../services/utils");
const { randomUUID } = require("node:crypto");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log("Request Body:", body);

    const validation = validateEventInput(body);
    if(!validation.valid) {
      return sendFinalResponse({
        statusCode: 400,
        body: JSON.stringify({ error: validation.message }),
      })
    }

    const result = await createEvent({
      eventId: randomUUID(),
      name: body.name,
      date: body.date,
      location: body.location,
      ticketPrice: Number(body.ticketPrice),
      availableTickets: Number(body.availableTickets),
      expiresAt: getEventTTL(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    console.log("Event Created:", result);
    return sendFinalResponse({
      statusCode: 201,
      body: JSON.stringify(result),
    });
  } catch (error) {
    console.error("Handler Error:", error);
    return sendFinalResponse({
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    });
  }
};