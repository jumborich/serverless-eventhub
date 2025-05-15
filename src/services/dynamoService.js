const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

// This function creates an event in DynamoDB using the AWS SDK for JavaScript v3.
exports.createEvent = async (event) => {
  const params = {
    TableName: process.env.EventsTableName,
    Item: event,
  };

  try {
    await docClient.send(new PutCommand(params));
    return { success: true, event };
  } catch (error) {
    console.error("DynamoDB PutCommand Error:", error);
    throw new Error("Could not create event");
  }
}

exports.getEventById = async (eventId) => {
  const params = {
    TableName: process.env.EventsTableName,
    Key: { eventId },
  };

  try {
    const result = await docClient.send(new GetCommand(params));
    return result.Item;
  } catch (error) {
    console.error("DynamoDB GetCommand Error:", error);
    throw new Error("Could not retrieve event");
  }
}

/** Queries the DB for available events */
exports.listEvents = async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
  };

  try {
    const result = await docClient.send(new ScanCommand(params));
    return result.Items || []; // Return an empty array if no items found
  } catch (error) {
    console.error("DynamoDB ScanCommand Error:", error);
    throw new Error("Could not list events");
  }
}
