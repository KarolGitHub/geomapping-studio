import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/Close';

export interface DrawingActions {
  finish?: () => void;
  undo?: () => void;
  cancel?: () => void;
}

interface DrawToolbarProps {
  mode: string;
  setMode: (mode: string) => void;
  pointsCount?: number;
  drawingActions?: DrawingActions;
}

interface DrawToolbarExtendedProps extends DrawToolbarProps {
  drawingMode?: boolean;
}

const DrawToolbar: React.FC<DrawToolbarExtendedProps> = ({
  mode,
  setMode,
  pointsCount = 0,
  drawingActions = {},
  drawingMode = false,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h6' sx={{ mb: 1 }}>
        Drawing Mode
      </Typography>
      <Typography variant='body2' sx={{ mb: 2 }}>
        Points: {pointsCount}
      </Typography>
      {drawingMode && (
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Tooltip title='Finish Drawing'>
            <Button
              variant='contained'
              color='primary'
              onClick={drawingActions.finish}
            >
              <CheckIcon />
            </Button>
          </Tooltip>
          <Tooltip title='Undo Last Point'>
            <Button
              variant='outlined'
              color='secondary'
              onClick={drawingActions.undo}
            >
              <UndoIcon />
            </Button>
          </Tooltip>
          <Tooltip title='Cancel Drawing'>
            <Button
              variant='outlined'
              color='error'
              onClick={drawingActions.cancel}
            >
              <CloseIcon />
            </Button>
          </Tooltip>
        </Box>
      )}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant={mode === 'drawPolygon' ? 'contained' : 'outlined'}
          onClick={() => setMode('drawPolygon')}
        >
          Polygon
        </Button>
        <Button
          variant={mode === 'drawLineString' ? 'contained' : 'outlined'}
          onClick={() => setMode('drawLineString')}
        >
          Line
        </Button>
        <Button
          variant={mode === 'modify' ? 'contained' : 'outlined'}
          onClick={() => setMode('modify')}
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default DrawToolbar;
