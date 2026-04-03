import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.error("Failed to fetch Netflix originals:", error);
      }
    }

    fetchData();
  }, []);

  const truncate = (str, n) => (str?.length > n ? str.substr(0, n - 1) + "..." : str);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  const handlePlay = () => {
    if (trailerUrl) {
      setTrailerUrl(""); // Close modal
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log("Trailer not found:", error));
    }
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button" onClick={handlePlay}>
            {trailerUrl ? "Close" : "Play"}
          </button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />

      {/* Trailer Modal */}
      {trailerUrl && (
        <div className="banner__trailerModal" onClick={() => setTrailerUrl("")}>
          <div className="banner__trailerContent" onClick={e => e.stopPropagation()}>
            <YouTube videoId={trailerUrl} opts={opts} />
            <button className="banner__closeButton" onClick={() => setTrailerUrl("")}>
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Banner;