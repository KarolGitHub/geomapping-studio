// @ts-nocheck
import React, { useCallback, useState, useEffect } from 'react';
import { DeckGL } from '@deck.gl/react';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Box from '@mui/material/Box';
import {
  EditableGeoJsonLayer,
  DrawPolygonMode,
  DrawLineStringMode,
  ModifyMode,
} from 'nebula.gl';
import DrawToolbar from './DrawToolbar';
import useGeoJson from '../hooks/useGeoJson';
import { NebulaEditType, NebulaEditTypes } from '../types/nebula';

const INITIAL_VIEW_STATE = {
  longitude: 19.9449799,
  latitude: 50.0646501,
  zoom: 10,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

interface MapViewProps {
  mode: string;
  setMode: (mode: string) => void;
  drawingMode: boolean;
  setDrawingMode: (drawing: boolean) => void;
}

export default function MapView({
  mode,
  setMode,
  drawingMode,
  setDrawingMode,
}: MapViewProps) {
  const { geoJson, setGeoJson } = useGeoJson();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!drawingMode) {
      setIsDrawing(false);
    }
  }, [drawingMode]);

  const onEdit = useCallback(
    ({
      updatedData,
      editType,
    }: {
      updatedData: any;
      editType: NebulaEditType;
    }) => {
      setGeoJson(updatedData);
      if (editType === NebulaEditTypes.addTentativePosition) {
        setIsDrawing(true);
      }
      if (editType === NebulaEditTypes.addFeature) {
        setIsDrawing(false);
      }
    },
    [setGeoJson]
  );

  const modeObjects = {
    drawPolygon: new DrawPolygonMode(),
    drawLineString: new DrawLineStringMode(),
    modify: new ModifyMode(),
  };

  const activeMode = drawingMode ? mode : 'modify';

  const layers = [
    new EditableGeoJsonLayer({
      id: 'geojson',
      data: geoJson,
      mode: modeObjects[activeMode],
      selectedFeatureIndexes: [],
      onEdit,
      pickable: true,
      getFillColor: [0, 128, 255, 128],
      getLineColor: [0, 128, 255, 255],
      getRadius: 5,
      getLineWidth: 2,
    }),
  ];

  let pointsCount = 0;
  if (geoJson.features.length > 0) {
    const feature = geoJson.features[geoJson.features.length - 1];
    if (feature.geometry.type === 'Polygon') {
      pointsCount = feature.geometry.coordinates[0].length;
    } else if (feature.geometry.type === 'LineString') {
      pointsCount = feature.geometry.coordinates.length;
    }
  }

  const finishDrawing = () => {
    setIsDrawing(false);
  };
  const undoLastPoint = () => {
    if (geoJson.features.length > 0) {
      const feature = geoJson.features[geoJson.features.length - 1];
      if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates[0].pop();
      } else if (feature.geometry.type === 'LineString') {
        feature.geometry.coordinates.pop();
      }
      setGeoJson({ ...geoJson });
    }
  };
  const cancelDrawing = () => {
    if (geoJson.features.length > 0) {
      geoJson.features.pop();
      setGeoJson({ ...geoJson });
    }
  };

  const drawingActions = {
    finish: finishDrawing,
    undo: undoLastPoint,
    cancel: cancelDrawing,
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}
    >
      {drawingMode && (
        <Box
          sx={{
            position: 'absolute',
            top: 80,
            right: 16,
            zIndex: 10,
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 2,
            boxShadow: 2,
            p: 2,
          }}
        >
          <DrawToolbar
            mode={mode}
            setMode={setMode}
            pointsCount={pointsCount}
            drawingActions={drawingActions}
            drawingMode={isDrawing}
          />
        </Box>
      )}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          style={{ width: '100%', height: '100%' }}
          layers={layers}
        >
          <Map
            reuseMaps
            mapStyle={MAP_STYLE}
            style={{ width: '100%', height: '100%' }}
            attributionControl={true}
            width='100%'
            height='100%'
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          />
        </DeckGL>
      </Box>
    </Box>
  );
}
