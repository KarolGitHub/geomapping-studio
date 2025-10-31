import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import DrawIcon from '@mui/icons-material/Gesture';
import ExportIcon from '@mui/icons-material/Download';
import LoadIcon from '@mui/icons-material/CloudDownload';
import TableIcon from '@mui/icons-material/TableChart';
// ...existing code...
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { top: 64, height: 'calc(100% - 64px)' } }}
    >
      <List sx={{ width: 320 }}>
        <ListItemButton>
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
        <ListItemButton>
          <ListItemIcon>
            <DrawIcon />
          </ListItemIcon>
          <ListItemText
            primary='Draw Polygon'
            secondary={
              <Typography variant='body2'>Draw shapes on map</Typography>
            }
          />
        </ListItemButton>
        <ListItemButton>
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
        <ListItemButton>
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
        <ListItemButton>
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
  );
}
