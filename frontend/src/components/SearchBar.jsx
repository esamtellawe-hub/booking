const SearchBar = ({ searchParams, setSearchParams }) => {
  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl px-6 py-4 w-full max-w-4xl mx-auto text-blue-900">
      <div className="flex flex-wrap gap-4 items-end justify-between">
        {/* الوجهة */}
        <div className="flex flex-col w-full sm:w-[180px]">
          <label className="text-white-700 font-semibold mb-2 text-center">
            Destination 🚌
          </label>
          <input
            type="text"
            name="city"
            placeholder="Where are you going?"
            value={searchParams.city}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* تاريخ الدخول */}
        <div className="flex flex-col w-full sm:w-[150px]">
          <label className="text-white-700 font-semibold mb-2 text-center">
            Arrival date 📅
          </label>
          <input
            type="date"
            name="checkIn"
            value={searchParams.checkIn}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* تاريخ المغادرة */}
        <div className="flex flex-col w-full sm:w-[150px]">
          <label className="text-white-700 font-semibold mb-2 text-center">
            Departure date 📅
          </label>
          <input
            type="date"
            name="checkOut"
            value={searchParams.checkOut}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* الضيوف */}
        <div className="flex flex-col w-full sm:w-[100px]">
          <label className="text-white-700 font-semibold mb-2 text-center text-center  ">
            stars ⭐
          </label>
          <input
            type="number"
            name="stars"
            min="1"
            value={searchParams.guests}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* الغرف */}
        <div className="flex flex-col w-full sm:w-[100px]">
          <label className="text-white-700 font-semibold mb-2 text-center">
            Rooms 🛏️
          </label>
          <input
            type="number"
            name="rooms"
            min="1"
            value={searchParams.rooms}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* زر البحث */}
        <div className="w-full flex justify-center mt-6">
          <div className="w-fit">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md">
              Search 🔍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
