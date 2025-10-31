import React from 'react';
import { DeckGL } from '@deck.gl/react';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Box from '@mui/material/Box';
import { ScatterplotLayer } from '@deck.gl/layers';

const INITIAL_VIEW_STATE = {
  longitude: 19.9449799,
  latitude: 50.0646501,
  zoom: 10,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

export default function MapView() {
  return (
    <Box sx={{ width: '100vw', height: 'calc(100vh - 64px)' }}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        style={{ width: '100%', height: '100%' }}
        layers={[new ScatterplotLayer({})]}
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
  );
}
