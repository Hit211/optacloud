import { useState } from "react";
import axios from "axios";
import "../AddressForm.css";  

const AddressForm = ({ coords, onAddressSaved, onLocationUpdate }) => {
  const [formData, setFormData] = useState({
    house: "",
    area: "",
    category: "Home",
    favorite: false,
    coordinates: coords,
  });

  const [loading, setLoading] = useState(false); // For handling loading state

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, favorite: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Fetch coordinates from geocoding API
    const address = `${formData.house}, ${formData.area}, India`; // Add "India" to focus on the country
    const coordinates = await getCoordinatesFromAddress(address);

    if (coordinates) {
      setFormData({
        ...formData,
        coordinates,
      });

      try {
        await axios.post("http://localhost:8000/api/addresses/add", {
          ...formData,
          coordinates,
        });
        onAddressSaved(); // Refresh the list of addresses after saving
        onLocationUpdate({ lat: coordinates.lat, lng: coordinates.lng });
      } catch (error) {
        console.error("Error saving address:", error);
      }
    }
    setLoading(false);
  };

  const getCoordinatesFromAddress = async (address) => {
    try {
      console.log("Requesting coordinates for address:", address);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}&countrycodes=IN`
      );
      console.log("Nominatim API Response:", response.data);
      const results = response.data;
      if (results.length > 0) {
        const { lat, lon } = results[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) }; // Convert lat/lon to numbers
      } else {
        console.error("No results found for the address");
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const handleSearchLocation = async () => {
    setLoading(true);
    const { house, area } = formData;
    const fullAddress = `${house}, ${area}, India`;

    console.log(`Requesting coordinates for address: ${fullAddress}`);

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json&countrycodes=IN`
      );

      if (response.data && response.data.length > 0) {
        const firstResult = response.data[0];

        if (firstResult.lat && firstResult.lon) {
          console.log(`Found coordinates: Lat: ${firstResult.lat}, Lng: ${firstResult.lon}`);

          setFormData({
            ...formData,
            coordinates: {
              lat: firstResult.lat,
              lng: firstResult.lon,
            },
          });

          onLocationUpdate({
            lat: firstResult.lat,
            lng: firstResult.lon,
          });
        } else {
          console.error("No coordinates found for the address.");
        }
      } else {
        console.error("No results found for the address.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
    setLoading(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current Location: Lat:", latitude, "Lng:", longitude);

          setFormData({
            ...formData,
            coordinates: {
              lat: latitude,
              lng: longitude,
            },
          });

          // Notify parent component to update the map with current location
          onLocationUpdate({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching current location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="address-form-container">
      <form onSubmit={handleSubmit} className="address-form">
        <div className="address-fields">
          <input
            type="text"
            name="house"
            placeholder="House/Flat/Block No"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="area"
            placeholder="Apartment/Road/Area"
            onChange={handleInputChange}
            required
          />
          <select name="category" onChange={handleInputChange} defaultValue="Home">
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Friends & Family">Friends & Family</option>
          </select>
          <label>
            <input
              type="checkbox"
              name="favorite"
              onChange={handleCheckboxChange}
            />
            Save as Favorite
          </label>
        </div>

        <div className="buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Address"}
          </button>
          <button
            type="button"
            onClick={handleSearchLocation}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Location"}
          </button>
          <button
            type="button"
            onClick={handleCurrentLocation}
            disabled={loading}
          >
            {loading ? "Getting Location..." : "Current Location"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
