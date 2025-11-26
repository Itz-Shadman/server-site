import React from 'react';
import Navbar from '../Compoenets/Navbar';
import HeroBanner from '../Compoenets/HeroBanner';
import FeaturedCars from '../Compoenets/FeaturedCars';
import WhyRentWithUs from '../Compoenets/WhyRentWithUs';
import TopRatedCars from '../Compoenets/TopRatedCars';
import CustomerTestimonials from '../Compoenets/CustomerTestimonials';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <FeaturedCars/>
            <WhyRentWithUs/>
            <TopRatedCars/>
            <CustomerTestimonials/>
        </div>
    );
};

export default Home;