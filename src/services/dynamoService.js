const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

// This function creates an event in DynamoDB using the AWS SDK for JavaScript v3.
module.exports.createEvent = async (event) => {
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