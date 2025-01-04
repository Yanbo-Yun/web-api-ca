import React, { useState, useEffect } from 'react';
import { addToCollection, removeFromCollection, fetchCollections } from '../../api/moviesApi';

const CollectionButton = ({ userId, movieId }) => {
  const [isInCollection, setIsInCollection] = useState(false);

  useEffect(() => {
    const checkCollection = async () => {
      const collections = await fetchCollections(userId);
      const exists = collections.some((item) => item.movieId === movieId);
      setIsInCollection(exists);
    };
    checkCollection();
  }, [userId, movieId]);

  const handleToggleCollection = async () => {
    try {
      if (isInCollection) {
        const collections = await fetchCollections(userId);
        const collectionItem = collections.find((item) => item.movieId === movieId);
        if (collectionItem) {
          await removeFromCollection(collectionItem._id);
        }
      } else {
        await addToCollection({
          userId,
          movieId,
          movieTitle: movie.title, 
        });
      }
      setIsInCollection(!isInCollection);
    } catch (error) {
      console.error("Error toggling collection:", error);
    }
  };
  

  return (
    <button onClick={handleToggleCollection}>
      {isInCollection ? 'Remove from Collection' : 'Add to Collection'}
    </button>
  );
};

export default CollectionButton;
