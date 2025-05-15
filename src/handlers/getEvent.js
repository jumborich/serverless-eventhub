const { getEventById } = require("../services/dynamoService");
const { sendFinalResponse } = require("../services/utils");

exports.handler = async (event) => {
  try {
    const pathParameters = event.pathParameters || {};
    console.log("Request Parameters:", pathParameters);
    const eventId = pathParameters?.eventId;

    if (!eventId) {
      return sendFinalResponse({
        statusCode: 400,
        body: JSON.stringify({ error: "Missing eventId in path parameters" }),
      });
    }

    const foundEvent = await getEventById(eventId);
    if (!foundEvent) {
      return sendFinalResponse({
        statusCode: 404,
        body: JSON.stringify({ error: "Event not found" }),
      });
    }

    return sendFinalResponse({
      statusCode: 200,
      body: JSON.stringify({ event: foundEvent }),
    });
  } catch (error) {
    console.error("Handler Error:", error);
    return sendFinalResponse({
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    });
  }
};