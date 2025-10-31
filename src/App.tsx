import React from 'react';

import './App.css';
import MapView from './components/MapView';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MapView />
    </>
  );
}

export default App;
