import React from "react";

const INTERESTS = [
  "AI", "Technology", "Health", "Finance", "Travel", "Education", "Food", "Sports", "Art", "Science"
];

const InterestSelector = ({ selected, setSelected }) => {
  const toggleInterest = (interest) => {
    setSelected(
      selected.includes(interest)
        ? selected.filter((i) => i !== interest)
        : [...selected, interest]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {INTERESTS.map((interest) => (
        <button
          key={interest}
          type="button"
          className={`px-3 py-1 rounded-full border ${
            selected.includes(interest)
              ? "bg-blue-600 text-white"
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