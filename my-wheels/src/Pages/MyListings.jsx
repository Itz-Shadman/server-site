import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../Compoenets/Spinner";

const MyListings = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch cars
  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/cars");
      setCars(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Delete car
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      await axios.delete(`http://localhost:3000/cars/${id}`);
      toast.success("Car deleted!");
      setCars(cars.filter((car) => car._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!");
    }
  };

  // Open modal for editing
  const handleEdit = (car) => {
    setEditingCar({
      ...car,
      carName: car.carName || car.name,
      category: car.carCategory || car.category,
      rentPrice: car.rentPrice,
      status: car.status || "Available",
    });
    setShowModal(true);
  };

  // Handle input
  const handleChange = (e) => {
    setEditingCar({ ...editingCar, [e.target.name]: e.target.value });
  };

  // Update car
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/cars/${editingCar._id}`,
        {
          carName: editingCar.carName,
          carCategory: editingCar.category,
          rentPrice: editingCar.rentPrice,
          status: editingCar.status,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Car updated successfully!");

      setShowModal(false);
      fetchCars();
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-center mb-6">My Listings</h2>

      {cars.length === 0 ? (
        <p className="text-center text-gray-400">No cars listed.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Car Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Rent Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-t">
                  <td className="px-4 py-2">{car.carName || car.name}</td>
                  <td className="px-4 py-2">{car.carCategory || car.category}</td>
                  <td className="px-4 py-2">${car.rentPrice}</td>
                  <td className="px-4 py-2">{car.status || "Available"}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {showModal && editingCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-500 p-6 rounded shadow w-96">
            <h3 className="text-xl font-bold mb-4">Update Car</h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="carName"
                value={editingCar.carName}
                onChange={handleChange}
                placeholder="Car Name"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="category"
                value={editingCar.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="number"
                name="rentPrice"
                value={editingCar.rentPrice}
                onChange={handleChange}
                placeholder="Rent Price"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="status"
                value={editingCar.status}
                onChange={handleChange}
                placeholder="Status"
                className="w-full border rounded px-3 py-2"
              />

              <div className="flex justify-end space-x-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
