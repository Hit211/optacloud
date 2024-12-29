import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const AddressManagement = ({ onRefresh }) => {
  const [addresses, setAddresses] = useState([]);

  // Memoize fetchAddresses function to avoid unnecessary re-renders
  const fetchAddresses = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/addresses/all");
      setAddresses(response.data);
      if (onRefresh) {
        onRefresh();  // Call the onRefresh function after fetching addresses
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  }, [onRefresh]);  // Dependency: onRefresh function

  // Fetch addresses when the component mounts or onRefresh changes
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);  // Only run effect if fetchAddresses changes

  // Delete address by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/addresses/delete/${id}`);
      fetchAddresses(); // Refresh the list after deleting
      if (onRefresh) {
        onRefresh();  // Call the onRefresh function after deleting an address
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="address-management">
      <h2>Your Saved Addresses</h2>
      {addresses.length === 0 ? (
        <p>No addresses saved yet.</p>
      ) : (
        <ul>
          {addresses.map((address) => (
            <li key={address._id} className="address-item">
              <div>
                <strong>{address.house}</strong> - {address.area} ({address.category})
              </div>
              <div>
                Coordinates: {address.coordinates.lat}, {address.coordinates.lng}
              </div>
              <button onClick={() => handleDelete(address._id)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressManagement;
