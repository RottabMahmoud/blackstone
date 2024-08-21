import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../useDebounce";

async function fetchLocations(query: string): Promise<any[]> {
  if (!query) return [];
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    if (debouncedQuery) {
      fetchLocations(debouncedQuery).then(setResults);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((result) => (
          <li className="result-item" key={result.place_id}>
            <Link to={`/location/${result.place_id}`}>
              {result.display_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
