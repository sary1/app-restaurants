import Image from "next/image";
import WebsiteLogo from "../images/website-logo.png";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Geocode from "react-geocode";

const APIKEY = process.env.REACT_APP_GOOGLE_API_KEY;
Geocode.setApiKey(APIKEY);

const Navbar = ({ setCity, setLocation, setSearch }) => {
  const [address, setAddress] = useState("Berlin");

  const profilepic = "https://randomuser.me/api/portraits/men/43.jpg";

  const submitSearch = () => {
    setSearch(true);
    setCity(address);

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLocation({ lat, lng });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div className="flex w-full h-16 bg-white justify-between items-center py-4 px-1 lg:px-10 font-poppins shadow-lg sticky">
      {/* Website logo on the left side */}
      <div
        className="relative w-24 h-24 min-w-24"
        onClick={() => location.reload()}
      >
        <Image
          src={WebsiteLogo}
          className=" w-full cursor-pointer"
          layout="fill"
          alt="me"
        />
      </div>

      {/* Search area in the middle */}
      <div className="flex items-center bg-gray-50 px-4 w-40 sm:flex-1 rounded-xl max-w-lg">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              submitSearch();
            }
          }}
          type="text"
          placeholder="Enter location ..."
          className="w-full text-sm p-2 pl-4 bg-transparent outline-none text-purple-500 flex-1"
        />
        <span className="hidden sm:inline-flex text-gray-300">|</span>
        <SearchIcon
          className="flex text-purple-500 h-5 ml-4 cursor-pointer"
          onClick={submitSearch}
        />
      </div>

      {/* User area on the right side */}
      <div className="flex w-24 items-center">
        <BellIcon className="hidden md:inline-flex h-11 rounded-full p-3 text-purple-500 bg-gray-100 cursor-pointer" />
        <div className="relative h-9 w-9 ml-4 cursor-pointer flex items-center justify-center">
          <Image
            loader={() => profilepic}
            unoptimized
            src={profilepic}
            layout="fill"
            className="rounded-full z-10"
          />
          <div className="absolute bg-gray-200 h-11 w-11 rounded-full">
            <div className="absolute bg-purple-400 h-3 w-3 rounded-full top-7 left-8 z-20 border-gray-100 border-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
