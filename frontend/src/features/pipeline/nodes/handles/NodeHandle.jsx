import { Handle, Position } from "reactflow";

import styles from "./NodeHandle.module.scss";

const isVertical = (position) =>
  position === Position.Top || position === Position.Bottom;

const labelPlacement = {
  [Position.Left]: styles.labelLeft,
  [Position.Right]: styles.labelRight,
  [Position.Top]: styles.labelTop,
  [Position.Bottom]: styles.labelBottom,
};

export const NodeHandle = ({ id, type, position, offset, label, accent }) => {
  const style = isVertical(position) ? { left: offset } : { top: offset };

  return (
    <>
      <Handle
        id={id}
        type={type}
        position={position}
        style={{ ...style, backgroundColor: accent }}
        className={styles.handle}
      />
      {label ? (
        <span
          style={style}
          className={`${styles.label} ${labelPlacement[position] ?? ""}`}
        >
          {label}
        </span>
      ) : null}
    </>
  );
};
