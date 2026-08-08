import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useUpdateNodeInternals } from "reactflow";
import { X } from "lucide-react";

import { usePipelineStore } from "features/pipeline/store/usePipelineStore";
import { getDefinition } from "./definitions";
import { resolveFieldRenderer } from "./fields";
import { NodeHandle } from "./handles/NodeHandle";
import { layoutHandles, qualifyHandleId } from "./handles/layout";
import styles from "./BaseNode.module.scss";

const resolveHandles = (definition, data) =>
  typeof definition.handles === "function"
    ? (definition.handles(data) ?? [])
    : (definition.handles ?? []);

const BaseNodeComponent = ({ id, data, type, selected }) => {
  const definition = getDefinition(type);

  const updateNodeField = usePipelineStore((state) => state.updateNodeField);
  const removeNode = usePipelineStore((state) => state.removeNode);
  const pruneHandleEdges = usePipelineStore((state) => state.pruneHandleEdges);

  const updateNodeInternals = useUpdateNodeInternals();
  const nodeRef = useRef(null);

  const handles = useMemo(
    () => layoutHandles(resolveHandles(definition, data)),
    [definition, data],
  );

  const handleKey = useMemo(
    () => handles.map((handle) => qualifyHandleId(id, handle.id)).join("|"),
    [handles, id],
  );

  useEffect(() => {
    updateNodeInternals(id);
    pruneHandleEdges(id, handleKey ? handleKey.split("|") : []);
  }, [id, handleKey, updateNodeInternals, pruneHandleEdges]);

  useEffect(() => {
    const element = nodeRef.current;
    if (!element || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(() => updateNodeInternals(id));
    observer.observe(element);
    return () => observer.disconnect();
  }, [id, updateNodeInternals]);

  const handleFieldChange = useCallback(
    (name, value) => updateNodeField(id, name, value),
    [id, updateNodeField],
  );

  const Icon = definition.icon;
  const accent = `var(--color-node-${definition.category})`;

  return (
    <div
      ref={nodeRef}
      style={{ "--node-accent": accent }}
      className={
        selected ? `${styles.node} ${styles.nodeSelected}` : styles.node
      }
    >
      <header className={styles.header}>
        {Icon ? (
          <Icon
            size={14}
            strokeWidth={2.5}
            className={styles.icon}
            aria-hidden="true"
          />
        ) : null}
        <h3 className={styles.title}>{definition.label}</h3>
        <button
          type="button"
          onClick={() => removeNode(id)}
          aria-label={`Delete ${definition.label} node`}
          className={`${styles.deleteButton} nodrag`}
        >
          <X size={13} strokeWidth={2.5} />
        </button>
      </header>

      {definition.fields?.length ? (
        <div className={styles.fields}>
          {definition.fields.map((field) => {
            const Renderer = resolveFieldRenderer(field.type);
            const fieldId = `${id}-${field.name}`;

            return (
              <Renderer
                key={field.name}
                id={fieldId}
                field={field}
                value={data?.[field.name]}
                onChange={(value) => handleFieldChange(field.name, value)}
              />
            );
          })}
        </div>
      ) : null}

      {handles.map((handle) => (
        <NodeHandle
          key={`${handle.type}-${handle.id}`}
          id={qualifyHandleId(id, handle.id)}
          type={handle.type}
          position={handle.position}
          offset={handle.offset}
          label={handle.label}
          accent="var(--node-accent)"
        />
      ))}
    </div>
  );
};

export const BaseNode = memo(BaseNodeComponent);
