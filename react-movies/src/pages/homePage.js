import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const HomePage = (props) => {
  const { data, error, isLoading, isError } = useQuery('discover', getMovies);
  const [currentPage, setCurrentPage] = useState(1); 
  const moviesPerPage = 4; 

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addToFavorites = (movieId) => true;

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={currentMovies} 
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: currentPage === index + 1 ? "#007BFF" : "#FFF",
              color: currentPage === index + 1 ? "#FFF" : "#000",
              border: "1px solid #007BFF",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default HomePage;
