import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";

import { usePipelineStore } from "features/pipeline/store/usePipelineStore";
import {
  nodeTypes,
  getDefinition,
  buildInitialData,
} from "features/pipeline/nodes";
import {
  DRAG_MIME,
  decodeDragPayload,
} from "features/pipeline/lib/dragPayload";
import styles from "./PipelineCanvas.module.scss";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const deleteKeys = ["Backspace", "Delete"];

export const PipelineCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodes = usePipelineStore((state) => state.nodes);
  const edges = usePipelineStore((state) => state.edges);
  const getNodeID = usePipelineStore((state) => state.getNodeID);
  const addNode = usePipelineStore((state) => state.addNode);
  const onNodesChange = usePipelineStore((state) => state.onNodesChange);
  const onEdgesChange = usePipelineStore((state) => state.onEdgesChange);
  const onConnect = usePipelineStore((state) => state.onConnect);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = decodeDragPayload(event?.dataTransfer?.getData(DRAG_MIME));
      if (!type || !reactFlowInstance) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: buildInitialData(getDefinition(type), nodeID),
      });
    },
    [reactFlowInstance, getNodeID, addNode],
  );

  return (
    <div ref={reactFlowWrapper} className={styles.canvas}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        deleteKeyCode={deleteKeys}
        elevateEdgesOnSelect
        connectionLineType="smoothstep"
      >
        <Background gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
