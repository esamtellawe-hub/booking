import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Mybooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:3000/mybooking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("❌ فشل في جلب الحجوزات:", err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">📋 حجوزاتي</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">لا توجد حجوزات حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border p-4 rounded-md bg-gray-50 shadow-sm"
            >
              {booking.roomImage && (
                <img
                  src={booking.roomImage}
                  alt={`صورة الغرفة ${booking.roomName}`}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                🏨 {booking.hotelName}
              </h3>
              <p>
                <strong>الغرفة:</strong> {booking.roomName} ({booking.roomType})
              </p>
              <p>
                <strong>السعة:</strong> {booking.roomCapacity} شخص
              </p>
              <p>
                <strong>السعر:</strong> ${booking.roomPrice}
              </p>
              <p>
                <strong>الوصف:</strong> {booking.roomDescription}
              </p>
              <p>
                <strong>عدد الضيوف:</strong> {booking.guests}
              </p>
              <p>
                <strong>من:</strong> {booking.checkIn}
              </p>
              <p>
                <strong>إلى:</strong> {booking.checkOut}
              </p>
              <p>
                <strong>الحالة:</strong> {booking.status}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                📅 تم الحجز بتاريخ:{" "}
                {new Date(booking.dateCreated).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
