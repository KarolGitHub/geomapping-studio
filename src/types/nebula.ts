export const NebulaEditTypes = {
  addTentativePosition: 'addTentativePosition',
  addFeature: 'addFeature',
  addPosition: 'addPosition',
  finishMove: 'finishMove',
  finishDrawing: 'finishDrawing',
  removePosition: 'removePosition',
  removeFeature: 'removeFeature',
  updateFeature: 'updateFeature',
  updatePosition: 'updatePosition',
  startMove: 'startMove',
  movePosition: 'movePosition',
  splitFeature: 'splitFeature',
  editHandle: 'editHandle',
  editVertex: 'editVertex',
  editIntermediate: 'editIntermediate',
  editPoint: 'editPoint',
  editLine: 'editLine',
  editPolygon: 'editPolygon',
} as const;

export type NebulaEditType = keyof typeof NebulaEditTypes;
