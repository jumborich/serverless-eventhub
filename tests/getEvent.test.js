const { handler } = require("../src/handlers/getEvent");

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
          if(data.Key.eventId === "12345") {
            return { Item: { eventId: "12345", name: "Mocked Event", date: "2025-05-20", location: "Toronto, Canada", ticketPrice: 100, availableTickets: 50 } };
          }
          return { Item: null };  
        }),
      })),
    },
    GetCommand: jest.fn((params) => {
      return params;
    }
  )};  
});

describe('Get Event API Module', () => {
  test('Should return error message to client for missing eventId in request', async () => {
    const mockLambdaEvent = {
      pathParameters: {}
    }

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe("Missing eventId in path parameters")
  });

  test('Should return error message to client for eventId not found in DB', async () => {
    const mockLambdaEvent = {
      pathParameters: {
        eventId: "97834",
      }
    }

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body).error).toBe("Event not found")
  });

  test('Should return a JSON Object to client for a given eventId in DB', async () => {
    const mockLambdaEvent = {
      pathParameters: {
        eventId: "12345",
      }
    }

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(200);
    expect(Object.hasOwn(JSON.parse(result.body), "event")).toBeTruthy()
  });
});