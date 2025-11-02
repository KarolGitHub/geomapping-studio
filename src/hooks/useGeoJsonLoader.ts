import { useState } from 'react';
import { loadGeoJsonFromUrl, exportGeoJson } from '../services/geoJsonService';

export function useGeoJsonLoader(setGeoJson: (data: any) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoadGeoJsonFromUrl = async (url: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await loadGeoJsonFromUrl(url);
      setGeoJson(data);
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
