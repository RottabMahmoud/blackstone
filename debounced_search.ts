// Defined interface for the API response
interface Location {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string];
}

// The Debounce function
function makeDebounce(fn: (input: string) => void, delay: number) {
  let timer: number | undefined;
  return (input: string) => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => fn(input), delay);
  };
}

// Fetch locations from OpenStreetMap API
async function fetchLocations(query: string): Promise<Location[]> {
  if (!query) return [];
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // Validate the API response
    if (Array.isArray(data) && data.every(isLocation)) {
      return data;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

// Type guard for Location
function isLocation(data: any): data is Location {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.place_id === "number" &&
    typeof data.licence === "string" &&
    typeof data.osm_type === "string" &&
    typeof data.osm_id === "number" &&
    typeof data.lat === "string" &&
    typeof data.lon === "string" &&
    typeof data.class === "string" &&
    typeof data.type === "string" &&
    typeof data.place_rank === "number" &&
    typeof data.importance === "number" &&
    typeof data.addresstype === "string" &&
    typeof data.name === "string" &&
    typeof data.display_name === "string" &&
    Array.isArray(data.boundingbox) &&
    data.boundingbox.length === 4 &&
    data.boundingbox.every((box) => typeof box === "string")
  );
}

// To Render results in the DOM
function renderResults(results: Location[]) {
  const resultsContainer = document.getElementById("results");
  if (!resultsContainer) return;

  resultsContainer.innerHTML = results
    .map((result) => `<div class="result-item">${result.display_name}</div>`)
    .join("");
}

// Debounced search function
const debouncedSearch = makeDebounce(async (input: string) => {
  const results = await fetchLocations(input);
  renderResults(results);
}, 1000);

// Added event listener to input field
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    debouncedSearch(target.value);
  });
}
