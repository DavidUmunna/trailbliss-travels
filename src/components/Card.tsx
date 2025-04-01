import React from "react";

interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, buttonText }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;