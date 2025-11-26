import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Hero Banner Slider (RSC Compatible)

export default function HeroBanner() {
  const slides = [
    {
      id: 1,
      title: "Find Your Perfect Ride",
      subtitle: "Browse thousands of cars from trusted providers",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    },
    {
      id: 2,
      title: "Easy & Fast Booking",
      subtitle: "Book your desired car in just a few clicks",
      img: "https://images.unsplash.com/photo-1493238792000-8113da705763",
    },
    {
      id: 3,
      title: "Affordable Daily Rentals",
      subtitle: "Best prices, premium cars, reliable service",
      img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023",
    },
  ];

  return (
    <div className="w-full select-none">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3500}
        showThumbs={false}
        showStatus={false}
        swipeable
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[500px]">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{slide.title}</h1>
              <p className="text-lg md:text-xl max-w-2xl">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
