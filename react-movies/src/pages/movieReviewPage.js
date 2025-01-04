import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReviews from "../components/movieReviews"; 

const MovieReviewPage = () => {
  const location = useLocation();
  const { movie } = location.state || {}; 

  if (!movie) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Error: Movie data is missing.</h2>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <PageTemplate movie={movie}>
      <h2>Reviews for {movie.title}</h2>
      
      <MovieReviews movie={movie} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
