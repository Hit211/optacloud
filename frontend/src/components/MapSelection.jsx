import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../Mapselection.css"

// For custom marker icons (optional)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapSelection = ({ initialCoords, onLocationChange }) => {
  const [coords, setCoords] = useState(initialCoords);
  const [searchQuery, setSearchQuery] = useState(""); // For user input search query
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle errors during search

  useEffect(() => {
    setCoords(initialCoords); // Update map when initialCoords change
  }, [initialCoords]);

  // Function to handle search location
  const handleSearch = async () => {
    if (!searchQuery) {
      alert("Please enter a location.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Using OpenStreetMap's Nominatim API to fetch location coordinates
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: searchQuery,
            format: "json",
            limit: 1,
          },
        }
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const newCoords = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setCoords(newCoords); // Update the map's center
        onLocationChange(newCoords); // Notify parent of location change
      } else {
        setError("Location not found. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while searching for the location.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search Input and Button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {/* Map */}
      <MapContainer
        center={coords}
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coords}>
          <Popup>{searchQuery ? searchQuery : "Your location"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapSelection;
