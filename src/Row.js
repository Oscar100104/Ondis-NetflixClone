import React, { useEffect, useState } from 'react';
import axios from './axios';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";
const fallback = "https://via.placeholder.com/300x169?text=No+Image";

function Row({ fetchUrl, title, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => {
          const imagePath = isLargeRow
            ? movie.poster_path || movie.backdrop_path
            : movie.backdrop_path || movie.poster_path;

          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={imagePath ? `${base_url}${imagePath}` : fallback}
              alt={movie.name || movie.title || "Movie"}
            />
          );
        })}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;