import React from 'react';
import FlightSegment from './FlightSegment';

const SearchResults = ({ results }) => {
  const { flights, params, meta } = results;

  return (
    <div>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Search Results</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="text-gray-600">From:</span> {params.from}
          </div>
          <div>
            <span className="text-gray-600">To:</span> {params.to}
          </div>
          <div>
            <span className="text-gray-600">Departure:</span> {new Date(params.departureDate).toLocaleDateString()}
          </div>
          {params.returnDate && (
            <div>
              <span className="text-gray-600">Return:</span> {new Date(params.returnDate).toLocaleDateString()}
          </div>
          )}
          <div>
            <span className="text-gray-600">Passengers:</span> {params.passengers}
          </div>
          <div>
            <span className="text-gray-600">Class:</span> {params.cabinClass.replace('_', ' ').toLowerCase()}
          </div>
          {params.nonStop && (
            <div>
              <span className="text-gray-600">Non-stop:</span> Yes
            </div>
          )}
        </div>
        {meta && (
          <div className="mt-2 text-sm text-gray-600">
            {meta.count} flights found • Prices in {flights[0]?.currency || 'USD'}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {flights.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-700">No flights found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          flights.map(flight => (
            <div key={flight.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">{flight.airline}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{flight.airline} {flight.flightNumber}</h3>
                    <p className="text-sm text-gray-500 capitalize">{flight.cabinClass.replace('_', ' ').toLowerCase()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-bold">{flight.departureTime}</div>
                    <div className="text-sm text-gray-500">{flight.departureAirport}</div>
                  </div>
                  <div className="mx-4 text-center">
                    <div className="text-xs text-gray-500">{flight.duration}</div>
                    <div className="relative">
                      <div className="h-px bg-gray-300 w-16"></div>
                      <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 border border-gray-300 rounded-full bg-white"></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{flight.arrivalTime}</div>
                    <div className="text-sm text-gray-500">{flight.arrivalAirport}</div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-right mr-4">
                    <div className="font-bold text-xl">{flight.currency} {flight.price}</div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Select
                  </button>
                </div>
              </div>
              
              {/* Flight segments details */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold mb-2">Flight Details</h4>
                <div className="space-y-3">
                  {flight.segments.map((segment, index) => (
                    <FlightSegment 
                      key={index} 
                      segment={segment} 
                      isLast={index === flight.segments.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {meta && meta.links && (
        <div className="mt-8 flex justify-center">
          <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg">
            Show More Results
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;