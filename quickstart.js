const { SquareClient, SquareEnvironment, SquareError } = require("square"); //this imports the Square SDK
require('dotenv').config() //what this does is load the .env file and makes the variables available in process.env

// client object
const client = new SquareClient({ //this section creates a new Square client
  token: process.env.SQUARE_ACCESS_TOKEN, //set access token from .env file
  environment: SquareEnvironment.Sandbox, //set environment to Sandbox
});

// async function to list locations
async function getLocations() {
  try {
    let listLocationsResponse = await client.locations.list();

    let locations = listLocationsResponse.locations;

    locations.forEach(function (location) {
      console.log(
        location.id + ": " +
        location.name + ", " +
        location.address.addressLine1 + ", " +
        location.address.locality
      );
    });
  } catch (error) {
    if (error instanceof SquareError) {
      error.errors.forEach(function (e) {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
};

getLocations();
