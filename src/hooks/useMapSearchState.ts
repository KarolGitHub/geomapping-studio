import { useState } from 'react';
import useMapSearch from './useMapSearch';

export default function useMapSearchState(initialViewState: any) {
  const [searchMarker, setSearchMarker] = useState<null | { longitude: number; latitude: number }>(null);
  const [viewState, setViewState] = useState(initialViewState);
  const { search } = useMapSearch();

  const handleSearch = async (query: string) => {
    const result = await search(query);
    if (result) {
      setViewState({
        ...viewState,
        longitude: result.center[0],
        latitude: result.center[1],
        zoom: 14,
      });
      setSearchMarker({ longitude: result.center[0], latitude: result.center[1] });
    }
  };

  return {
    viewState,
    setViewState,
    searchMarker,
    setSearchMarker,
    handleSearch,
  };
}
