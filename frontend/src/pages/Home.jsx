import SearchBar from "../components/SearchBar";
import beachImage from "../assets/beach.jpg";
import HotelList from "../pages/HotelList";
import { useState } from "react";

const Home = () => {
  const [searchParams, setSearchParams] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
  });

  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start pt-12"
        style={{ backgroundImage: `url(${beachImage})` }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-wide mb-6 animate-fade-in">
          ✈️ Book Your Dream Trip Now
        </h1>

        <SearchBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <HotelList filters={searchParams} />
    </div>
  );
};

export default Home;
