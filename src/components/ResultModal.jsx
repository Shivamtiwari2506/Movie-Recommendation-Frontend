import React, { useEffect, useState } from "react";
import { IconX, IconLoader2 } from "@tabler/icons-react";
import MovieCard from "./MovieCard";
import loadingTexts from "../utils/loadingTexts";

const ResultModal = ({ isOpen, onClose, isLoading, movies }) => {
  if (!isOpen) return null;
  const [text, setText] = useState(loadingTexts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setText(loadingTexts[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-blue-950 to-pink-500 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white animate-fadeIn">
        <button
          disabled={isLoading}
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-300 transition"
        >
          <IconX size={26} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-blue-300">
          Recommended Movies 🎥
        </h2>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-10">
            <IconLoader2 size={40} className="animate-spin text-white" />
            <p className="text-gray-300 text-lg max-w-md">{text}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 place-items-center">
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-200">
                No movies found. Try another mood 🎭
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultModal;
