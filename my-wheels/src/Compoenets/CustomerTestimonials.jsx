import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    message: "Best car rental service! Easy booking and affordable rates.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Smith",
    message: "Trusted providers and amazing cars. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Samantha Lee",
    message: "Customer support is fantastic! I felt safe booking with them.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "David Brown",
    message: "Top notch cars and service. Will rent again for sure!",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
];

const CustomerTestimonials = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded shadow hover:shadow-lg transition text-center">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-600 italic mb-2">"{t.message}"</p>
            <h4 className="font-semibold">{t.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTestimonials;
