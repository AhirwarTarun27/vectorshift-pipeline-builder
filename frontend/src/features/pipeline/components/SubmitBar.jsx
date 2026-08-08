import styles from "./SubmitBar.module.scss";

export const SubmitBar = () => {
  return (
    <div className={styles.bar}>
      <button type="submit" className={styles.button}>
        Submit Pipeline
      </button>
    </div>
  );
};
