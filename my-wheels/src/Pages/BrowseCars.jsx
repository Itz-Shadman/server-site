import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../Compoenets/Spinner";


const BrowseCars = ({ userEmail }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/cars");
      setCars(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cars!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();

    // Listen for booking updates
    const refresh = () => fetchCars();
    window.addEventListener("booking-updated", refresh);
    return () => window.removeEventListener("booking-updated", refresh);
  }, []);

  const handleBooking = async (car) => {
    if (!userEmail) return alert("Enter your email!");
    if (car.status === "unavailable") return alert("This car is already booked!");

    const bookingData = {
      userEmail,
      carId: car._id,
      carName: car.carName,
      carCategory: car.category,
      carImage: car.image,
      rentPrice: car.rentPrice,
      status: "Booked",
    };

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/book", bookingData);
      setCars(cars.map(c => c._id === car._id ? { ...c, status: "unavailable" } : c));
      toast.success("Car booked!");
      window.dispatchEvent(new Event("booking-updated"));
    } catch (err) {
      console.error(err);
      toast.error("Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = cars.filter(car => car.carName.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-center mb-6">Browse Cars</h2>

      <div className="mb-4 flex justify-center gap-2">
        <input
          type="text"
          placeholder="Search by car name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCars.length === 0 && (
          <p className="text-center text-gray-400 col-span-full">No cars found.</p>
        )}
        {filteredCars.map(car => (
          <div key={car._id} className="border rounded-lg shadow p-4 flex flex-col relative">
            <span className={`absolute top-2 right-2 px-2 py-1 rounded text-white font-bold text-sm ${car.status === "unavailable" ? "bg-red-600" : "bg-green-600"}`}>
              {car.status === "unavailable" ? "Booked" : "Available"}
            </span>

            <img src={car.image} alt={car.carName} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-3">{car.carName}</h3>
            <p className="text-gray-600 mt-1"><strong>Category:</strong> {car.category}</p>
            <p className="text-gray-600 mt-1"><strong>Rent:</strong> ${car.rentPrice}/day</p>

            <button
              disabled={car.status === "unavailable"}
              onClick={() => handleBooking(car)}
              className={`mt-auto py-2 px-4 rounded text-white ${car.status === "unavailable" ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            >
              {car.status === "unavailable" ? "Booked" : "Book Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCars;
