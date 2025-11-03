//@ts-nocheck
import React, { useCallback, useState, useEffect } from 'react';
import { appConfig } from '../config/appConfig';
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

import { NebulaEditType, NebulaEditTypes } from '../types/nebula';

const MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

interface MapViewProps {
  mode: string;
  setMode: (mode: string) => void;
  drawingMode: boolean;
  setDrawingMode: (drawing: boolean) => void;
  viewState: any;
  setViewState: (vs: any) => void;
  searchMarker?: { longitude: number; latitude: number } | null;
  geoJson: any;
  setGeoJson: (data: any) => void;
  selectedFeatureId: string | null;
  setSelectedFeatureId: (id: string | null) => void;
}

export default function MapView({
  mode,
  setMode,
  drawingMode,
  setDrawingMode,
  viewState,
  setViewState,
  searchMarker,
  geoJson,
  setGeoJson,
  selectedFeatureId,
  setSelectedFeatureId,
}: MapViewProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(appConfig.defaultColor);
  const [opacity, setOpacity] = useState(appConfig.defaultOpacity);

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
      if (editType === NebulaEditTypes.addFeature) {
        const lastIdx = updatedData.features.length - 1;
        if (lastIdx >= 0) {
          const feature = updatedData.features[lastIdx];

          feature.properties = {
            ...feature.properties,
            userDrawn: true,
            color,
            opacity,
            createdAt: new Date().toISOString(),
            pointCount:
              feature.geometry.type === 'Polygon'
                ? feature.geometry.coordinates[0].length - 1
                : feature.geometry.type === 'LineString'
                ? feature.geometry.coordinates.length
                : 1,
          };
        }
        setIsDrawing(false);
      }
      setGeoJson(updatedData);
      if (editType === NebulaEditTypes.addTentativePosition) {
        setIsDrawing(true);
      }
    },
    [setGeoJson, color, opacity]
  );

  const modeObjects = {
    drawPolygon: new DrawPolygonMode(),
    drawLineString: new DrawLineStringMode(),
    modify: new ModifyMode(),
  };

  const activeMode = drawingMode ? mode : 'modify';

  const getFeatureId = (feature: any, idx: number) =>
    feature?.id ?? String(idx);

  const selectedFeatureIndexes =
    selectedFeatureId !== null
      ? geoJson.features
          .map((f: any, i: number) => getFeatureId(f, i))
          .reduce<number[]>(
            (acc, id, idx) => (id === selectedFeatureId ? [...acc, idx] : acc),
            []
          )
      : [];

  const layer = new EditableGeoJsonLayer({
    id: 'geojson',
    data: geoJson,
    mode: modeObjects[activeMode],
    selectedFeatureIndexes,
    onEdit,
    pickable: true,
    getFillColor: (f) => {
      const c = f.properties?.color || '#0080ff';
      const o = f.properties?.opacity ?? 0.5;
      const rgb = c.startsWith('#')
        ? [
            parseInt(c.slice(1, 3), 16),
            parseInt(c.slice(3, 5), 16),
            parseInt(c.slice(5, 7), 16),
          ]
        : [0, 128, 255];
      return [...rgb, Math.round(o * 255)];
    },
    getLineColor: (f) => {
      const c = f.properties?.color || '#0080ff';
      const rgb = c.startsWith('#')
        ? [
            parseInt(c.slice(1, 3), 16),
            parseInt(c.slice(3, 5), 16),
            parseInt(c.slice(5, 7), 16),
          ]
        : [0, 128, 255];
      return [...rgb, 255];
    },
    getRadius: 5,
    getLineWidth: 2,
    onClick: (info: any) => {
      if (!isDrawing && info && info.object) {
        const idx = info.index;
        const feature = geoJson.features[idx];
        setSelectedFeatureId(getFeatureId(feature, idx));
        if (mode === 'modify') {
          feature.properties = {
            ...feature.properties,
            color,
            opacity,
          };
          setGeoJson({ ...geoJson });
        }
      }
    },
  });

  const layers = [layer];

  let pointsCount = 0;
  if (geoJson.features.length > 0) {
    const feature = geoJson.features[geoJson.features.length - 1];
    if (feature.geometry.type === 'Polygon') {
      pointsCount = feature.geometry.coordinates[0].length;
    } else if (feature.geometry.type === 'LineString') {
      pointsCount = feature.geometry.coordinates.length;
    }
  }

  const handleViewStateChange = ({ viewState }) => {
    setViewState(viewState);
  };

  const totalFeatures = geoJson.features.length;
  const drawnFeatures = geoJson.features.filter(
    (f) => f.properties?.userDrawn === true
  ).length;
  const lat = viewState.latitude.toFixed(5);
  const lng = viewState.longitude.toFixed(5);
  const zoom = viewState.zoom.toFixed(2);

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
            color={color}
            setColor={setColor}
            opacity={opacity}
            setOpacity={setOpacity}
          />
        </Box>
      )}
      <Box
        sx={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          zIndex: 20,
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 2,
          boxShadow: 2,
          p: 2,
          minWidth: 220,
        }}
      >
        <Box sx={{ mb: 1 }}>
          <strong>Map Information</strong>
        </Box>
        <Box>Total Features: {totalFeatures}</Box>
        <Box>Drawn: {drawnFeatures}</Box>
        <Box>Lat: {lat}</Box>
        <Box>Lng: {lng}</Box>
        <Box>Zoom: {zoom}</Box>
      </Box>
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <DeckGL
          initialViewState={viewState}
          viewState={viewState}
          controller={true}
          style={{ width: '100%', height: '100%' }}
          layers={
            searchMarker
              ? [
                  ...layers,
                  new EditableGeoJsonLayer({
                    id: 'search-marker',
                    data: {
                      type: 'FeatureCollection',
                      features: [
                        {
                          type: 'Feature',
                          geometry: {
                            type: 'Point',
                            coordinates: [
                              searchMarker.longitude,
                              searchMarker.latitude,
                            ],
                          },
                          properties: {},
                        },
                      ],
                    },
                    getPointRadius: 12,
                    getFillColor: [255, 0, 0, 200],
                    pickable: false,
                  }),
                ]
              : layers
          }
          onViewStateChange={handleViewStateChange}
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
