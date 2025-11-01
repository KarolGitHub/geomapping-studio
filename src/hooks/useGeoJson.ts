import { useState } from 'react';

export default function useGeoJson() {
  const [geoJson, setGeoJson] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState([]);

  return {
    geoJson,
    setGeoJson,
    selectedFeatureIndexes,
    setSelectedFeatureIndexes,
  };
}
