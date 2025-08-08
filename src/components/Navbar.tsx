import {FaHome,FaMap,FaMapMarkedAlt,FaPhone,FaTimes, FaBars} from "react-icons/fa"
import { Link, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { useState } from "react";



function classNames(...classes:(string| false|null)[]) {
  return classes.filter(Boolean).join(' ');
}
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const location=useLocation()
  const isActive = (path:String) => location.pathname === path;
  type NavItem = {
  id: number;
  name: string;
  to: string;
  icon: IconType; 
};
  const Navigation_buttons:NavItem[]=[

    {id:1,name:'Home', to:'/', icon:FaHome},
    {id:2,name:'Destination', to:'/destinations', icon:FaMap},
    {id:3,name:'Tours', to:'/tours', icon:FaMapMarkedAlt},
    {id:4,name:'Contact Us', to:'/contact', icon:FaPhone}
  ]
  const Fatimes=FaTimes as React.ElementType
  const Fabars=FaBars as React.ElementType
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-900 text-white py-4 z-10 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold ml-3">
          <img src={require("../assets/travel.png")} alt="Logo" className="inline-block h-8 mr-2" />
          TrailBliss Travels
        </Link>
        <div className=" hidden md:block ml-2">

        <ul className="flex space-x-6">
          {Navigation_buttons.map(
            (item)=>{
              const Icon=item.icon as React.ElementType
            return (
              
              <li key={item.id}
              className="mx-2"
              >

              <Link
                          
                          to={item.to}
                          className={classNames(
                            isActive(item.to)
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-2 py-1 text-sm font-medium flex items-center gap-1'
                          )}
                          >
                          <Icon className="h-5 w-5" />
                          {item.name}
                        </Link>
          </li>
          )}
          
        )
      }
        </ul>
      </div>


      <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none text-white"
              aria-expanded="false"
            >
              {isMobileMenuOpen ? (
                <Fatimes className="h-6 w-9" />
              ) : (
                <Fabars className="h-6 w-9" />
              )}
            </button>
      </div>
        </div>
      {isMobileMenuOpen&&(<div className="fixed top-15 right-0 w-1/2 rounded-lg  bg-blue-900 px-4 pt-4 pb-3 space-y-2 z-50 sm:px-6">
        {Navigation_buttons.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className=" cursor-pointer block px-3 py-2 rounded-md text-base bg-gray-700 font-medium text-white items-end hover:bg-gray-400 transition-colors duration-200 focus:outline-none"
                
                
                >
                  {item.name}
                </Link>
              ))}
      </div>)}
    </nav>
  );
};

export default Navbar;