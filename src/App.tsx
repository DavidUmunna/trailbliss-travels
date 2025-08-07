import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Tours from "./pages/Tours";
import Contact from "./pages/Contact";
import FlightSearchParent from "./pages/FlightSearchParent";

const App: React.FC = () => {


  return (
  <div className="min-h-screen flex flex-col">
    <Router>
        <Navbar />
    
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/flightsearch" element={<FlightSearchParent />} />
          </Routes>
        </div>
    
        <Footer />
    </Router>
  </div>

  );
};

export default App;