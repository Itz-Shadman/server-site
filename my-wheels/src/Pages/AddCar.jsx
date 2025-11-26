import React, { useState, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "./AuthProvider";

const AddCar = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    carName: "",
    description: "",
    category: "Sedan",
    rentPrice: "",
    location: "",
    image: "",
    status: "available",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/cars", { ...formData, providerName: user.displayName });
      toast.success("Car added successfully!");
      setFormData({ carName: "", description: "", category: "Sedan", rentPrice: "", location: "", image: "", status: "available" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add car!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black shadow rounded mt-10">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="carName" value={formData.carName} onChange={handleChange} placeholder="Car Name" required className="w-full border rounded px-3 py-2"/>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full border rounded px-3 py-2"/>
        <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded px-3 py-2">
          <option>Sedan</option>
          <option>SUV</option>
          <option>Hatchback</option>
          <option>Luxury</option>
          <option>Electric</option>
        </select>
        <input type="number" name="rentPrice" value={formData.rentPrice} onChange={handleChange} placeholder="Rent Price per day" required className="w-full border rounded px-3 py-2"/>
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="w-full border rounded px-3 py-2"/>
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Hosted Image URL" required className="w-full border rounded px-3 py-2"/>
        <input type="text" value={user.displayName} readOnly className="w-full border rounded px-3 py-2 bg-gray-700 text-white"/>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
