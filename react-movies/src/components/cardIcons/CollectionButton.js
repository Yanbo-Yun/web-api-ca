import React, { useState, useEffect } from 'react';
import { addToCollection, removeFromCollection, fetchCollections } from '../../api/moviesApi';

const CollectionButton = ({ userId, movie = { id: '', title: '' } }) => { // 默认值
  const [isInCollection, setIsInCollection] = useState(false);

  useEffect(() => {
    const checkCollection = async () => {
      if (!movie || !movie.id) {
        console.error("Movie object or id is undefined");
        return;
      }
      const collections = await fetchCollections(userId);
      const exists = collections.some((item) => item.movieId === movie.id);
      setIsInCollection(exists);
    };
    checkCollection();
  }, [userId, movie?.id]);

  const handleToggleCollection = async () => {
    try {
      if (!movie || !movie.id) {
        console.error("Movie object or id is undefined");
        return;
      }

      if (isInCollection) {
        const collections = await fetchCollections(userId);
        const collectionItem = collections.find((item) => item.movieId === movie.id);
        if (collectionItem) {
          await removeFromCollection(collectionItem._id);
        }
      } else {
        await addToCollection({
          userId,
          movieId: movie.id,
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

