import React, { useState } from 'react';
import './App.css';
import MapView from './components/MapView';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import useMapSearchState from './hooks/useMapSearchState';
import { INITIAL_VIEW_STATE } from './constants/map';
import { useGeoJsonLoader } from './hooks/useGeoJsonLoader';
import GeoJsonDataGrid from './components/GeoJsonDataGrid';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState('drawPolygon');
  const [drawingMode, setDrawingMode] = useState(false);
  const [geoJson, setGeoJson] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [viewMode, setViewMode] = useState<'map' | 'table'>('map');
  const { viewState, setViewState, searchMarker, handleSearch } =
    useMapSearchState(INITIAL_VIEW_STATE);
  const { loading, error, handleLoadGeoJsonFromUrl, exportGeoJson } =
    useGeoJsonLoader(setGeoJson);

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
        onExportGeoJson={() => exportGeoJson(geoJson)}
        onLoadGeoJsonFromUrl={(url) => handleLoadGeoJsonFromUrl(url, geoJson)}
        geoJsonLoadError={error}
        geoJsonLoadLoading={loading}
        onViewTable={() => setViewMode('table')}
      />
      {viewMode === 'map' ? (
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
      ) : (
        <GeoJsonDataGrid
          geoJson={geoJson}
          open={viewMode === 'table'}
          onClose={() => setViewMode('map')}
        />
      )}
    </>
  );
}

export default App;
