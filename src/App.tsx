import React, { useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import useMapSearchState from './hooks/useMapSearchState';
import { INITIAL_VIEW_STATE } from './constants/map';
import { useGeoJsonLoader } from './hooks/useGeoJsonLoader';
import GeoJsonDataGrid from './components/GeoJsonDataGrid';
const MapView = lazy(() => import('./components/MapView'));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState('drawPolygon');
  const [drawingMode, setDrawingMode] = useState(false);
  const [geoJson, setGeoJson] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [viewMode, setViewMode] = useState<'map' | 'table'>('map');
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(
    null
  );
  const { viewState, setViewState, searchMarker, handleSearch } =
    useMapSearchState(INITIAL_VIEW_STATE);
  const { loading, error, handleLoadGeoJsonFromUrl, exportGeoJson } =
    useGeoJsonLoader(setGeoJson);

  return (
    <ThemeProvider>
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
        <Suspense
          fallback={
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              Loading map...
            </div>
          }
        >
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
            selectedFeatureId={selectedFeatureId}
            setSelectedFeatureId={setSelectedFeatureId}
          />
        </Suspense>
      ) : (
        <GeoJsonDataGrid
          geoJson={geoJson}
          open={viewMode === 'table'}
          onClose={() => setViewMode('map')}
          selectedFeatureId={selectedFeatureId}
          setSelectedFeatureId={setSelectedFeatureId}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
