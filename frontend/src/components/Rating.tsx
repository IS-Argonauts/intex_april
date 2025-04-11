import React, { useEffect, useState } from 'react';

interface RatingProps {
  movieId: string;
  userId?: number;
  editable?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  movieId,
  userId,
  editable = false,
}) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const API_URL = 'https://localhost:44307';

  useEffect(() => {
    // Fetch average rating
    fetch(`${API_URL}/Movie/AverageRating/${movieId}`)
      .then((res) => res.json())
      .then(setAverageRating)
      .catch((err) => console.error('Error fetching average rating:', err));

    // Fetch user's rating if userId provided
    if (userId) {
      fetch(`${API_URL}/Movie/Rating/${userId}/${movieId}`)
        .then((res) => res.json())
        .then(setUserRating)
        .catch((err) => console.error('Error fetching user rating:', err));
    }
  }, [movieId, userId]);

  const handleRate = (rating: number) => {
    if (!editable || !userId) return;

    setUserRating(rating);

    fetch(`${API_URL}/Movie/RateMovie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, showId: movieId, rating }),
    }).catch((err) => console.error('Error submitting rating:', err));
  };

  const stars = [...Array(5)].map((_, index) => {
    const ratingValue = index + 1;
    const filled = editable
      ? (hover || userRating) >= ratingValue
      : averageRating >= ratingValue;

    return (
      <span
        key={ratingValue}
        onClick={() => handleRate(ratingValue)}
        onMouseEnter={() => editable && setHover(ratingValue)}
        onMouseLeave={() => editable && setHover(0)}
        style={{
          cursor: editable ? 'pointer' : 'default',
          color: filled ? '#FCD076' : '#aaa',
          fontSize: '1.75rem',
        }}
      >
        ★
      </span>
    );
  });

  return (
    <div style={{ marginTop: 8 }}>
      {stars}
      {!editable && (
        <span style={{ marginLeft: 8, fontSize: '0.9rem', color: '#ccc' }}>
          ({averageRating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default Rating;
