import React, { useContext,useState } from "react";
import { useQuery } from "react-query";
import { getNowPlayingMovies } from "../api/tmdb-api";  
import PageTemplate from "../components/templateMovieListPage";  
import Spinner from "../components/spinner";  
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";  
import { MoviesContext } from "../contexts/moviesContext";  

const NowPlayingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("nowPlayingMovies", getNowPlayingMovies);
  const { addToWatchlist } = useContext(MoviesContext);
  
  const [currentPage, setCurrentPage] = useState(1); 
  const moviesPerPage = 4;  
  
  if (isLoading) {
    return <Spinner />;  
  }

  if (isError) {
    return <p>Error: {error.message}</p>;  
  }

  const movies = data?.results || []; 

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <PageTemplate
      title="Now Playing Movies"
      movies={currentMovies}
      action={(movie) => (
        <PlaylistAddIcon
          onClick={() => addToWatchlist(movie)}  
          sx={{ cursor: "pointer", fontSize: 30, color: "blue" }}
        />
      )}
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

export default NowPlayingMoviesPage;


