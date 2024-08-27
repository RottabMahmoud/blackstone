// Location Interface: The Location interface defines the structure of the data expected from the API response, 
// including properties like place_id, lat, lon, and display_name.
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

// Debounce Function: The makeDebounce function creates a debounced version of a function, delaying its execution until after a specified time 
// (delay). If the function is called again before the delay is over, the previous call is canceled.
// The Debounce function
function makeDebounce(fn: (input: string) => void, delay: number) {
  let timer: number | undefined;
  return (input: string) => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => fn(input), delay);
  };
}

// Fetch Locations: The fetchLocations function takes a search query as input and fetches matching locations from the OpenStreetMap API. 
// It returns an array of Location objects after validating the response with a type guard (isLocation).
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

// Type Guard: The isLocation function is a type guard that checks whether the fetched data conforms to the Location interface.
// It ensures the data is correctly structured before it is used.
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

// Render Results: The renderResults function updates the DOM by displaying the fetched location results. 
// It maps over the results and creates HTML elements for each location, which are then inserted into the webpage.
// To Render results in the DOM
function renderResults(results: Location[]) {
  const resultsContainer = document.getElementById("results");
  if (!resultsContainer) return;

  resultsContainer.innerHTML = results
    .map((result) => `<div class="result-item">${result.display_name}</div>`)
    .join("");
}


// Debounced Search: The debouncedSearch function is created using makeDebounce, which wraps around the logic to fetch and display results. 
// It delays the API call until the user has stopped typing for 1 second.
// Debounced search function
const debouncedSearch = makeDebounce(async (input: string) => {
  const results = await fetchLocations(input);
  renderResults(results);
}, 1000);


// Event Listener: Finally, an event listener is added to an input field with the ID searchInput. When the user types into the input, 
// the debouncedSearch function is triggered, fetching and displaying location results as the user types.
// Added event listener to input field
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    debouncedSearch(target.value);
  });
}