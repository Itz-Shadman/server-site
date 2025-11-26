import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router"; // ✅ important

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/featured-cars")
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map(car => (
          <div key={car._id} className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
            <img src={car.image} alt={car.carName} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-3">{car.carName}</h3>
            <p className="text-gray-600 mt-1"><strong>Type/Model:</strong> {car.category}</p>
            <p className="text-gray-600 mt-1"><strong>Rent Price:</strong> ${car.rentPrice} / day</p>
            <p className="text-gray-600 mt-1"><strong>Provider:</strong> {car.providerName}</p>
            <Link
              to={`/cars/${car._id}`} // ✅ navigates to CarDetails
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

export default FeaturedCars;
