import { useCallback, useEffect, useRef, useState } from "react";

import { usePipelineStore } from "features/pipeline/store/usePipelineStore";
import { parsePipeline } from "features/pipeline/lib/parsePipeline";

export const PARSE_STATUS = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
};

export const useParsePipeline = () => {
  const [status, setStatus] = useState(PARSE_STATUS.idle);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const ticket = useRef(0);

  // Unmounting invalidates the in-flight ticket: no setState after teardown.
  useEffect(
    () => () => {
      ticket.current += 1;
    },
    [],
  );

  const submit = useCallback(async () => {
    const issued = (ticket.current += 1);

    const { nodes, edges } = usePipelineStore.getState();

    setStatus(PARSE_STATUS.loading);
    setReport(null);
    setError("");

    try {
      const parsed = await parsePipeline(nodes, edges);
      if (ticket.current !== issued) return;
      setReport(parsed);
      setStatus(PARSE_STATUS.success);
    } catch (cause) {
      if (ticket.current !== issued) return;
      setError(cause.message);
      setStatus(PARSE_STATUS.error);
    }
  }, []);

  return {
    status,
    report,
    error,
    submit,
    isLoading: status === PARSE_STATUS.loading,
  };
};
