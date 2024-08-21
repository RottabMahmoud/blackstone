// Debounce function
function makeDebounce(fn: (input: string) => void, delay: number) {
    let timer: number | undefined;
    return (input: string) => {
      if (timer) clearTimeout(timer);
      timer = window.setTimeout(() => fn(input), delay);
    };
  }
  
  // Fetch locations from OpenStreetMap API
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
  
  // Render results in the DOM
  function renderResults(results: any[]) {
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
  
  // Add event listener to input field
  const searchInput = document.getElementById("searchInput") as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      debouncedSearch(target.value);
    });
  }
  