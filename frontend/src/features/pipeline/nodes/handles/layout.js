import { Position } from "reactflow";

export const handleOffset = (index, count) => `${((index + 1) / (count + 1)) * 100}%`;

export const layoutHandles = (handles = []) => {
  const bySide = new Map();

  for (const handle of handles) {
    const side = handle.position ?? Position.Left;
    if (!bySide.has(side)) bySide.set(side, []);
    bySide.get(side).push(handle);
  }

  return [...bySide.values()].flatMap((group) =>
    group.map((handle, index) => ({
      ...handle,
      offset: handleOffset(index, group.length),
    }))
  );
};

export const qualifyHandleId = (nodeId, handleId) => `${nodeId}-${handleId}`;
