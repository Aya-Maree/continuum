import React from "react";
import "./Map.css";

const Map = () => {
  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1fa-amJ5_q8mcusehCljwbkeboLEeGnc&ehbc=2E312F"
        width="640"
        height="480"
      ></iframe>
    </div>
  );
};

export default Map;
