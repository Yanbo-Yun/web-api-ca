import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../contexts/moviesContext";

const PopularMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("popularMovies", getPopularMovies);
  const { addToWatchlist } = useContext(MoviesContext);

  const [currentPage, setCurrentPage] = useState(1); 
  const moviesPerPage = 4; 

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const movies = data.results;

  
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <PageTemplate
        title="Popular Movies"
        movies={currentMovies} 
        action={(movie) => (
          <PlaylistAddIcon
            onClick={() => addToWatchlist(movie)}
            sx={{ cursor: "pointer", fontSize: 30, color: "blue" }}
          />
        )}
      />
      
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === index + 1 ? "blue" : "gray",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularMoviesPage;


