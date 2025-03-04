import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = ({ activeField, locations, setPickup, setDestination }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else if (activeField === 'destination') {
      setDestination(suggestion);
    }
  };

  return (
    <div className="py-2 px-1">
      {locations.length > 0 ? (
        locations.map((location, index) => (
          <div
            key={index}
            onClick={() => handleSuggestionClick(location.description)}
            className="flex gap-4 active:border-black dark:active:border-white items-center my-2 justify-start border-2 border-gray-300 dark:border-gray-700 p-3 rounded-md transition-all"
          >
            <h2 className="bg-gray-200 dark:bg-gray-800 h-10 w-10 flex items-center justify-center rounded-full text-lg shadow-sm">
              <i className="ri-map-pin-fill dark:text-white"></i>
            </h2>
            <h4 className="font-medium text-gray-800 dark:text-white">{location.description}</h4>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-4">No locations available</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
