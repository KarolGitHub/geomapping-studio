export function exportGeoJson(geoJson: any) {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const filename = `mapping-data-${dateStr}.geojson`;
  const dataStr =
    'data:application/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(geoJson));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', filename);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
