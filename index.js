
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config()
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zawwcbc.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function run() {
  try {
    await client.connect();
    console.log("MongoDB Connected ✔");

    const db = client.db("car_rental_db");
    const carsCollection = db.collection("cars");
    const bookingsCollection = db.collection("bookings");

    // All Cars
    app.get("/cars", async (req, res) => {
      const cars = await carsCollection.find().toArray();
      res.send(cars);
    });

    // Single car
    app.get("/cars/:id", async (req, res) => {
      const car = await carsCollection.findOne({ _id: new ObjectId(req.params.id) });
      res.send(car);
    });

    // Featured Cars
    app.get("/featured-cars", async (req, res) => {
      const cars = await carsCollection.find().sort({ _id: -1 }).limit(6).toArray();
      res.send(cars);
    });

    // Top rated cars (fixed)
    app.get("/top-rated-cars", async (req, res) => {
   const cars = await carsCollection.find().toArray();
   const sorted = cars
    .map(car => ({ ...car, rating: car.rating || 0 })) // default rating to 0
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
    res.send(sorted);
   });


    // Add car
    app.post("/cars", async (req, res) => {
      const car = req.body;
      const result = await carsCollection.insertOne(car);
      res.send(result);
    });

    // Update car
    app.patch("/cars/:id", async (req, res) => {
      const updatedCar = req.body;
      const result = await carsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedCar }
      );
      res.send(result);
    });

    // Delete car
    app.delete("/cars/:id", async (req, res) => {
      const result = await carsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    // Book a car
    app.post("/book", async (req, res) => {
      const bookingData = req.body;
      const bookingResult = await bookingsCollection.insertOne(bookingData);

      // Update car status
      await carsCollection.updateOne(
        { _id: new ObjectId(bookingData.carId) },
        { $set: { status: "unavailable" } }
      );

      res.send({ bookingResult });
    });

    // Fetch bookings (user-specific)
    app.get("/myBookings", async (req, res) => {
      const { email } = req.query;
      const query = email ? { userEmail: email } : {};
      const bookings = await bookingsCollection.find(query).toArray();
      res.send(bookings);
    });

    // Cancel booking
    app.delete("/myBookings/:id", async (req, res) => {
      const booking = await bookingsCollection.findOne({ _id: new ObjectId(req.params.id) });
      if (!booking) return res.status(404).send({ error: "Booking not found!" });

      const deleteResult = await bookingsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

      // Make car available again
      await carsCollection.updateOne(
        { _id: new ObjectId(booking.carId) },
        { $set: { status: "available" } }
      );

      res.send({ message: "Booking cancelled successfully", deleteResult });
    });

  } finally {
    // client.close(); // optional
  }
}

run().catch(console.dir);

app.listen(port, () => console.log(`Server running on port ${port} 🚀`));
