const { handler } = require("../src/handlers/listEvents");

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
        send: jest.fn(() => {
        return { Item: [
          { eventId: "12345", name: "Mocked Event", date: "2025-05-20", location: "Toronto, Canada", ticketPrice: 100, availableTickets: 50 },
          { eventId: "67890", name: "Another Mocked Event", date: "2025-06-20", location: "Vancouver, Canada", ticketPrice: 150, availableTickets: 30 }
        ] };
        }),
      })),
    },
    ScanCommand: jest.fn()
  };  
});

describe('List Events API Module', () => {
  test('Should return list of all events in DB', async () => {
    const result = await handler();
    expect(result.statusCode).toBe(200);
    expect(Object.hasOwn(JSON.parse(result.body), "events")).toBeTruthy()
  });
});