import React from "react";

const INTERESTS = [
  "AI", "Technology", "Health", "Finance", "Travel", "Education", "Food", "Sports", "Art", "Science"
];

const InterestSelector = ({ selectedInterests = [], onInterestChange }) => {
  const toggleInterest = (interest) => {
    onInterestChange(
      selectedInterests.includes(interest)
        ? selectedInterests.filter((i) => i !== interest)
        : [...selectedInterests, interest]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {INTERESTS.map((interest) => (
        <button
          key={interest}
          type="button"
          className={`px-3 py-1 rounded-full border ${
            selectedInterests.includes(interest)
              ? "bg-orange-700 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => toggleInterest(interest)}
        >
          {interest}
        </button>
      ))}
    </div>
  );
};

export default InterestSelector; 