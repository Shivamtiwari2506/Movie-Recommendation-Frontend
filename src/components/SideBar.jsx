import React, { useState } from "react";
import {
  IconMovie,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

const SideBar = ({ searchHistory, handleHistoryClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-900 via-purple-700 to-pink-500 flex flex-col p-6 gap-6 text-white font-poppins shadow-2xl backdrop-blur-xl border border-white/30 transition-all duration-300 ${
        isOpen
          ? "w-72 sm:w-80 md:w-96 bg-white/10 backdrop-blur-xl border border-white/30 absolute z-20"
          : "w-2"
      }`}
    >
      <button
        className="absolute top-4 right-2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <IconChevronLeft size={20} />
        ) : (
          <IconChevronRight size={20} />
        )}
      </button>

      {isOpen && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400">
          History
        </h2>
      )}

      <div
        className={`flex flex-col gap-4 overflow-y-auto max-h-[80vh] pr-2 ${
          !isOpen && "hidden"
        }`}
      >
        {searchHistory.length === 0 ? (
          <p className="italic text-gray-300">No history yet...</p>
        ) : (
          searchHistory.map((item) => (
            <div
              key={item?._id}
              className="group relative flex items-center gap-2 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
              onClick={() => handleHistoryClick(item?.recommended_movies)}
            >
              <IconMovie
                size={24}
                className="w-6 h-6 text-pink-300 flex-shrink-0"
              />
              <span className="text-sm sm:text-base md:text-lg text-ellipsis truncate hover:overflow-visible hover:text-wrap">
                {item?.user_input}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SideBar;
