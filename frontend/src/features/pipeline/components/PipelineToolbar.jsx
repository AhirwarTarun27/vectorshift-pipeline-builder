import { NODE_DEFINITIONS } from "features/pipeline/nodes";
import { DraggableNode } from "./DraggableNode";
import styles from "./PipelineToolbar.module.scss";

export const PipelineToolbar = () => (
  <div className={styles.toolbar}>
    {NODE_DEFINITIONS.map((definition) => (
      <DraggableNode key={definition.type} definition={definition} />
    ))}
  </div>
);
