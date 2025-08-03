import React from "react";
import Card from "../components/Card";
import USA from "../assets/usa.jpg"
import dubai from "../assets/dubai.jpg"
import japan from "../assets/japan.jpeg"
const Destinations: React.FC = () => {
  const destinations = [
    {
      id: 1,
      image: USA, // New USA image
      title: "USA",
      description: "Explore the vibrant cities and stunning landscapes of the USA.",
    },
    {
      id: 2,
      image: dubai,
      title: "Dubai",
      description: "Discover the luxury and culture of Dubai.",
    },
    {
      id: 3,
      image: japan, // Traditional Japan scenery
      title: "Japan",
      description: "Experience the beauty and tradition of Japan.",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // Global travel concept
      title: "Global Adventures",
      description: "Embark on a journey to explore the world's hidden gems.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Destinations</h1>
        <p className="text-center text-gray-600 mb-12">
          Discover our top travel destinations and start planning your next adventure.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              image={destination.image}
              title={destination.title}
              description={destination.description}
              buttonText="Learn More"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;