import { Play, CircleCheck, CircleAlert, LoaderCircle } from "lucide-react";

import {
  useParsePipeline,
  PARSE_STATUS,
} from "features/pipeline/hooks/useParsePipeline";
import styles from "./SubmitBar.module.scss";

export const SubmitBar = () => {
  const { status, report, error, submit, isLoading } = useParsePipeline();

  return (
    <div className={styles.bar}>
      <button
        type="button"
        onClick={submit}
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? (
          <LoaderCircle size={16} strokeWidth={2.5} className={styles.spinner} />
        ) : (
          <Play size={16} strokeWidth={2.5} />
        )}
        {isLoading ? "Checking…" : "Submit Pipeline"}
      </button>

      <div role="status" aria-live="polite" className={styles.result}>
        {status === PARSE_STATUS.success && report ? (
          <div className={styles.report}>
            <span className={styles.stat}>
              <strong>{report.num_nodes}</strong>
              {report.num_nodes === 1 ? "node" : "nodes"}
            </span>
            <span className={styles.stat}>
              <strong>{report.num_edges}</strong>
              {report.num_edges === 1 ? "connection" : "connections"}
            </span>
            <span
              className={report.is_dag ? styles.verdictOk : styles.verdictBad}
            >
              {report.is_dag ? (
                <CircleCheck size={14} strokeWidth={2.5} />
              ) : (
                <CircleAlert size={14} strokeWidth={2.5} />
              )}
              {report.is_dag
                ? "Valid pipeline — no loops"
                : "This pipeline loops back on itself"}
            </span>
          </div>
        ) : null}

        {status === PARSE_STATUS.error ? (
          <p className={styles.error}>
            <CircleAlert size={14} strokeWidth={2.5} />
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
};
