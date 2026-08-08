import { useLayoutEffect, useRef, useState } from "react";
import { FieldShell } from "./FieldShell";
import styles from "./fields.module.scss";

const MIN_WIDTH = 200;
const MAX_WIDTH = 420;
const MIN_HEIGHT = 38;
const MAX_HEIGHT = 260;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const TextAreaField = ({ id, field, value, onChange }) => {
  const mirrorRef = useRef(null);
  const [size, setSize] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });

  useLayoutEffect(() => {
    const mirror = mirrorRef.current;
    if (!mirror) return;

    mirror.style.whiteSpace = "pre";
    mirror.style.width = "max-content";
    const naturalWidth = mirror.offsetWidth;
    const width = clamp(naturalWidth + 2, MIN_WIDTH, MAX_WIDTH);

    mirror.style.whiteSpace = "pre-wrap";
    mirror.style.width = `${width}px`;
    const height = clamp(mirror.scrollHeight, MIN_HEIGHT, MAX_HEIGHT);

    setSize((current) =>
      current.width === width && current.height === height
        ? current
        : { width, height }
    );
  }, [value]);

  return (
    <FieldShell id={id} label={field.label}>
      <div className={styles.textareaWrap}>
        <textarea
          id={id}
          className={`${styles.textarea} nodrag nowheel`}
          style={{ width: size.width, height: size.height }}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
        <div ref={mirrorRef} aria-hidden="true" className={styles.mirror}>
          {`${value ?? ""} `}
        </div>
      </div>
    </FieldShell>
  );
};
