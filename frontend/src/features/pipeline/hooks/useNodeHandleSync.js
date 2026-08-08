import { useEffect, useRef } from "react";
import { useUpdateNodeInternals } from "reactflow";

import { usePipelineStore } from "features/pipeline/store/usePipelineStore";

export const useNodeHandleSync = (nodeId, handleIds) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const pruneHandleEdges = usePipelineStore((state) => state.pruneHandleEdges);
  const nodeRef = useRef(null);

  // A fresh array every render would re-fire the effect every render. Joining
  // to a string makes the dependency compare by value instead of identity.
  const handleKey = handleIds.join("|");

  useEffect(() => {
    updateNodeInternals(nodeId);
    pruneHandleEdges(nodeId, handleKey ? handleKey.split("|") : []);
  }, [nodeId, handleKey, updateNodeInternals, pruneHandleEdges]);

  useEffect(() => {
    const element = nodeRef.current;
    if (!element || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(() => updateNodeInternals(nodeId));
    observer.observe(element);
    return () => observer.disconnect();
  }, [nodeId, updateNodeInternals]);

  return nodeRef;
};
