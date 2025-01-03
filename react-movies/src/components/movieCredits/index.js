import React from "react";
import { useQuery } from "react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";

const MovieCredits = ({ movieId }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["credits", { id: movieId }],
    getMovieCredits
  );

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Cast & Crew</h3>
      <ul>
        {data.cast.map((member) => (
          <li key={member.id}>{member.name} - {member.character}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCredits;
