const { handler } = require("../src/handlers/deleteEvent");

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
        send: jest.fn((data) => {
          return {};
        }),
      })),
    },
    DeleteCommand: jest.fn((params) => {
      return params;
    }
  )};  
});

describe('Delete Event API Module', () => {
  test('Should return 204 response on successful event update', async () => {
    const mockLambdaEvent = {
      pathParameters: {
        eventId: "12345",
      },
      body: JSON.stringify({})
    }

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(204);
  });
});