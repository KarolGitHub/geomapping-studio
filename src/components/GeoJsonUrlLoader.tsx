import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

interface GeoJsonUrlLoaderProps {
  open: boolean;
  onClose: () => void;
  onLoad: (url: string) => void;
  error?: string;
  loading?: boolean;
}

export default function GeoJsonUrlLoader({
  open,
  onClose,
  onLoad,
  error,
  loading,
}: GeoJsonUrlLoaderProps) {
  const [geoJsonUrl, setGeoJsonUrl] = useState(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
  );
  const [localError, setLocalError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const prevLoadingRef = React.useRef<boolean | undefined>(undefined);

  const handleCloseDialog = React.useCallback(() => {
    setLocalError('');
    setGeoJsonUrl(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
    );
    onClose();
  }, [onClose]);

  React.useEffect(() => {
    if (
      prevLoadingRef.current === true &&
      loading === false &&
      !error &&
      open
    ) {
      setShowSuccess(true);
      handleCloseDialog();
    }
    prevLoadingRef.current = loading;
    setShowError(!!error);
  }, [error, loading, open, handleCloseDialog]);

  const handleLoadClick = () => {
    setLocalError('');
    if (!geoJsonUrl) {
      setLocalError('Please enter a URL.');
      return;
    }
    onLoad(geoJsonUrl);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{ sx: { minWidth: 640 } }}
      >
        <DialogTitle>Load GeoJSON from URL</DialogTitle>
        <DialogContent>
          <TextField
            label='GeoJSON URL'
            variant='outlined'
            fullWidth
            value={geoJsonUrl}
            onChange={(e) => setGeoJsonUrl(e.target.value)}
            placeholder='Enter GeoJSON URL'
            margin='dense'
            error={!!localError}
            helperText={localError}
            disabled={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleLoadClick}
            variant='contained'
            disabled={loading}
          >
            Load
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='success' sx={{ width: '100%' }}>
          GeoJSON loaded successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
