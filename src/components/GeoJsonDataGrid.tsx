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
  selectedFeatureId: string | null;
  setSelectedFeatureId: (id: string | null) => void;
}

const GeoJsonDataGrid: React.FC<GeoJsonDataGridProps> = ({
  geoJson,
  open,
  onClose,
  selectedFeatureId,
  setSelectedFeatureId,
}) => {
  const features = geoJson?.features || [];
  const columns: GridColDef[] = [];
  const rows = features.map((feature: any, idx: number) => {
    Object.keys(feature.properties || {}).forEach((key) => {
      if (!columns.find((col) => col.field === key)) {
        columns.push({ field: key, headerName: key, width: 180 });
      }
    });
    return {
      id: feature.id ? String(feature.id) : String(idx),
      ...feature.properties,
      geometryType: feature.geometry?.type,
    };
  });

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const rowSelectionModel = {
    type: 'include',
    ids: new Set<string>(selectedFeatureId ? [String(selectedFeatureId)] : []),
  };

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
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            //@ts-ignore
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              const idsArray = Array.from(newRowSelectionModel.ids);
              setSelectedFeatureId(
                idsArray.length > 0 ? String(idsArray[0]) : null
              );
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(GeoJsonDataGrid);
