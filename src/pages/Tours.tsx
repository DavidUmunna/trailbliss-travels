import React from "react";
import Card from "../components/Card";

const Tours: React.FC = () => {
  const tours = [
    {
      id: 1,
      image: "/assets/tour_1.jpg",
      title: "Grand Canyon Adventure",
      description: "Experience the breathtaking views of the Grand Canyon with a guided tour.",
      buttonText: "Book Now",
    },
    {
      id: 2,
      image: "/assets/tour_2.jpg",
      title: "Dubai Desert Safari",
      description: "Enjoy an unforgettable desert safari with dune bashing and cultural experiences.",
      buttonText: "Book Now",
    },
    {
      id: 3,
      image: "/assets/tour_3.jpg",
      title: "Tokyo City Tour",
      description: "Explore the vibrant city of Tokyo with a full-day guided tour.",
      buttonText: "Book Now",
    },
    {
      id: 4,
      image: "/assets/tour_4.jpg",
      title: "Paris Romantic Getaway",
      description: "Discover the romance of Paris with a private tour of the city's iconic landmarks.",
      buttonText: "Book Now",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Tours</h1>
        <p className="text-center text-gray-600 mb-12">
          Explore our curated tours designed to give you the best travel experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Card
              key={tour.id}
              image={tour.image}
              title={tour.title}
              description={tour.description}
              buttonText={tour.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tours;