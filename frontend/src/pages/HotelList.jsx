import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const HotelList = ({ filters }) => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext); // ✅ استخدام الحالة من السياق

  useEffect(() => {
    axios
      .get("http://localhost:3000/hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => console.error("❌ خطأ في جلب الفنادق:", err));
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    return (
      hotel &&
      (!filters.city ||
        hotel.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.guests || hotel.stars >= parseInt(filters.guests))
    );
  });

  const handleBookingClick = (hotelId) => {
    if (isLoggedIn) {
      navigate(`/hotels/${hotelId}`);
    } else {
      toast.info("يجب تسجيل الدخول لحجز الفندق", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  return (
    <div className="bg-white py-10 px-6 w-full max-w-6xl mx-auto mt-10 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Available Hotels 🏨
      </h2>

      {filteredHotels.length === 0 ? (
        <p className="text-center text-gray-500">
          No hotels match the current search criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <img
                src={hotel.coverImage}
                alt={hotel.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {hotel.name}
              </h3>
              <p className="mb-1">
                📍 <span className="font-semibold">Location:</span> {hotel.city}
                , {hotel.country}
              </p>
              <p className="mb-1">
                🏨 <span className="font-semibold">Address:</span>{" "}
                {hotel.address}
              </p>
              <p className="mb-1">
                ⭐ <span className="font-semibold">Stars:</span> {hotel.stars}
              </p>

              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold"
                onClick={() => handleBookingClick(hotel.id)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelList;
