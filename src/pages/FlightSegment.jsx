import React from 'react';

const FlightSegment = ({ segment, isLast }) => {
  return (
    <div className={`flex ${!isLast ? 'pb-3 border-b border-gray-100' : ''}`}>
      <div className="w-12 flex-shrink-0 text-center">
        <div className="text-xs text-gray-500">{segment.duration}</div>
      </div>
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <span className="font-medium">{segment.departure.time}</span>
            <span className="text-gray-500 ml-2">{segment.departure.airport}</span>
          </div>
          <div>
            <span className="font-medium">{segment.arrival.time}</span>
            <span className="text-gray-500 ml-2">{segment.arrival.airport}</span>
          </div>
        </div>
        <div className="mt-1 text-sm text-gray-500">
          {segment.airline} {segment.flightNumber} • {segment.duration}
        </div>
      </div>
    </div>
  );
};

export default FlightSegment;