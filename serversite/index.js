process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config()
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri =
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_Password}@cluster0.zawwcbc.mongodb.net/smart_bd?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  family: 4,
});

let carsCollection;
let bookingsCollection;

async function startServer() {
  try {
    await client.connect();
    const db = client.db("smart_bd");
    carsCollection = db.collection("cars");
    bookingsCollection = db.collection("bookings");
    console.log("✅ Connected to MongoDB!");

   
    app.get("/", (req, res) => {
      res.send("🚗 SmartBD Server is Running!");
    });

  
    app.post("/cars", async (req, res) => {
      try {
        const car = req.body;
        if (!car.carName || !car.description || !car.rentPrice || !car.location) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await carsCollection.insertOne({
          ...car,
          status: "Available",
          createdAt: new Date(),
        });
        res.status(201).json({ message: "Car added successfully!", data: result });
      } catch (err) {
        res.status(500).json({ message: "Failed to add car", error: err.message });
      }
    });

    // 📋 Get All Cars
    app.get("/cars", async (req, res) => {
      try {
        const { search } = req.query;
        const query = search ? { carName: { $regex: search, $options: "i" } } : {};
        const cars = await carsCollection.find(query).toArray();
        res.json(cars);
      } catch (err) {
        res.status(500).json({ message: "Failed to fetch cars", error: err.message });
      }
    });

    //  Featured Cars
    app.get("/cars/featured", async (req, res) => {
      try {
        const cars = await carsCollection.find({}).sort({ _id: -1 }).limit(6).toArray();
        res.json(cars);
      } catch (err) {
        res.status(500).json({ message: "Failed to load featured cars", error: err.message });
      }
    });

    //  Top Rated Cars
    app.get("/cars/top-rated",async (req, res) => {
      try {
        const cars = await carsCollection.find({}).sort({ rating: -1 }).limit(6).toArray();
        res.json(cars);
      } catch (err) {
        res.status(500).json({ message: "Failed to fetch top-rated cars", error: err.message });
      }
    });


//Node.js/Express server file:
app.get("/cars/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // const car = await carsCollection.findOne({ _id: new ObjectId(id) });
         const car = await carsCollection.findOne({ _id:(id) });

    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Error fetching car", error: err.message });
  }
});

    //  Update Car
    app.patch("/cars/:id", async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid car ID" });
      }

      try {
       const car = await carsCollection.findOne({ _id:(carId) });

        res.json({ message: "Car updated successfully", data: result });
      } catch (err) {
        res.status(500).json({ message: "Failed to update car", error: err.message });
      }
    });

    //  Delete Car
    app.delete("/cars/:id", async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid car ID" });
      }

      try {
        const result = await carsCollection.deleteOne({ _id:new ObjectId(id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Car not found" });
        }
        res.json({ message: "Car deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: "Failed to delete car", error: err.message });
      }
    });

    // Book a Car
app.post("/my-bookings", async (req, res) => {
  try {
    const { carId, userName, userEmail } = req.body;
    if (!carId || !userName || !userEmail) {
      return res.status(400).json({ message: "Missing booking details" });
    }

    if (!ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }
    const car = await carsCollection.findOne({ _id:new ObjectId(carId) });
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.status === "Booked") {
      return res.status(400).json({ message: "Car already booked" });
    }

    await bookingsCollection.insertOne({
      carId:(carId),
      userName,
      userEmail,
      status: "Booked",
      createdAt: new Date(),
    });

    await carsCollection.updateOne(
      { _id:(carId) },
      { $set: { status: "Booked" } }
    );

    res.status(201).json({ message: "Booking successful!" });
  } catch (err) {
    console.error("❌ Booking error:", err);
    res.status(500).json({ message: "Failed to book car", error: err.message });
  }
});

    // Get All Bookings
   app.get("/my-bookings", async (req, res) => {
  try {
    const { userEmail } = req.query;
    const query = userEmail ? { userEmail } : {};
    const bookings = await bookingsCollection.find(query).toArray();

    const populated = await Promise.all(
      bookings.map(async (b) => {
        const car = await carsCollection.findOne({ _id:(b.carId) });
        return { ...b, car };
      })
    );

    res.json(populated);
  } catch (err) {
    console.error("❌ Fetch bookings error:", err);
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
});

    //  Start Server
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

startServer();
