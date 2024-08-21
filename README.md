## Overview

This assessment consists of three interconnected tasks designed to evaluate your skills in TypeScript, React, & Git.

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

## Task 2: React

### Objective

Refactor the TypeScript function from Task 1 into a React application with route-based navigation.

### Requirements

1. **React Setup**:

   - Created a React application using Vite.
   - Structured the project to include TypeScript, React, and CSS files.

2. **Debounce Hook**:

   - Implemented a custom React hook, `useDebounce`, for debounce functionality.
   - Used this hook in the `SearchComponent` to handle input debounce.

3. **Search Component**:

   - Refactored the search functionality into a React component.
   - Displayed search results in a list below the input field.
   - Integrated error handling for API requests.

4. **Location Details Component**:

   - Created a `LocationDetail` component to show detailed information about a selected location.
   - Implemented route-based navigation using React Router to display location details.
   - Added a "Back" link to navigate to the main search page.

5. **Styling**:
   - Styled the React components using pure CSS to enhance UI:
     - `index.css` for general styling.
     - Styled components including the search input, results list, and location detail page.

### Bonus

- Added runtime type checking for the API response.

## Project Installation

```bash
git clone https://github.com/RottabMahmoud/blackstone.git
cd blackstone
git checkout feature/react-debounce
cd react-debounce-app
npm install
```

## To Start the App

```bash
npm run dev
```

## For Building

```bash
npm build
```

### File Structure

```bash
  react-debounce-app
├─ node_modules
├─ public
│  └─ index.html
├─ src
│  ├─ components
│  │  ├─ LocationDetail.tsx
│  │  └─ SearchComponent.tsx
│  ├─ hooks
│  │  └─ useDebounce.ts
│  ├─ index.tsx
│  ├─ index.css
│  └─ App.tsx
├─ package-lock.json
├─ package.json
├─ tsconfig.json
└─ README.md

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Badge

<a href="https://rottab.vercel.app"> <img src="https://img.shields.io/badge/Mahmoud%20Rottab-Porfolio" alt="Mahmoud Rottab" /> </a>
```
