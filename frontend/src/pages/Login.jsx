import lobby from "../assets/lobby.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      login(res.data.token); // تحديث الحالة
      alert("✅ تم تسجيل الدخول!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ أثناء الاتصال بالخادم");
    }
  };

  return (
    <div
      className="min-h-screen bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${lobby})` }}
    >
      <div className="bg-white/30 backdrop-blur-md bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
