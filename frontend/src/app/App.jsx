import { Workflow } from "lucide-react";

import { PipelineToolbar, PipelineCanvas, SubmitBar } from "features/pipeline";
import styles from "./App.module.scss";

export function App() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <span className={styles.mark} aria-hidden="true">
          <Workflow size={18} strokeWidth={2.5} />
        </span>
        <div>
          <h1 className={styles.title}>Pipeline Builder</h1>
          <p className={styles.subtitle}>
            Drag a node onto the canvas, then connect the handles
          </p>
        </div>
      </header>

      <PipelineToolbar />

      <main className={styles.stage}>
        <PipelineCanvas />
        <div className={styles.submitDock}>
          <SubmitBar />
        </div>
      </main>
    </div>
  );
}
