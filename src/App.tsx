import React, { useState } from 'react';
import './App.css';
import MapView from './components/MapView';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import useMapSearchState from './hooks/useMapSearchState';
import { INITIAL_VIEW_STATE } from './constants/map';
import { exportGeoJson } from './services/geoJsonExportService';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState('drawPolygon');
  const [drawingMode, setDrawingMode] = useState(false);
  const [geoJson, setGeoJson] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const { viewState, setViewState, searchMarker, handleSearch } =
    useMapSearchState(INITIAL_VIEW_STATE);

  const handleExportGeoJson = () => {
    exportGeoJson(geoJson);
  };

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        setMode={setMode}
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
        onSearch={handleSearch}
        onExportGeoJson={handleExportGeoJson}
      />
      <MapView
        mode={mode}
        setMode={setMode}
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
        viewState={viewState}
        setViewState={setViewState}
        searchMarker={searchMarker}
        geoJson={geoJson}
        setGeoJson={setGeoJson}
      />
    </>
  );
}

export default App;
