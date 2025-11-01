import { useState } from 'react';
import './App.css';
import MapView from './components/MapView';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState('drawPolygon');
  const [drawingMode, setDrawingMode] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        setMode={setMode}
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
      />
      <MapView
        mode={mode}
        setMode={setMode}
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
      />
    </>
  );
}

export default App;
