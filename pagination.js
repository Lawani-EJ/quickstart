const { SquareClient, SquareEnvironment, SquareError } = require("square");
require("dotenv").config();

// Create a new Square client
const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox, // Sandbox mode for testing
});

// Function to demonstrate pagination (using Customers API)
async function listAllCustomers() {
  console.log("Fetching all customers using pagination...\n");

  try {
    let cursor = null; // This will hold the position of the next page
    let page = 1;      // To keep track of which page we're on

    do {
      // Make the API call with the cursor (if it's null, it fetches the first page)
      const response = await client.customers.list({ cursor });

      // Extract the customers and the cursor for the next page
      const customers = response.customers || [];
      cursor = response.cursor;

      console.log(`📄 Page ${page}: Found ${customers.length} customers`);
      customers.forEach((c) =>
        console.log(`➡️ ${c.id}: ${c.givenName || "No Name"} ${c.familyName || ""}`)
      );

      page++;
      console.log("----------------------------------");

    } while (cursor); // Continue looping if there’s another page

    console.log("\n✅ Finished listing all customers!");
  } catch (error) {
    if (error instanceof SquareError) {
      error.errors.forEach((e) =>
        console.error(e.category, e.code, e.detail)
      );
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

// Run the pagination function
listAllCustomers();
