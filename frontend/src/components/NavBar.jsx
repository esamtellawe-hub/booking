import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      const confirmLogout = window.confirm(
        "هل أنت متأكد أنك تريد تسجيل الخروج؟"
      );
      if (confirmLogout) {
        logout(); // حذف الـ token وتحديث الحالة
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLanguageToggle = () => {
    alert("تم تغيير اللغة (مثال)");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md text-blue-700 px-6 py-4 flex items-center justify-between">
      {/* يسار: زر تغيير اللغة */}
      <div>
        <button
          onClick={handleLanguageToggle}
          className="text-sm font-medium hover:underline"
        >
          EN
        </button>
      </div>

      {/* وسط: اسم الموقع */}
      <div
        onClick={handleLogoClick}
        className="text-xl font-bold cursor-pointer"
      >
        Innity
      </div>

      {/* يمين: أزرار My Booking و Login/Logout */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/my-booking")}
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
        >
          📋 My Booking
        </button>
        <button
          onClick={handleAuthClick}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-blue-100 transition"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}
