import React from "react";
import { FaRegClock, FaWallet, FaShieldAlt, FaHeadset } from "react-icons/fa";

const benefits = [
  {
    id: 1,
    title: "Easy Booking",
    description: "Reserve your car in just a few clicks, hassle-free.",
    icon: <FaRegClock className="text-4xl text-blue-600 mb-4" />,
  },
  {
    id: 2,
    title: "Affordable Rates",
    description: "Get the best prices on premium cars for daily rentals.",
    icon: <FaWallet className="text-4xl text-green-600 mb-4" />,
  },
  {
    id: 3,
    title: "Trusted Providers",
    description: "All cars are from verified and trusted providers.",
    icon: <FaShieldAlt className="text-4xl text-red-600 mb-4" />,
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "We are here to help you anytime, day or night.",
    icon: <FaHeadset className="text-4xl text-yellow-600 mb-4" />,
  },
];

const WhyRentWithUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Why Rent With Us</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition"
          >
            {benefit.icon}
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyRentWithUs;
