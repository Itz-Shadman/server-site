import React from 'react';
import Navbar from '../Compoenets/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Compoenets/Footer';
import { Toaster } from "react-hot-toast";

const Root = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-white flex flex-col">
            <Toaster position="top-right" />
            <Navbar />
            
            {/* Main content */}
            <main className="flex-1">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default Root;
