//import React, { useEffect, useState }  from "react";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { fetchReviews, addReview, deleteReview } from "../../api/moviesApi";

export default function MovieReviews({ movie }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchReviews(movie.id);
        setReviews(data); 
      } catch (error) {
        console.error("Failed to fetch reviews:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [movie.id]);

  
  const handleAddReview = async () => {
    if (!newReview.trim()) {
      alert("Review content cannot be empty!");
      return;
    }
    try {
      setLoading(true);
      const reviewData = {
        movieId: movie.id,
        content: newReview,
        author: "currentUser", 
        rating,
      };
      const addedReview = await addReview(reviewData);
      setReviews([...reviews, addedReview]); 
      setNewReview(""); 
      setRating(5); 
    } catch (error) {
      console.error("Failed to add review:", error.message);
    } finally {
      setLoading(false);
    }
  };

  
  const handleDeleteReview = async (reviewId) => {
    try {
      setLoading(true);
      await deleteReview(reviewId);
      setReviews(reviews.filter((review) => review._id !== reviewId)); 
    } catch (error) {
      console.error("Failed to delete review:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Movie Reviews</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="reviews table">
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell align="center">Content</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((r) => (
              <TableRow key={r._id}>
                <TableCell>{r.author}</TableCell>
                <TableCell>{r.content}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteReview(r._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "20px" }}>
        <h4>Add a Review</h4>
        <TextField
          label="Your Review"
          fullWidth
          multiline
          rows={4}
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          variant="outlined"
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Rating (1-5)"
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          InputProps={{ inputProps: { min: 1, max: 5 } }}
          variant="outlined"
          style={{ marginBottom: "10px", marginRight: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddReview}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
