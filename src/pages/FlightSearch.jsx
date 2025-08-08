import React, { useState, useEffect } from 'react';
import { searchFlights } from '../APIServices/flightSearchService';
import axios from "axios"
import {getAccessToken} from "../APIServices/flightSearchService"

const FlightSearchForm = ({ onSearch }) => {
  const [tripType, setTripType] = useState('round');
  const [from, setFrom] = useState('');
  const [isSearching,setIsSearching]=useState(false)
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');
  const [nonStop, setNonStop] = useState(false);
  const [airportSuggestions, setAirportSuggestions] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [FromFeild, setFromFeild]=useState(false)
  const [ToFeild, setToFeild]=useState(false)
  
 const cabinClasses = [
  { value: 'ECONOMY', label: 'Economy' },
  { value: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
  { value: 'BUSINESS', label: 'Business Class' },
  { value: 'FIRST', label: 'First Class' }
];

  useEffect(() => {
    // Set default dates
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    setDepartureDate(formatDate(today));
    setReturnDate(formatDate(tomorrow));
  }, []);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handlefromfeild=()=>{
    setFromFeild(true)
    setToFeild(false)
    setAirportSuggestions([])

  }

  const handleTofeild=()=>{
    setToFeild(true)
    setFromFeild(false)
    setAirportSuggestions([])

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true)
    const searchParams = {
      tripType,
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      departureDate,
      returnDate: tripType === 'round' ? returnDate : null,
      passengers,
      cabinClass:cabinClass.toUpperCase(),
      nonStop
    };
    
    try {
      const results = await searchFlights(searchParams);
      onSearch(results);
    } catch (error) {
      // Error handling would be implemented here
      console.error('Search error:', error);
    }finally{
        setIsSearching(false)
    }
  };
  
  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };
 
  const handleAirportSearch = async (query, type) => {
    if (query.length < 2) {
      setAirportSuggestions([]);
      return;
    }
   

    try {
      const token = await getAccessToken();
      const response = await axios.get(`${"https://test.api.amadeus.com/v1"}/reference-data/locations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          subType: 'AIRPORT',
          keyword: query,
          page: { limit: 5 }
        }
      });
      
      setAirportSuggestions(response.data.data.map(loc => ({
        code: loc.iataCode,
        name: loc.name,
        city: loc.address.cityName
      })));
      setSuggestionsVisible(true);
    } catch (error) {
      console.error('Error fetching airport suggestions:', error);
    }
  };

  const selectAirport = (airport, type) => {
    if (type === 'from') {
      setFrom(airport.code);
    } else {
      setTo(airport.code);
    }
    setSuggestionsVisible(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-full ${tripType === 'round' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTripType('round')}
          >
            Round Trip
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-full ${tripType === 'oneway' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTripType('oneway')}
          >
            One Way
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from">
            From
          </label>
          <input
            id="from"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City or Airport (e.g. JFK)"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              handleAirportSearch(e.target.value, 'from');
            }}
            onClick={handlefromfeild}
            onFocus={() => setSuggestionsVisible(true)}
            required
          />
          <div className="absolute right-3 top-9">
            <button
              type="button"
              onClick={swapLocations}
              className="text-blue-600 hover:text-blue-800"
              title="Swap locations"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>
          {(suggestionsVisible && airportSuggestions.length > 0 && FromFeild===true) && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200">
              {airportSuggestions.map((airport, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectAirport(airport, 'from')}
                >
                  <div className="font-medium">{airport.code} - {airport.name}</div>
                  <div className="text-sm text-gray-500">{airport.city}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="to">
            To
          </label>
          <input
            id="to"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City or Airport (e.g. LAX)"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              handleAirportSearch(e.target.value, 'to');
            }}
            onClick={handleTofeild}
            onFocus={() => setSuggestionsVisible(true)}
            required
          />
          {(suggestionsVisible && airportSuggestions.length > 0 && ToFeild===true )&& (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200">
              {airportSuggestions.map((airport, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectAirport(airport, 'to')}
                >
                  <div className="font-medium">{airport.code} - {airport.name}</div>
                  <div className="text-sm text-gray-500">{airport.city}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departure">
            Departure Date
          </label>
          <input
            id="departure"
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={departureDate}
            min={formatDate(new Date())}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </div>

        {tripType === 'round' && (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="return">
              Return Date
            </label>
            <input
              id="return"
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={departureDate}
              required={tripType === 'round'}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passengers">
            Passengers
          </label>
          <select
            id="passengers"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="class">
            Cabin Class
          </label>
          <select
            id="class"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
          >
            {cabinClasses.map(cls => (
              <option key={cls.value} value={cls.value}>{cls.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={nonStop}
              onChange={(e) => setNonStop(e.target.checked)}
            />
            <span className="text-gray-700">Non-stop flights only</span>
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center"
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            <>Search Flights</>
          )}
        </button>
      </div>
    </form>
  );
};

export default FlightSearchForm;