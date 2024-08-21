## Overview

This assessment consists of three interconnected tasks designed to evaluate your skills in TypeScript.

## Task 1: TypeScript

### Objective

Create a TypeScript-based web component that allows users to search for locations using the OpenStreetMap API.

### Requirements

1. **Search Input**: Implement an HTML input element to capture user input for location searches.
2. **Debounce Function**:
   - Implement a debounce function to limit API calls as the user types.
   - Ensure that the debounce function can abort previous debounce calls and fetch operations to avoid race conditions.
   - Example debounce function signature:
     ```typescript
     const debounce = makeDebounce((input: string) => /* API logic here */, 1000);
     // Usage
     debounce(input);
     ```
   - The debounce duration is up to you, with a suggested duration of 1000ms.
3. **Display Results**: Show search results in a list below the input field. The list should display the `"display_name"` values from the API response.
4. **Error Handling**: Implement error handling for the API calls.
5. **Type Checking**: Use TypeScript’s static type checking.

### Bonus
- Added runtime type checking for the API response.

### Example API Request

```bash
curl --location 'https://nominatim.openstreetmap.org/search?format=json&q=cairo'

[
  {
    "place_id": 294306591,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    "osm_type": "relation",
    "osm_id": 126071,
    "lat": "37.0057958",
    "lon": "-89.1772449",
    "class": "boundary",
    "type": "administrative",
    "place_rank": 16,
    "importance": 0.4564184662655103,
    "addresstype": "city",
    "name": "Cairo",
    "display_name": "Cairo, Alexander County, Illinois, 62914, United States",
    "boundingbox": [
      "36.9702980",
      "37.0888680",
      "-89.2314580",
      "-89.1329150"
    ]
  }
]
```

## Project Hierarchy
```bash
  blackstone                     
├─ node_modules 
├─ debounced_search_html
├─ debounced_search.js
├─ debounced_search.ts
├─ README.md
├─ package-lock.json
├─ package.json
└─ tsconfig.json
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Badge

<a href="https://rottab.vercel.app"> <img src="https://img.shields.io/badge/Mahmoud%20Rottab-Porfolio" alt="Mahmoud Rottab" /> </a>