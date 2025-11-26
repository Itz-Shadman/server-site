import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const TopRatedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/top-rated-cars") // Use the new endpoint
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Top Rated Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="border rounded-lg shadow p-4 hover:shadow-lg transition flex flex-col">
            <img src={car.image} alt={car.carName} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-3">{car.carName}</h3>
            <p className="text-gray-600 mt-1">
            <strong>Rating:</strong> {car.rating || 0} ⭐
            </p>
            <p className="text-gray-600 mt-1">
            <strong>Rent Price:</strong> ${car.rentPrice}/day
            </p>
            <Link
              to={`/cars/${car._id}`}
              className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedCars;
