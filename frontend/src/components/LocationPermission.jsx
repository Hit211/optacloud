import { toast } from "react-toastify";

const LocationPermission = ({ onEnable}) => {
  const handleEnableLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onEnable({ lat: latitude, lng: longitude });
          toast.success("Location enabled!");
        },
        () => toast.error("Location permission denied.")
      );
    } else {
      toast.error("Geolocation is not supported.");
    }
  };

  return (
    <div className="modal">
      <h2>Enable Location</h2>
      <button onClick={handleEnableLocation}>Enable Location</button>
    </div>
  );
};

export default LocationPermission;
