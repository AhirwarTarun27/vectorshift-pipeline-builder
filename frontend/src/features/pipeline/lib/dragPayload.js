export const DRAG_MIME = "application/reactflow";

export const encodeDragPayload = (nodeType) => JSON.stringify({ nodeType });

export const decodeDragPayload = (transferred) => {
  if (!transferred) return null;

  try {
    const { nodeType } = JSON.parse(transferred);
    return nodeType ?? null;
  } catch {
    return null;
  }
};
