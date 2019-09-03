import React from 'react';
import Map from "./map/map";
import Marker from "./marker/marker";
import "./App.css";

const App: React.FC = () => {
  return (
    <Map
      accessToken="pk.eyJ1IjoicmxtY25lYXJ5MiIsImEiOiJjajgyZjJuMDAyajJrMndzNmJqZDFucTIzIn0.BYE_k7mYhhVCdLckWeTg0g"
      className="remapgl"
    >
      <Marker location={[-68.2954881, 44.3420759]}>I'm a marker</Marker>
    </Map>
  );
}

export default App;
