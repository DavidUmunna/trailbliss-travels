import React,{useState} from "react";
import FlightSearchForm from "./FlightSearch";
import SearchResults from "./SearchResults";
function FlightSearchParent() {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="p-7">
      <FlightSearchForm 
        onResults={(results) => setSearchResults(results)} 
      />
      
      {searchResults && (
        <SearchResults results={searchResults} />
      )}
    </div>
  );
}


export default FlightSearchParent