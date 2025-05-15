const { handler } = require("../src/handlers/createEvent");

jest.mock("@aws-sdk/client-dynamodb", () => {
  return {
    DynamoDBClient: jest.fn(() => ({
      send: jest.fn(),
    })),
  };
});

jest.mock("@aws-sdk/lib-dynamodb", () => {
  return {
    DynamoDBDocumentClient: {
      from: jest.fn(() => ({
        send: jest.fn(),
      })),
    },
    PutCommand: jest.fn(),
  };
});

describe('Create Event API Module', () => {
  test('Should add an event in DDB and return the created JSON Object to client', async () => {
    const mockLambdaEvent = {
      body: JSON.stringify({
      name: "Serverless Dev meetup",
      date: "2025-05-20",
      location: "Toronto, Canada",
      ticketPrice: 100,
      availableTickets: 50,
    })}

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(201);
    expect(Object.hasOwn(JSON.parse(result.body), "event")).toBeTruthy()
  });

  test('Should return error to client if missing required fields', async () => {
    const mockLambdaEvent = {
      body: JSON.stringify({
      // name: "Serverless Dev meetup",
      date: "2025-05-20",
      location: "Toronto, Canada",
      ticketPrice: 100,
      availableTickets: 50,
    })}

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(400);
    expect(Object.hasOwn(JSON.parse(result.body), "error")).toBeTruthy()
  });
});