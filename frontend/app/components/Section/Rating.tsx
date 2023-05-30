import React from "react";

interface Props {
  rating: number;
}

const Rating = ({ rating }: Props) => {
  return (
    <div className="rating">
      <input
        type="radio"
        className="mask mask-star-2 animate-none"
        defaultChecked={rating === 1}
      />
      <input
        type="radio"
        className="mask mask-star-2 animate-none"
        defaultChecked={rating === 2}
      />
      <input
        type="radio"
        className="mask mask-star-2 animate-none"
        defaultChecked={rating === 3}
      />
      <input
        type="radio"
        className="mask mask-star-2 animate-none"
        defaultChecked={rating === 4}
      />
      <input
        type="radio"
        className="mask mask-star-2 animate-none"
        defaultChecked={rating >= 5}
      />
    </div>
  );
};

export default Rating;
