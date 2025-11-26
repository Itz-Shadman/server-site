import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 border-t border-gray-700 mt-12">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    
                    {/* Col 1 & 2: Logo, Website Name, and Copyright */}
                    <div className="col-span-2 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            {/* Logo (Inline SVG for car icon) */}
                            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10v4a2 2 0 002 2h14a2 2 0 002-2v-4M3 10h18M7 10l3-5h4l3 5M3 14h18" />
                            </svg>
                            {/* Website Name */}
                            <span className="text-2xl font-extrabold text-yellow-500 tracking-wider">
                                Rent<span className="text-white">Car</span>
                            </span>
                        </div>
                        <p className="text-sm">Your reliable partner for car rentals worldwide. Drive your dreams.</p>
                        <p className="text-xs mt-4 text-gray-500">© {new Date().getFullYear()} RentCar, Inc. All rights reserved.</p>
                    </div>

                    {/* Col 3: Contact Info */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="tel:1-800-555-0199" className="hover:text-yellow-500">Phone: (800) 555-0199</a></li>
                            <li><a href="mailto:support@rentcar.com" className="hover:text-yellow-500">Email: support@rentcar.com</a></li>
                            <li>Address: 123 Car Lane, Metropolis</li>
                        </ul>
                    </div>

                    {/* Col 4: Terms & Conditions (Legal) */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-yellow-500">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-yellow-500">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-yellow-500">Sitemap</a></li>
                        </ul>
                    </div>

                    {/* Col 5: Social Media Links */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            {/* Facebook Icon */}
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition duration-150">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-3v-1c0-.552.448-1 1-1h2v-3h-3c-2.209 0-4 1.791-4 4v2h-3v3h3v8h4v-8h3l1-3z"/></svg>
                            </a>
                            {/* Twitter Icon */}
                            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition duration-150">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.791-1.574 2.155-2.724-.951.564-2.005.974-3.127 1.195-.898-.957-2.178-1.555-3.593-1.555-3.125 0-5.656 2.531-5.656 5.656 0 .445.05.877.143 1.29-.47-.024-.937-.083-1.393-.169-2.09-.434-3.958-1.785-5.207-3.914-.492.846-.777 1.832-.777 2.898 0 1.956.994 3.684 2.503 4.698-.927-.028-1.796-.284-2.559-.707.001.023.001.047.001.071 0 2.738 1.944 5.034 4.516 5.568-.471.128-.968.196-1.478.196-.363 0-.715-.035-1.057-.101.714 2.246 2.793 3.882 5.263 3.926-1.926 1.51-4.34 2.417-6.974 2.417-.458 0-.91-.025-1.357-.08 2.486 1.583 5.435 2.502 8.583 2.502 10.297 0 15.934-8.528 15.934-15.934 0-.243-.006-.486-.014-.727.818-.592 1.528-1.334 2.091-2.182z"/></svg>
                            </a>
                            {/* Instagram Icon */}
                            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition duration-150">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-3.321 0-3.734.013-5.046.073-1.312.06-2.222.28-3.024.593-.799.314-1.46.75-2.043 1.332-.582.583-1.018 1.244-1.332 2.043-.313.802-.533 1.712-.593 3.024-.06 1.312-.073 1.725-.073 5.046s.013 3.734.073 5.046c.06 1.312.28 2.222.593 3.024.314.799.75 1.46 1.332 2.043.583.582 1.244 1.018 2.043 1.332.802.313 1.712.533 3.024.593 1.312.06 1.725.073 5.046.073s3.734-.013 5.046-.073c1.312-.06 2.222-.28 3.024-.593.799-.314 1.46-.75 2.043-1.332.582-.583 1.244-1.018 1.332-2.043.313-.802.533-1.712.593-3.024.06-1.312.073-1.725.073-5.046s-.013-3.734-.073-5.046c-.06-1.312-.28-2.222-.593-3.024-.314-.799-.75-1.46-1.332-2.043-.583-.582-1.244-1.018-2.043-1.332-.802-.313-1.712-.533-3.024-.593-1.312-.06-1.725-.073-5.046-.073zm0 2.27c3.259 0 3.667.012 4.945.072 1.282.059 1.944.275 2.454.475.526.208.972.5 1.328.857.356.356.649.803.857 1.328.2.51.416 1.172.475 2.454.06 1.278.072 1.686.072 4.945s-.012 3.667-.072 4.945c-.059 1.282-.275 1.944-.475 2.454-.208.526-.5 1.037-.857 1.328-.356.356-.803.649-1.328.857-.51.2-.557.416-1.172.475-1.278.06-1.686.072-4.945.072s-3.667-.012-4.945-.072c-1.282-.059-1.944-.275-2.454-.475-.526-.208-.5 1.037-.857 1.328-.356.356-.803.649-1.328.857-.51.2-1.172-.416-2.454-.475-1.278-.06-1.686-.072-4.945-.072s-3.667-.012-4.945-.072c-1.282-.059-1.944-.275-2.454-.475-.526-.208-.972-.5-1.328-.857-.356-.356-.803-.649-1.328-.857-.51.2-1.172-.416-2.454-.475-1.278-.06-1.686-.072-4.945-.072zm0 3.864c-2.483 0-4.5 2.017-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.017 4.5-4.5-2.017-4.5-4.5-4.5zm0 7.364c-1.589 0-2.875-1.286-2.875-2.875s1.286-2.875 2.875-2.875 2.875 1.286 2.875 2.875-1.286 2.875-2.875 2.875zm6.541-11.838c-.378 0-.683.305-.683.683s.305.683.683.683.683-.305.683-.683-.305-.683-.683z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;