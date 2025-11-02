import { useState } from 'react';
import { loadGeoJsonFromUrl, exportGeoJson } from '../services/geoJsonService';

export function useGeoJsonLoader(setGeoJson: (data: any) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoadGeoJsonFromUrl = async (
    url: string,
    currentGeoJson?: any
  ) => {
    setLoading(true);
    setError('');
    try {
      const data = await loadGeoJsonFromUrl(url);
      setGeoJson({
        type: 'FeatureCollection',
        features: [
          ...(currentGeoJson?.features?.filter(
            (f: any) => f.properties?.userDrawn
          ) || []),
          ...(data.features?.map((f: any) => ({
            ...f,
            properties: { ...f.properties, userDrawn: false },
          })) || []),
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleLoadGeoJsonFromUrl,
    exportGeoJson,
  };
}
