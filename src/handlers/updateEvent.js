const { updateEventById } = require("../services/dynamoService");
const { sendFinalResponse } = require("../services/utils");
const { getFieldsToUpdate } = require("../services/validators");

exports.handler = async (event) => {
  try {
    const eventId = event.pathParameters?.eventId;
    const body = JSON.parse(event.body);

    if (!eventId) {
      return sendFinalResponse({
        statusCode: 400,
        body: JSON.stringify({ error: "Missing eventId in path parameters" }),
      });
    }

    if (!body || Object.keys(body).length === 0) {
      return sendFinalResponse({
        statusCode: 400,
        body: JSON.stringify({ error: "No update data provided" }),
      });
    }

    const safeUpdateData = getFieldsToUpdate(body);
    if (Object.keys(safeUpdateData).length === 1 && safeUpdateData.updatedAt) {
      // Nothing to update except updatedAt
      return sendFinalResponse({
        statusCode: 400,
        body: JSON.stringify({ error: "No valid update fields provided" }),
      });
    }

    const updatedEvent = await updateEventById(eventId, safeUpdateData);

    if (!updatedEvent) {
      return sendFinalResponse({
        statusCode: 404,
        body: JSON.stringify({ error: "Event not found or update failed" }),
      });
    }

    return sendFinalResponse({
      statusCode: 200,
      body: JSON.stringify({ event: updatedEvent }),
    });
  } catch (error) {
    console.error("Handler Error:", error);
    return sendFinalResponse({
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    });
  }
}