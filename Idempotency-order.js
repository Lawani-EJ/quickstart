const { SquareClient, SquareEnvironment, SquareError } = require("square");
const { randomUUID } = require("crypto");
require("dotenv").config();

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox, //for new SDK
});

async function createOrder() {
  try {
    const idempotencyKey = randomUUID();
    const locationId = process.env.SQUARE_LOCATION_ID;

    const response = await client.orders.create({
      idempotencyKey: idempotencyKey,
      order: {
        locationId: locationId,
        lineItems: [
          {
            name: "Test Item",
            quantity: "1",
            basePriceMoney: {
              amount: BigInt(100),
              currency: "USD",
            },
          },
        ],
      },
    });

    console.log("✅ Order created successfully!");
    console.log(response);
  } catch (error) {
    if (error instanceof SquareError) {
      console.error("Square API Error:", error.errors);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

createOrder();
