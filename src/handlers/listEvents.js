const { listEvents } = require("../services/dynamoService");
const { sendFinalResponse } = require("../services/utils");

exports.handler = async () => {
  try {
    const events = await listEvents();
    return sendFinalResponse({
      statusCode: 200,
      body: JSON.stringify({ events }),
    });
  } catch (error) {
    console.error("Handler Error:", error);
    return sendFinalResponse({
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    });
  }
};