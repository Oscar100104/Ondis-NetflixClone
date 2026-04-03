export const APIKEY = "3f72d861656f121cbbcc697f48971711";

const requests = {
  fetchNetflixOriginals: `/discover/tv?api_key=${APIKEY}&with_networks=213`,
  fetchTrending: `/trending/all/week?api_key=${APIKEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${APIKEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${APIKEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${APIKEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${APIKEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${APIKEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${APIKEY}&with_genres=99`,
  fetchNowPlaying: `/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`,
};

export default requests;