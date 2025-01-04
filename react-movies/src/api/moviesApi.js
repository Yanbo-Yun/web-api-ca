import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; 


export const fetchReviews = async (movieId) => {
  const response = await axios.get(`${API_BASE_URL}/reviews/${movieId}`);
  return response.data;
};

export const addReview = async (reviewData) => {
  const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  await axios.delete(`${API_BASE_URL}/reviews/${reviewId}`);
};


export const fetchCollections = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/collections/${userId}`);
  return response.data;
};

export const addToCollection = async (collectionData) => {
  const response = await axios.post(`${API_BASE_URL}/collections`, collectionData);
  return response.data;
};

export const removeFromCollection = async (collectionId) => {
  await axios.delete(`${API_BASE_URL}/collections/${collectionId}`);
};

