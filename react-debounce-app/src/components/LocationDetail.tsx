import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const LocationDetail: React.FC = () => {
  const { place_id } = useParams<{ place_id: string }>();
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    const fetchLocationDetail = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/details.php?place_id=${place_id}&format=json`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchLocationDetail();
  }, [place_id]);

  if (!location) return <p>Loading...</p>;

  return (
    <div className="location-detail">
      {/* Back Link */}
      <Link to="/" className="back-link">
        ◄ Back
      </Link>

      {/* Location Details */}
      <div className="location-header">
        <h2>{location.localname}</h2>
        <img src={location.icon} alt={`${location.localname} icon`} />
      </div>
      <p>
        <strong>Country Code:</strong> {location.country_code}
      </p>
      <p>
        <strong>Population:</strong> {location.population}
      </p>
      <p>
        <strong>Capital:</strong> {location.extratags?.capital}
      </p>
      <p>
        <strong>Is Capital:</strong> {location.extratags?.is_capital}
      </p>
      <p>
        <strong>Category:</strong> {location.category}
      </p>
      <p>
        <strong>Type:</strong> {location.type}
      </p>
      <p>
        <strong>Importance:</strong> {location.importance}
      </p>
      <p className="coordinates">
        <strong>Latitude:</strong> {location.centroid?.coordinates[1]}
      </p>
      <p className="coordinates">
        <strong>Longitude:</strong> {location.centroid?.coordinates[0]}
      </p>
    </div>
  );
};

export default LocationDetail;
