import React from "react";
import { IconStarFilled, IconExternalLink } from "@tabler/icons-react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl p-5 sm:p-6 text-white hover:scale-105 transition-transform duration-300 w-full max-w-sm sm:max-w-md">

      <h2 className="text-xl sm:text-2xl font-bold text-pink-300 mb-2">
        {movie.title}
      </h2>

      <p className="text-sm sm:text-base text-gray-300 mb-2">
        🎭 {movie.genre} &nbsp; | &nbsp; 📅 {movie.release_year}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <IconStarFilled size={18} className="text-yellow-400" />
        <span className="text-sm sm:text-base font-medium">
          IMDb Rating: {movie.imdb_rating}
        </span>
      </div>

      <p className="text-gray-200 text-sm sm:text-base mb-4 leading-relaxed">
        {movie.short_description}
      </p>

      <a
        href={movie.imdb_link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-blue-600 rounded-lg hover:opacity-90 transition-all text-sm sm:text-base font-semibold"
      >
        View on IMDb
        <IconExternalLink size={18} />
      </a>
    </div>
  );
};

export default MovieCard;
