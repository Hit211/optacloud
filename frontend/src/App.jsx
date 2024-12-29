import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar'; // Navbar Component
import LocationPermission from './components/LocationPermission';
import MapSelection from './components/MapSelection';
import AddressForm from './components/AddressForm';
import AddressManagement from './components/AddressManagement';

const App = () => {
  const [addresses, setAddresses] = useState([]);
  
  // Set default coordinates to New Delhi, India
  const [selectedCoords, setSelectedCoords] = useState({ lat: 28.6139, lng: 77.2090 });

  // Fetch addresses on initial load
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/addresses/all');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  // Update map with address coordinates
  const updateMapWithAddress = (address) => {
    if (address && address.coordinates) {
      setSelectedCoords({
        lat: address.coordinates.lat,
        lng: address.coordinates.lng,
      });
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <h1>OptaCloud Project</h1>

                {/* Location Permission */}
                <LocationPermission
                  onEnable={(coords) => setSelectedCoords(coords)} // Update coords on permission
                />

                {/* Map Selection */}
                <MapSelection
                  initialCoords={selectedCoords}
                  onLocationChange={(coords) => setSelectedCoords(coords)} // Handle map location change
                />

                {/* Address Form */}
                <AddressForm
                  coords={selectedCoords}
                  onAddressSaved={fetchAddresses}
                  onLocationUpdate={updateMapWithAddress}
                />
              </>
            }
          />

          {/* Saved Addresses Page */}
          <Route
            path="/saved-addresses"
            element={
              <AddressManagement
                addresses={addresses}
                onRefresh={fetchAddresses}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
