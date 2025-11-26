import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../Compoenets/Spinner";


const MyBookings = ({ userEmail }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!userEmail) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/myBookings?email=${userEmail}`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookings!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const refresh = () => fetchBookings();
    window.addEventListener("booking-updated", refresh);
    return () => window.removeEventListener("booking-updated", refresh);
  }, [userEmail]);

  const handleUnbook = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await axios.delete(`http://localhost:3000/myBookings/${id}`);
      toast.success("Booking cancelled!");
      setBookings(bookings.filter(b => b._id !== id));
      window.dispatchEvent(new Event("booking-updated"));
    } catch (err) {
      console.error(err);
      toast.error("Cancel failed!");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-400">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookings.map(b => (
            <div key={b._id} className="border rounded-lg shadow p-4 flex flex-col">
              <img src={b.carImage} alt={b.carName} className="w-full h-48 object-cover rounded" />
              <h3 className="text-xl font-semibold mt-3">{b.carName}</h3>
              <p className="text-gray-600 mt-1"><strong>Category:</strong> {b.carCategory}</p>
              <p className="text-gray-600 mt-1"><strong>Rent Price:</strong> ${b.rentPrice}/day</p>
              <p className="text-gray-600 mt-1"><strong>Status:</strong> {b.status}</p>
              <button onClick={() => handleUnbook(b._id)} className="mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700">Cancel Booking</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
