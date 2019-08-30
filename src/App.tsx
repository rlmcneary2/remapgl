import React from 'react';
import Map from "./map/map";
import "./App.css";

const App: React.FC = () => {
  return (
    <Map
      accessToken="pk.eyJ1IjoicmxtY25lYXJ5MiIsImEiOiJjajgyZjJuMDAyajJrMndzNmJqZDFucTIzIn0.BYE_k7mYhhVCdLckWeTg0g"
      className="remapgl"
    />
  );
}

export default App;
