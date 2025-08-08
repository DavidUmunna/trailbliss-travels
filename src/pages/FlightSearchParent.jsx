import React,{useState} from "react";
import FlightSearchForm from "./FlightSearch";
import SearchResults from "./SearchResults";
function FlightSearchParent() {
  const [searchResults, setSearchResults] = useState(null);
  console.log("search results",searchResults)
  return (
    <div className="p-10 mt-10">
      <div className="mb-5">

      <FlightSearchForm 
        onSearch={(results) => setSearchResults(results)} 
        
        />
      </div>
      
      {searchResults && (
        <SearchResults results={searchResults} />
      )}
    </div>
  );
}


export default FlightSearchParent