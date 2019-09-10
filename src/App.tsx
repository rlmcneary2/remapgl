import React from "react";
import "./App.css";
import Map from "./map/map";
import Marker from "./marker/marker";
import Popup from "./marker/marker-popup";
import Attribution from "./user-interface/attribution";
import Navigation from "./user-interface/navigation";

const App: React.FC = (): React.ReactElement => {
  return (
    <Map
      accessToken="pk.eyJ1IjoicmxtY25lYXJ5MiIsImEiOiJjajgyZjJuMDAyajJrMndzNmJqZDFucTIzIn0.BYE_k7mYhhVCdLckWeTg0g"
      className="remapgl"
    >
      <Attribution customAttribution={["Panopticon!"]} />
      <Navigation />
      <Marker
        location={[-68.2954881, 44.3420759]}
        popup={(
          <Popup
            closeButton={false}
            offset={10}
          >
            <div style={{ background: "yellow" }}>I'm a popup</div>
          </Popup>
        )}
        showPopup="hover"
      >
        I'm a marker
      </Marker>
    </Map>
  );
};

export default App;
