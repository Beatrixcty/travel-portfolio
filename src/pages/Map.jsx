import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "../data/countries";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const CITY_ZOOM_THRESHOLD = 5;

function createCountryIcon(emoji, zoom) {
  if (zoom < 2) {
    return L.divIcon({
      html: `<div class="pin-marker"></div>`,
      className: "",
      iconSize: [14, 20],
      iconAnchor: [7, 20],
    });
  }
  const size = Math.min(16 + (zoom - 2) * 4, 36);
  const containerSize = size + 16;
  return L.divIcon({
    html: `<div class="emoji-marker" style="width:${containerSize}px;height:${containerSize}px;font-size:${size}px"><span>${emoji}</span></div>`,
    className: "",
    iconSize: [containerSize, containerSize],
    iconAnchor: [containerSize / 2, containerSize],
  });
}

function createCityIcon() {
  return L.divIcon({
    html: `<div class="city-marker"></div>`,
    className: "",
    iconSize: [20, 26],
    iconAnchor: [10, 26],
  });
}

function ZoomTracker({ onZoomChange }) {
  useMapEvents({
    zoomend: (e) => onZoomChange(e.target.getZoom()),
  });
  return null;
}

function Map() {
  const [zoom, setZoom] = useState(2);
  const navigate = useNavigate();
  const visitedCountries = countries.filter((c) => c.visited);
  const continentCount = new Set(visitedCountries.map((c) => c.continent)).size;

  return (
    <div className="map-page">
      <h1>Our Adventure</h1>
      <MapContainer center={[20, 0]} zoom={2} className="map-container">
        <ZoomTracker onZoomChange={setZoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Country markers — hide for countries with cities when zoomed in */}
        {visitedCountries.map((country) => {
          const hasCities = country.cities && country.cities.length > 0;
          if (hasCities && zoom >= CITY_ZOOM_THRESHOLD) return null;
          const position = country.coordinates;
          return (
            <Marker
              key={country.id}
              position={position}
              icon={createCountryIcon(country.emoji, zoom)}
              riseOnHover
              eventHandlers={{ click: () => navigate(`/countries/${country.id}`) }}
            >
              <Tooltip direction="top" offset={[0, -40]}>
                {country.name}
              </Tooltip>
            </Marker>
          );
        })}

        {/* City markers — appear when zoomed in */}
        {zoom >= CITY_ZOOM_THRESHOLD && visitedCountries
            .filter((c) => c.cities)
            .flatMap((c) =>
              c.cities.map((city) => (
                <Marker
                  key={`${c.id}-${city.name}`}
                  position={city.coordinates}
                  icon={createCityIcon()}
                  riseOnHover
                  eventHandlers={{  }}
                >
                  <Tooltip direction="top" offset={[0, -16]}>
                    {city.name}
                  </Tooltip>
                </Marker>
              )),
            )}
      </MapContainer>
      <div className="map-stats-legend">
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-pin pink"></div>
            <span>Country</span>
          </div>
          <div className="legend-item">
            <div className="legend-pin bronze"></div>
            <span>City</span>
          </div>
        </div>
        <div className="map-stats">
          <span>🌍 {visitedCountries.length} countries</span>
          <span>🗺️ {continentCount} continents</span>
        </div>
      </div>
    </div>
  );
}

export default Map;
