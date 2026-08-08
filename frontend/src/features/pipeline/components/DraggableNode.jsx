import {
  DRAG_MIME,
  encodeDragPayload,
} from "features/pipeline/lib/dragPayload";
import styles from "./DraggableNode.module.scss";

export const DraggableNode = ({ definition }) => {
  const { type, label, icon: Icon, description, category } = definition;

  const onDragStart = (event) => {
    event.dataTransfer.setData(DRAG_MIME, encodeDragPayload(type));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      title={description}
      style={{ "--node-accent": `var(--color-node-${category})` }}
      className={styles.chip}
    >
      {Icon ? (
        <Icon
          size={14}
          strokeWidth={2.5}
          className={styles.icon}
          aria-hidden="true"
        />
      ) : null}
      {label}
    </div>
  );
};
