import React from 'react';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import { SketchPicker } from 'react-color';
import IconButton from '@mui/material/IconButton';
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

const DrawToolbar: React.FC<
  DrawToolbarExtendedProps & {
    color: string;
    setColor: (c: string) => void;
    opacity: number;
    setOpacity: (o: number) => void;
  }
> = ({
  mode,
  setMode,
  pointsCount = 0,
  drawingActions = {},
  drawingMode = false,
  color,
  setColor,
  opacity,
  setOpacity,
}) => {
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, sm: 2 },
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        p: { xs: 1, sm: 2 },
        minWidth: { xs: 'auto', sm: 220 },
        maxWidth: { xs: '90vw', sm: 'none' },
      })}
    >
      <Typography variant='h6' sx={{ mb: 1 }}>
        Drawing Mode
      </Typography>
      <Typography variant='body2' sx={{ mb: 2 }}>
        Points: {pointsCount}
      </Typography>
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
      {(drawingMode || mode === 'modify') && (
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant='body2'>Color</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    background: color,
                    border: '2px solid #ccc',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowColorPicker(true)}
                />
                {showColorPicker && (
                  <Box
                    sx={(theme) => ({
                      position: 'absolute',
                      zIndex: 1000,
                      background: theme.palette.background.paper,
                      borderRadius: 2,
                      boxShadow: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      p: 2,
                    })}
                  >
                    <Box
                      sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                        color: theme.palette.text.primary,
                      })}
                    >
                      <Typography
                        variant='subtitle1'
                        sx={(theme) => ({ color: theme.palette.text.primary })}
                      >
                        Colors
                      </Typography>
                      <IconButton
                        size='small'
                        onClick={() => setShowColorPicker(false)}
                        sx={(theme) => ({ color: theme.palette.text.primary })}
                      >
                        <CloseIcon fontSize='small' />
                      </IconButton>
                    </Box>
                    <SketchPicker
                      color={color}
                      onChangeComplete={(c) => setColor(c.hex)}
                      disableAlpha={true}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant='body2'>Opacity</Typography>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={opacity}
                onChange={(_, v) => setOpacity(Number(v))}
              />
              <Input
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                inputProps={{ min: 0, max: 1, step: 0.01, type: 'number' }}
              />
            </Box>
          </Box>
          {drawingMode && (
            <Box sx={{ display: 'flex', gap: 2 }}>
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
        </Box>
      )}
    </Box>
  );
};

export default React.memo(DrawToolbar);
