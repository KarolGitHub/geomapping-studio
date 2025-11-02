import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface GeoJsonDataGridProps {
  geoJson: any;
  open: boolean;
  onClose: () => void;
}

export default function GeoJsonDataGrid({
  geoJson,
  open,
  onClose,
}: GeoJsonDataGridProps) {
  const features = geoJson?.features || [];
  const columns: GridColDef[] = [];
  const rows = features.map((feature: any, idx: number) => {
    Object.keys(feature.properties || {}).forEach((key) => {
      if (!columns.find((col) => col.field === key)) {
        columns.push({ field: key, headerName: key, width: 180 });
      }
    });
    return {
      id: idx,
      ...feature.properties,
      geometryType: feature.geometry?.type,
    };
  });
  if (!columns.find((col) => col.field === 'geometryType')) {
    columns.push({ field: 'geometryType', headerName: 'Geometry', width: 140 });
  }

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xl' fullWidth>
      <DialogTitle>
        GeoJSON Data Table
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ height: '80vh', width: '100%', p: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50]}
            autoHeight
            disableRowSelectionOnClick
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
