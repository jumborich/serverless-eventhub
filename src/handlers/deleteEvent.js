const { deleteEventById } = require("../services/dynamoService");
const { sendFinalResponse } = require("../services/utils");

exports.handler = async (event) => {
  try {
    const eventId = event.pathParameters?.eventId;

    if (!eventId) {
      return sendFinalResponse({
        statusCode: 400,
        body: JSON.stringify({ error: "Missing eventId in path parameters" }),
      });
    }

    const wasDeleted = await deleteEventById(eventId);

    if (!wasDeleted) {
      return sendFinalResponse({
        statusCode: 404,
        body: JSON.stringify({ error: "Event not found" }),
      });
    }

    return sendFinalResponse({
      statusCode: 204, // No Content
      body: null,
    });
  } catch (error) {
    console.error("Handler Error:", error);
    return sendFinalResponse({
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    });
  }
};