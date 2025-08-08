import axios from "axios";




let accessToken = null;
let tokenExpiration = null;

export async function getAccessToken() {
  if (accessToken && tokenExpiration && new Date() < tokenExpiration) {
    return accessToken;
  }
  const AMADEUS_API_KEY = process.env.REACT_APP_AMADEUS_API_KEY;
  const AMADEUS_API_SECRET = process.env.REACT_APP_AMADEUS_API_SECRET;
  try {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
      `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    accessToken = response.data.access_token;
    tokenExpiration = new Date();
    tokenExpiration.setSeconds(tokenExpiration.getSeconds() + response.data.expires_in);
    
    return accessToken;
  } catch (error) {
    console.error('Error getting Amadeus access token:', error);
    throw error;
  }
}

export async function searchFlights(params) {
  try {
    const token = await getAccessToken();
    
    // Format request body according to Amadeus API specs
    const requestBody = {
      currencyCode: "USD",
      originDestinations: [
        {
          id: "1",
          originLocationCode: params.from,
          destinationLocationCode: params.to,
          departureDateTimeRange: {
            date: params.departureDate,
            time: "10:00:00" // Default time
          }
        }
      ],
      travelers: Array(params.passengers).fill().map((_, i) => ({
        id: (i + 1).toString(),
        travelerType: "ADULT"
      })),
      sources: ["GDS"],
      searchCriteria: {
        maxFlightOffers: 10,
        flightFilters: {
          cabinRestrictions: [
            {
              cabin: params.cabinClass,
              coverage: "MOST_SEGMENTS",
              originDestinationIds: ["1"]
            }
          ],
          carrierRestrictions: {

          }
        }
      }
    };

    // Add return flight if round trip
    if (params.tripType === 'round' && params.returnDate) {
      requestBody.originDestinations.push({
        id: "2",
        originLocationCode: params.to,
        destinationLocationCode: params.from,
        departureDateTimeRange: {
          date: params.returnDate,
          time: "10:00:00" // Default time
        }
      });
      
      // Add the originDestinationId to cabin restrictions for return flight
      requestBody.searchCriteria.flightFilters.cabinRestrictions[0].originDestinationIds.push("2");
    }

    // Add non-stop filter if requested
    if (params.nonStop) {
      requestBody.searchCriteria.flightFilters.connectionRestriction = {
        maxNumberOfConnections: 0
      };
    }

    const response = await axios.post(`${'https://test.api.amadeus.com/v2'}/shopping/flight-offers`, requestBody, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return formatAmadeusResponse(response.data, params);
  } catch (error) {
    console.error('Error searching flights:', error.response?.data || error.message);
    throw new Error(error.response?.data?.errors?.[0]?.detail || 'Failed to search flights');
  }
}

function formatAmadeusResponse(data, searchParams) {
  if (!data.data) return { flights: [], params: searchParams };

  return {
    flights: data.data.map(offer => {
      const segments = offer.itineraries[0].segments;
      const firstSegment = segments[0];
      const lastSegment = segments[segments.length - 1];
      
      return {
        id: offer.id,
        airline: firstSegment.carrierCode,
        departureTime: formatTime(firstSegment.departure.at),
        arrivalTime: formatTime(lastSegment.arrival.at),
        duration: formatDuration(offer.itineraries[0].duration),
        price: offer.price.total,
        currency: offer.price.currency,
        stops: segments.length - 1,
        flightNumber: `${firstSegment.carrierCode} ${firstSegment.number}`,
        departureAirport: firstSegment.departure.iataCode,
        arrivalAirport: lastSegment.arrival.iataCode,
        segments: segments.map(segment => ({
          departure: {
            airport: segment.departure.iataCode,
            time: formatTime(segment.departure.at)
          },
          arrival: {
            airport: segment.arrival.iataCode,
            time: formatTime(segment.arrival.at)
          },
          airline: segment.carrierCode,
          flightNumber: segment.number,
          duration: segment.duration,
          aircraft: segment.aircraft?.code
        })),
        cabinClass: searchParams.cabinClass
      };
    }),
    params: searchParams,
    meta: {
      count: data.meta?.count || 0,
      links: data.meta?.links
    }
  };
}

function formatTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(durationStr) {
  return durationStr.replace('PT', '').replace('H', 'h ').replace('M', 'm').trim();
}