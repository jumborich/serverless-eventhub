const { handler } = require("../src/handlers/updateEvent");

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
          if(data.Key.eventId === "11111") {
            return { Attributes: { eventId: "11111" } };
          }

          return { Attributes: null };  
        }),
      })),
    },
    UpdateCommand: jest.fn((params) => {
      return params;
    }
  )};  
});

describe('Update Event API Module', () => {
  test('Should return error if No update data provided in request body', async () => {
    const mockLambdaEvent = {
      pathParameters: {
        eventId: "12345",
      },
      body: JSON.stringify({}) // No update data
    }

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe("No update data provided")
  });

  test('Should return error if No valid update fields provided', async () => {
    const mockLambdaEvent = {
      pathParameters: {
        eventId: "97834",
      },
      body: JSON.stringify({
        invalidField: "Invalid Value"
      })
    }

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe("No valid update fields provided")
  });

  test('Should return error if No valid update fields provided', async () => {
    const mockLambdaEvent = {
      pathParameters: {
        eventId: "97834",
      },
      body: JSON.stringify({
        invalidField: "Invalid Value"
      })
    }

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe("No valid update fields provided")
  });

  test('Should return error if Event is not found or update failed', async () => {
    const mockLambdaEvent = {
      pathParameters: {
        eventId: "45534",
      },
      body: JSON.stringify({
        availableTickets: 1000
      })
    }

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body).error).toBe("Event not found or update failed")
  });

  test('Should return a JSON Object to client for a given eventId in DB', async () => {
    const mockLambdaEvent = {
      pathParameters: {
        eventId: "11111",
      },
      body: JSON.stringify({
        availableTickets: 1000
      })
    }

    const result = await handler(mockLambdaEvent);
    expect(result.statusCode).toBe(200);
    expect(Object.hasOwn(JSON.parse(result.body), "event")).toBeTruthy()
  });
});