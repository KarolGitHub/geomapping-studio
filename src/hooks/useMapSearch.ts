import { useState } from 'react';
import { geocodeLocation } from '../services/mapboxService';

export default function useMapSearch() {
  const [result, setResult] = useState(null);
  const search = async (query: string) => {
    const token = process.env.REACT_APP_MAPBOX_TOKEN || '';
    const feature = await geocodeLocation(query, token);
    setResult(feature);
    return feature;
  };
  return { result, search };
}
