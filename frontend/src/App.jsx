import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import HotelList from "./pages/HotelList";
import "./App.css";
import HotelDetails from "./pages/HotelDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Mybooking from "./pages/Mybooking";
function App() {
  return (
    <>
      <div className="pt-20">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/HotelList" element={<HotelList />} />
          {/* <Route path="/HotelDetails" element={<HotelDetails />} /> */}
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/Mybooking" element={<Mybooking />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
