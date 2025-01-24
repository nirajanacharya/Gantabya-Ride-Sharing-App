import React from "react";

const LocationSearchPanel = (props) => {
  const suggestions = props.suggestions || [];

  return (
    <div>
      {suggestions.map((element, index) => (
        <div 
          onClick={() => {
            props.handleSuggestionClick(element, props.type);
          }}
          key={index}
          className="flex items-center p-3 border-2 border-white rounded-xl active:border-black"
        >
          <h2>
            <i className="ri-map-pin-line rounded-full bg-gray-300 mr-3"></i>
          </h2>
          <h4>{element.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;