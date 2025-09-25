import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookingInputs, setBookingInputs] = useState({});
  const { isLoggedIn, user } = useContext(AuthContext); // ✅ استخدام السياق فقط

  useEffect(() => {
    axios
      .get(`http://localhost:3000/hotels/${id}`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.error("❌ خطأ في جلب بيانات الفندق:", err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/hotels/${id}/rooms`)
      .then((res) => setRooms(res.data))
      .catch((err) => console.error("❌ خطأ في جلب الغرف:", err));
  }, [id]);

  const handleInputChange = (roomId, field, value) => {
    setBookingInputs((prev) => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        [field]: value,
      },
    }));
  };

  const handleAddToBooking = async (room) => {
    if (!isLoggedIn || !user?.userId) {
      toast.warn("⚠️ يجب تسجيل الدخول أولاً قبل الحجز", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const inputs = bookingInputs[room.id];
    if (!inputs?.checkIn || !inputs?.checkOut || !inputs?.guests) {
      toast.info("⚠️ يرجى تعبئة جميع بيانات الحجز قبل المتابعة", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const days =
      (new Date(inputs.checkOut) - new Date(inputs.checkIn)) /
      (1000 * 60 * 60 * 24);
    const totalPrice = days * room.price;

    try {
      await axios.post("http://localhost:3000/booking", {
        roomId: room.id,
        userId: user.userId,
        checkIn: inputs.checkIn,
        checkOut: inputs.checkOut,
        guests: inputs.guests,
        totalPrice,
      });

      toast.success("✅ تم الحجز بنجاح!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("❌ فشل في تنفيذ الحجز:", error);
      toast.error("حدث خطأ أثناء الحجز، تحقق من البيانات وحاول مرة أخرى.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  if (!hotel) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <img
        src={`/Hotels/hotel${hotel.id}.jpeg`}
        alt={hotel.name}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <h2 className="text-3xl font-bold text-blue-700 mb-4">{hotel.name}</h2>
      <p className="mb-2">
        📍 {hotel.city}, {hotel.country}
      </p>
      <p className="mb-2">🏨 Address: {hotel.address}</p>
      <p className="mb-2">⭐ Stars: {hotel.stars}</p>
      <p className="mb-2">📝 Description: {hotel.description}</p>

      <h3 className="text-xl font-bold text-blue-600 mt-8 mb-4">
        Available Rooms 🛏️
      </h3>

      {rooms.length === 0 ? (
        <p className="text-gray-500">لا توجد غرف متاحة حاليًا لهذا الفندق.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.map((room) => {
            const inputs = bookingInputs[room.id] || {};

            return (
              <div
                key={room.id}
                className="border p-4 rounded-md shadow-sm bg-gray-50"
              >
                {room.Media?.length > 0 && (
                  <img
                    src={room.Media[0].url}
                    alt={`صورة الغرفة ${room.name}`}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                )}
                <p>
                  <strong>Type:</strong> {room.type}
                </p>
                <p>
                  <strong>Capacity:</strong> {room.capacity} شخص
                </p>
                <p>
                  <strong>Price:</strong> ${room.price}
                </p>
                <p>
                  <strong>Description:</strong> {room.description}
                </p>

                <div className="mt-4 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    📅 Check-in Date
                  </label>
                  <input
                    type="date"
                    value={inputs.checkIn || ""}
                    onChange={(e) =>
                      handleInputChange(room.id, "checkIn", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    📅 Check-out Date
                  </label>
                  <input
                    type="date"
                    value={inputs.checkOut || ""}
                    onChange={(e) =>
                      handleInputChange(room.id, "checkOut", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded"
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    👥 Number of Guests
                  </label>
                  <input
                    type="number"
                    value={inputs.guests || 1}
                    onChange={(e) =>
                      handleInputChange(
                        room.id,
                        "guests",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border rounded"
                    min={1}
                  />
                </div>

                <button
                  onClick={() => handleAddToBooking(room)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Add to booking
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
