## Overview

This assessment consists of three interconnected tasks designed to evaluate your skills in React.

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
├─ tsconfig.aspp.json
├─ tsconfig.node.json
├─ eslint.config.js
└─ README.md

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Badge

<a href="https://rottab.vercel.app"> <img src="https://img.shields.io/badge/Mahmoud%20Rottab-Porfolio" alt="Mahmoud Rottab" /> </a>
```
