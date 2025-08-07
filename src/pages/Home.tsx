import React from "react";
import Card from "../components/Card";
import travelImage from "../assets/travel_1.jpg";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate=useNavigate()
  return (
    <div>
      <section className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${travelImage})` }}>
        <div className="flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-5xl font-bold mb-4">TrailBliss Travels</h1>
          <p className="text-xl mb-6">The Experience starts with the journey</p>
          <button className="bg-blue-900 px-6 py-3 rounded-lg hover:bg-blue-600"
          onClick={()=>navigate("/flightsearch")}
          ><strong>Book Now</strong></button>
        </div>
      </section>
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            image={require("../assets/usa.jpg")}
            title="USA"
            description="Explore the vibrant cities and stunning landscapes of the USA."
            buttonText="Learn More"
          />
          <Card
            image={require("../assets/dubai.jpg")}
            title="Dubai"
            description="Discover the luxury and culture of Dubai."
            buttonText="Learn More"
          />
          <Card
            image={require("../assets/japan_1.jpg")}
            title="Japan"
            description="Experience the beauty and tradition of Japan."
            buttonText="Learn More"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;