import React, { useState } from 'react';
import { studentAPI } from '../../services/api';

const ReviewForm = ({ tutorId, onReviewSubmitted }) => {
  const [review, setReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentAPI.createReview(tutorId, review);
      onReviewSubmitted();
    } catch (error) {
      console.error('Review error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Rating</label>
        <select 
          value={review.rating} 
          onChange={(e) => setReview({...review, rating: e.target.value})}
          className="w-full p-2 border rounded"
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Comment</label>
        <textarea
          value={review.comment}
          onChange={(e) => setReview({...review, comment: e.target.value})}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;