import React, { useEffect, useState } from 'react';
import axios from './axios';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import './Row.css';
import { APIKEY } from './requests';

const base_url = "https://image.tmdb.org/t/p/original/";
const fallback = "https://via.placeholder.com/300x169?text=No+Image";

function Row({ fetchUrl, title, isLargeRow, searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {

      let request;

      // If searching for a movie
      if (searchTerm && searchTerm.trim() !== "") {
        request = await axios.get(
          `/search/movie?api_key=${APIKEY}&query=${searchTerm}`
        );
      } 
      // Otherwise load normal category
      else {
        request = await axios.get(fetchUrl);
      }

      setMovies(request.data.results);
    }

    fetchData();
  }, [fetchUrl, searchTerm]);

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
      <h2>{searchTerm ? "Search Results" : title}</h2>

      <div className="row__posters">
        {movies.map((movie) => {

          const imagePath = isLargeRow
            ? movie.poster_path || movie.backdrop_path
            : movie.backdrop_path || movie.poster_path;

          return (
            <div key={movie.id} className="row__posterContainer">
              <img
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={imagePath ? `${base_url}${imagePath}` : fallback}
                alt={movie.name || movie.title || "Movie"}
              />
              <p className="row__posterTitle">
                {movie.name || movie.title}
              </p>
            </div>
          );
        })}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;