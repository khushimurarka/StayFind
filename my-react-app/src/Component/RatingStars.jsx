
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ rating = 0, onChange, totalStars = 5, size = 24 }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="d-flex gap-1">
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        return (
          <label key={starValue}>
            <input
              type="radio"
              name="rating"
              value={starValue}
              onClick={() => onChange(starValue)}
              style={{ display: 'none' }}
            />
            <FaStar
              size={size}
              color={starValue <= (hover || rating) ? "#FFD700" : "#ccc"}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingStars;

