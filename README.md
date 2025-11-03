# GeoMapping Studio

GeoMapping Studio is a modern web application for interactive mapping, drawing, and analyzing geospatial data. Built with React, deck.gl, nebula.gl, and Material UI, it provides a user-friendly interface for creating, editing, and visualizing GeoJSON features on top of OpenStreetMap and Mapbox base layers.

## Features

- **DeckGL Map**: High-performance map rendering with OpenStreetMap and Mapbox styles.
- **Drawing & Editing**: Draw polygons and lines, edit features, and manage GeoJSON data interactively.
- **Color Picker & Opacity Controls**: Customize feature appearance with color and opacity settings.
- **GeoJSON Import/Export**: Load GeoJSON from a URL and export your work.
- **Data Table**: View and analyze feature properties in a tabular format.
- **Search**: Find locations by coordinates or place names.
- **Responsive UI**: Optimized for desktop and mobile devices.
- **Dark/Light Theme**: Toggle between dark and light modes, including map styling.

## Setup Instructions

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KarolGitHub/geomapping-studio.git
   cd geomapping-studio
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Set your Mapbox access token in a `.env` file:
   ```env
   REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
   ```

### Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

Output will be in the `build/` directory.

## Architecture Decisions

- **Component modularity**: The app is split into focused, reusable components (MapView, DrawToolbar, Sidebar, DataGrid, etc.) to keep logic isolated and maintainable.
- **Custom hooks for business logic**: Features like map search, GeoJSON loading, and theme management are implemented as custom hooks, separating side effects and state from UI code.
- **Performance optimization**: Memoization (React.memo, useCallback) is used for key components to avoid unnecessary re-renders and keep the app snappy, especially with large GeoJSON datasets.

## Project Structure

- `src/components/` — UI components:
  - **MapView**: Renders the interactive map, handles drawing/editing, displays GeoJSON features, and manages map state.
  - **DrawToolbar**: Provides controls for drawing mode, feature type selection, color picker, opacity slider, and drawing actions.
  - **Sidebar**: Main navigation drawer for switching modes, searching, loading/exporting GeoJSON, and opening the data table.
  - **GeoJsonDataGrid**: Displays GeoJSON feature properties in a paginated, selectable table view.
  - **GeoJsonUrlLoader**: Modal dialog for loading GeoJSON data from a URL, with error handling and feedback.
  - **SearchBar**: Input for searching locations by name or coordinates, triggers map centering and marker placement.
  - **Navbar**: Top app bar with menu and theme toggle controls.
    +- `src/contexts/` — Theme context and providers for dark/light mode.
    +- `src/hooks/` — Custom hooks:
  - **useMapSearchState**: Manages map search state, centers map and places marker after search.
  - **useMapSearch**: Handles geocoding API calls for location search.
  - **useGeoJsonLoader**: Loads GeoJSON from URL, manages loading/error state, and handles export.
  - **useGeoJson**: Manages GeoJSON data and selected feature indexes.
- `src/services/` — Utility services:
  - **mapboxService**: Geocoding API calls to Mapbox for location search.
  - **geoJsonService**: Functions for loading GeoJSON from URL and exporting GeoJSON data.
- `src/types/` — TypeScript types for GeoJSON and nebula.gl.
- `src/config/` — App configuration (default colors, opacity, etc.).

## Usage Tips

- Use the sidebar to switch modes, search, and manage data.
- Drawing mode enables polygon/line creation with color and opacity controls.
- Export your work as GeoJSON for use in other GIS tools.
- Switch themes for better visibility in different environments.
