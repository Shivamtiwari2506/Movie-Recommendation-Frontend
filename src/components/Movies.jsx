import React, { useEffect, useState } from "react";
import { IconMoodHappy, IconSearch } from "@tabler/icons-react";
import ResultModal from "./ResultModal";
import api from "../services/axiosInstance";
import SideBar from "./SideBar";

const Movies = () => {
  const [prompt, setPrompt] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setModalOpen(true);
    localStorage.removeItem("lastMovies");
    localStorage.setItem("isModalOpen", true);
    try {
      const response = await api.post("/recommend", { prompt });
      if (response.data && response.data.success === true) {
        setMovies(response?.data?.results);
        localStorage.setItem(
          "lastMovies",
          JSON.stringify(response?.data?.results)
        );
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryClick = (item) => {
    setMovies(item);
    setModalOpen(true);
    localStorage.setItem("isModalOpen", true);
    localStorage.setItem("lastMovies", JSON.stringify(item));
  };

  const fetchHistory = async () => {
    try {
      const response = await api.get("/recommendations");
      if (response.data && response.data.success === true) {
        setSearchHistory(response.data.recommendations);
        fetchHistory();
      }
    } catch (error) {
      console.error("Error fetching search history:", error);
    }
  };

  useEffect(() => {
    const lastMovies = localStorage.getItem("lastMovies");
    if (lastMovies) {
      setMovies(JSON.parse(lastMovies));
      setModalOpen(localStorage.getItem("isModalOpen") === true.toString());
    }
    fetchHistory();
  }, []);

  return (
    <div className="flex w-screen min-h-screen font-poppins">
      <SideBar
        searchHistory={searchHistory}
        handleHistoryClick={handleHistoryClick}
      />

      <div className="flex-1 flex items-center justify-center px-4 bg-gradient-to-br from-blue-900 via-purple-700 to-pink-500">
        <div className="backdrop-blur-xl bg-white/10 border border-white/30 shadow-2xl rounded-3xl p-8 sm:p-10 md:p-12 w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center gap-8 sm:gap-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400 bg-clip-text text-transparent tracking-wide">
              MovieMood 🎬
            </h1>
            <p className="text-gray-200 mt-2 text-sm sm:text-base">
              Tell us your mood, and we’ll find the perfect movie!
            </p>
          </div>

          <div className="relative w-full">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={1}
              placeholder="Enter your mode... 😌"
              className="w-full resize-none overflow-hidden bg-white/90 text-gray-900 rounded-2xl p-4 pr-14 text-sm sm:text-base shadow-inner focus:ring-2 focus:ring-pink-400 outline-none transition-all"
              style={{ minHeight: "3rem", maxHeight: "10rem" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />

            <button
              disabled={!prompt.trim() || isLoading}
              className={`absolute bottom-2 right-2 bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full flex items-center justify-center transition cursor-pointer mb-1 ${
                !prompt && "opacity-50"
              }`}
              onClick={handleSearch}
            >
              <IconSearch stroke={2} color="white" size={20} />
            </button>
          </div>

          <div className="flex flex-col items-center text-center text-gray-100 mt-2 sm:mt-4">
            <IconMoodHappy size={36} className="text-pink-300 mb-2" />
            <p className="italic text-xs sm:text-sm md:text-base opacity-80 px-4">
              “Feeling adventurous? Maybe try Tom Cruise”
            </p>
          </div>
        </div>
      </div>

      <ResultModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setPrompt("");
          localStorage.setItem("isModalOpen", false);
        }}
        isLoading={isLoading}
        movies={movies}
      />
    </div>
  );
};

export default Movies;
