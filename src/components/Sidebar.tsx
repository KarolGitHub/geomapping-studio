import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import DrawIcon from '@mui/icons-material/Gesture';
import ExportIcon from '@mui/icons-material/Download';
import LoadIcon from '@mui/icons-material/CloudDownload';
import TableIcon from '@mui/icons-material/TableChart';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import SearchBar from './SearchBar';
import GeoJsonUrlLoader from './GeoJsonUrlLoader';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  setMode?: (mode: string) => void;
  drawingMode?: boolean;
  setDrawingMode?: (active: boolean) => void;
  onSearch?: (query: string) => void;
  onExportGeoJson?: () => void;
  onLoadGeoJsonFromUrl?: (url: string) => void;
  geoJsonLoadError?: string;
  geoJsonLoadLoading?: boolean;
  onViewTable?: () => void;
}

export default function Sidebar({
  open,
  onClose,
  setMode,
  drawingMode,
  setDrawingMode,
  onSearch,
  onExportGeoJson,
  onLoadGeoJsonFromUrl,
  geoJsonLoadError,
  geoJsonLoadLoading,
  onViewTable,
}: SidebarProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [geoJsonModalOpen, setGeoJsonModalOpen] = useState(false);

  return (
    <>
      <Drawer
        anchor='left'
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            top: { xs: 56, sm: 64 },
            height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' },
          },
        }}
      >
        <List
          sx={{
            width: { xs: '80vw', sm: 320 },
            p: { xs: 1, sm: 2 },
          }}
        >
          <ListItemButton onClick={() => setShowSearch((s) => !s)}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText
              primary='Search Location'
              secondary={
                <Typography variant='body2'>
                  Search coordinates or places
                </Typography>
              }
            />
          </ListItemButton>
          {showSearch && <SearchBar onSearch={onSearch ?? (() => {})} />}
          <ListItemButton
            onClick={() => {
              if (drawingMode) {
                setDrawingMode && setDrawingMode(false);
              } else {
                setMode && setMode('drawPolygon');
                setDrawingMode && setDrawingMode(true);
              }
            }}
            sx={{ color: drawingMode ? 'red' : 'inherit' }}
          >
            <ListItemIcon>
              <DrawIcon sx={{ color: drawingMode ? 'red' : 'inherit' }} />
            </ListItemIcon>
            <ListItemText
              primary={drawingMode ? 'Exit Drawing Mode' : 'Draw Polygon'}
              secondary={
                <Typography variant='body2'>Draw shapes on map</Typography>
              }
            />
          </ListItemButton>
          <ListItemButton onClick={onExportGeoJson}>
            <ListItemIcon>
              <ExportIcon />
            </ListItemIcon>
            <ListItemText
              primary='Export to GeoJSON'
              secondary={
                <Typography variant='body2'>Download current data</Typography>
              }
            />
          </ListItemButton>
          <ListItemButton onClick={() => setGeoJsonModalOpen(true)}>
            <ListItemIcon>
              <LoadIcon />
            </ListItemIcon>
            <ListItemText
              primary='Load GeoJSON from URL'
              secondary={
                <Typography variant='body2'>Import external data</Typography>
              }
            />
          </ListItemButton>
          <ListItemButton onClick={() => onViewTable && onViewTable()}>
            <ListItemIcon>
              <TableIcon />
            </ListItemIcon>
            <ListItemText
              primary='View Data Table'
              secondary={
                <Typography variant='body2'>Open table in dialog</Typography>
              }
            />
          </ListItemButton>
        </List>
      </Drawer>
      <GeoJsonUrlLoader
        open={geoJsonModalOpen}
        onClose={() => setGeoJsonModalOpen(false)}
        onLoad={onLoadGeoJsonFromUrl ?? (() => {})}
        error={geoJsonLoadError}
        loading={geoJsonLoadLoading}
      />
    </>
  );
}
