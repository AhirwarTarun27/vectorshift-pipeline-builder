import { useRef, useState } from "react";

import {
  DRAG_MIME,
  encodeDragPayload,
} from "features/pipeline/lib/dragPayload";
import styles from "./DraggableNode.module.scss";

const DRAG_THRESHOLD_PX = 4;

const dropOnCanvas = (type, clientX, clientY) => {
  const canvas = document
    .elementFromPoint(clientX, clientY)
    ?.closest(".react-flow");
  if (!canvas) return;

  const dataTransfer = new DataTransfer();
  dataTransfer.setData(DRAG_MIME, encodeDragPayload(type));
  canvas.dispatchEvent(
    new DragEvent("drop", {
      bubbles: true,
      cancelable: true,
      dataTransfer,
      clientX,
      clientY,
    }),
  );
};

export const DraggableNode = ({ definition }) => {
  const { type, label, icon: Icon, description, category } = definition;

  const [ghost, setGhost] = useState(null);
  const origin = useRef(null);

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    origin.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerMove = (event) => {
    if (!origin.current) return;

    const { x, y } = origin.current;
    if (Math.hypot(event.clientX - x, event.clientY - y) < DRAG_THRESHOLD_PX) {
      return;
    }
    setGhost({ x: event.clientX, y: event.clientY });
  };

  const onPointerUp = (event) => {
    const dragging = ghost !== null;
    origin.current = null;
    setGhost(null);
    if (dragging) dropOnCanvas(type, event.clientX, event.clientY);
  };

  const onPointerCancel = () => {
    origin.current = null;
    setGhost(null);
  };

  const accent = { "--node-accent": `var(--color-node-${category})` };

  const content = (
    <>
      {Icon ? (
        <Icon
          size={14}
          strokeWidth={2.5}
          className={styles.icon}
          aria-hidden="true"
        />
      ) : null}
      {label}
    </>
  );

  return (
    <>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        title={description}
        style={accent}
        className={
          ghost ? `${styles.chip} ${styles.chipDragging}` : styles.chip
        }
      >
        {content}
      </div>

      {ghost ? (
        <div
          aria-hidden="true"
          style={{ ...accent, left: ghost.x, top: ghost.y }}
          className={`${styles.chip} ${styles.ghost}`}
        >
          {content}
        </div>
      ) : null}
    </>
  );
};
