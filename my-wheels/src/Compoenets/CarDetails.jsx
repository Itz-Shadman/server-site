import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Pages/AuthProvider";


const CarDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // ✅ get logged-in user
  const userEmail = user?.email; // ✅ userEmail from AuthContext
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleBooking = async () => {
    if (!userEmail) return toast.error("Please login first!");
    if (!car || car.status === "unavailable") return;

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/book", {
        userEmail,
        carId: car._id,
        carName: car.carName,
        carCategory: car.category,
        carImage: car.image,
        rentPrice: car.rentPrice,
        status: "Booked"
      });
      toast.success("Car booked successfully!");
      setCar({ ...car, status: "unavailable" });
      window.dispatchEvent(new Event("booking-updated")); // update MyBookings
    } catch {
      toast.error("Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!car) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row gap-6">
        <img src={car.image} alt={car.carName} className="w-full md:w-1/2 h-64 object-cover rounded shadow" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{car.carName}</h2>
          <p>Description: {car.description}</p>
          <p>Category: {car.category}</p>
          <p>Rent Price: ${car.rentPrice}</p>
          <p>Location: {car.location}</p>
          <p>Status: <span className={car.status==="unavailable"?"text-red-600":"text-green-600"}>{car.status==="unavailable"?"Booked":"Available"}</span></p>
          <p>Provider: {car.providerName} ({car.providerEmail})</p>
          <button
            onClick={handleBooking}
            disabled={car.status==="unavailable" || loading}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {car.status==="unavailable" ? "Already Booked" : loading ? "Booking..." : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
