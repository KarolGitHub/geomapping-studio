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

## Project Structure

- `src/components/` — UI components (MapView, DrawToolbar, Sidebar, Navbar, etc.)
- `src/contexts/` — Theme context and providers
- `src/types/` — TypeScript types for GeoJSON and nebula.gl
- `src/config/` — App configuration

## Usage Tips

- Use the sidebar to switch modes, search, and manage data.
- Drawing mode enables polygon/line creation with color and opacity controls.
- Export your work as GeoJSON for use in other GIS tools.
- Switch themes for better visibility in different environments.
