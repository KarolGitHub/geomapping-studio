# GeoMapping Studio

## Description

GeoMapping Studio is a small React application that enables interactive mapping with drawing, loading, and exploration of GeoJSON data. Built with React hooks, Material UI components, and deck.gl for advanced WebGL map rendering, the app offers rich features such as drawing polygons/lines, loading GeoJSON from URL, exporting drawn data, searching locations, and toggling between map and data table views.

---

## Live Demo

Explore the live app here: [GeoMapping Studio Demo](https://your-demo-url.com)

![GeoMapping Studio Screenshot](./docs/screenshot-map.png)
_Interactive map with drawing and GeoJSON layer loaded_

---

## Features

- **Interactive map rendering** with OpenStreetMap & Mapbox
- **Draw and edit geometries:** polygons and lines with live editing
- **Export drawn features** as GeoJSON files
- **Load GeoJSON layers** from any valid URL
- **Search places or coordinates** with map centering and markers
- **View GeoJSON properties** in Material UI DataGrid, toggle map/table views
- **Theme toggle:** Switch between light and dark modes for comfort
- **Responsive design:** Fully usable on desktop and mobile devices
- **Bonus sync:** Select features in table highlights them on map

---

## Tech Stack

- React functional components with hooks
- Material UI for UI components and theming
- deck.gl with nebula.gl for mapping and drawing
- OpenStreetMap Nominatim API for geocoding search
- Fetch API for loading GeoJSON data

---

## Architecture & Design Decisions

- **Why deck.gl and nebula.gl:** They provide performant WebGL rendering and user-friendly editing features crucial for complex GeoJSON visualization and interaction.
- **Material UI:** Ensures a consistent, accessible, and modern UI that is easily customizable for themes and responsiveness.
- **React hooks and modular design:** Promotes clean, maintainable, and reusable code with a clear separation of concerns.

## Challenges & Solutions

- Handling diverse GeoJSON inputs gracefully with robust validation and error messaging.
- Ensuring smooth editing of features without losing performance by using memoization and optimized component updates.
- Designing an intuitive UI that smoothly toggles between map and tabular data views while syncing selections.

## Project Structure

```bash
/src
├── /components # Reusable UI and map-related components
│ ├── MapView.tsx # Deck.gl map & draw layer wrapper
│ ├── DrawToolbar.tsx # Controls for drawing modes and exporting GeoJSON
│ ├── GeoJsonLoader.tsx # Input for loading GeoJSON from URL
│ ├── SearchBar.tsx # Geocoding search input and results handling
│ ├── GeoJsonDataGrid.tsx # Material UI DataGrid for GeoJSON properties
│ └── ThemeSwitcher.tsx # Dark/Light mode toggle component
├── /hooks # Custom hooks for shared logic
│ ├── useGeoJson.ts # Hook managing GeoJSON data and editing state
│ ├── useMapSearch.ts # Hook for geocoding API calls and map centering
│ └── useTheme.ts # Hook for managing theme preferences
├── /pages
│ └── App.tsx # Main application entry point composing components
├── index.tsx # React DOM rendering and theme provider setup
└── /types # TypeScript interfaces and types
    └── index.d.ts
```

---

## Getting Started

### Prerequisites

- Node.js (>=14)
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
  git clone https://github.com/KarolGitHub/geomapping-studio.git
  cd geomapping-studio
```

2. **Install dependencies**

```bash
  npm install
  # or
  yarn install
```

3. Obtain Mapbox API token if using Mapbox tiles and set it in `.env` as `REACT_APP_MAPBOX_TOKEN`.
   REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here

### Running Locally

```bash
   npm start
   # or
   yarn start
```

Open `http://localhost:3000` in your browser.

---

Use the app:

- Draw shapes using the toolbar.
- Load GeoJSON via the URL input.
- Search places from the search bar to center map.
- Export your drawing using the export button.
- Toggle to the table view to explore properties.

## Roadmap

- [ ] Add feature editing with detailed vertex controls
- [ ] Implement feature styling (color pickers, opacity sliders)
- [ ] Sync feature selection between map and data table
- [ ] Add map export (image or GL state) functionality
- [ ] Improve mobile responsiveness and layout
- [ ] Add user authentication for saving sessions (future enhancement)
- [ ] Support additional base map providers (Google Maps, custom tiles)

---

## Steps

feat: initialize React app with base setup and dependencies

- Created React app scaffold
- Installed Material UI, deck.gl, nebula.gl, react-map-gl

feat: implement DeckGL map with OpenStreetMap base layer

- Added MapView component rendering DeckGL with base map
- Configured initial view state and map controller

feat: add interactive drawing support with nebula.gl

- Integrated EditableGeoJsonLayer
- Enabled polygon and line drawing on map
- Managed drawn features state

feat: create GeoJSON export functionality

- Added export button to download drawn features as GeoJSON file

feat: implement GeoJSON URL loader with validation

- Added input component for loading GeoJSON from URL
- Fetched and displayed GeoJSON layers on the map
- Handled invalid URL and fetch errors

feat: add search bar with OpenStreetMap Nominatim integration

- Implemented geocoding API call hook
- Centered map and placed marker on search result

feat: display GeoJSON data properties in Material UI DataGrid

- Built GeoJsonDataGrid component
- Added toggle between map and data table views

chore: setup theme context with light/dark mode toggling

- Added ThemeSwitcher component
- Applied Material UI theme provider

refactor: modularize components and add custom hooks

- Improved project structure with hooks for GeoJSON and search
- Enhanced code readability and maintainability

feat: add feature editing capabilities

- Enabled vertex editing on drawn features
- Supported feature deletion and geometry modification

feat: implement feature styling options

- Added color picker and opacity controls for map features

feat: synchronize feature selection between map and table

- Highlight selected map features on DataGrid row selection

style: improve responsiveness and mobile layout

- Applied RWD principles for better mobile usability

docs: update README with detailed project overview and setup instructions
