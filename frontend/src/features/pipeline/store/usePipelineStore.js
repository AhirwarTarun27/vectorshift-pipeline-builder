import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

const EDGE_OPTIONS = {
  type: "smoothstep",
  animated: true,
  markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
};

export const usePipelineStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    });
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({ edges: addEdge({ ...connection, ...EDGE_OPTIONS }, get().edges) });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
          : node
      ),
    });
  },

  pruneHandleEdges: (nodeId, validHandleIds) => {
    const valid = new Set(validHandleIds);
    const next = get().edges.filter((edge) => {
      if (edge.source === nodeId && edge.sourceHandle) {
        return valid.has(edge.sourceHandle);
      }
      if (edge.target === nodeId && edge.targetHandle) {
        return valid.has(edge.targetHandle);
      }
      return true;
    });
    if (next.length !== get().edges.length) {
      set({ edges: next });
    }
  },
}));
