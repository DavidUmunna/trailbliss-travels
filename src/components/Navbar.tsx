import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <img src={require("../assets/travel.png")} alt="Logo" className="inline-block h-8 mr-2" />
          TrailBliss Travels
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/destinations" className="hover:text-gray-300">Destinations</Link>
          </li>
          <li>
            <Link to="/tours" className="hover:text-gray-300">Tours</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;