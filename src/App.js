import React, { useState } from 'react';
import './App.css';
import Row from './Row';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <Nav setSearchTerm={setSearchTerm} />

      <Banner />

      {/* Render only the search results row if searchTerm exists */}
      {searchTerm && searchTerm.trim() !== "" ? (
        <Row searchTerm={searchTerm} isLargeRow={false} />
      ) : (
        <>
          {/* Render normal rows when no searchTerm */}
          <Row
            title="NETFLIX ORIGINALS"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow={true}
          />
          <Row title="Latest Movies" fetchUrl={requests.fetchNowPlaying} />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </>
      )}
    </div>
  );
}

export default App;