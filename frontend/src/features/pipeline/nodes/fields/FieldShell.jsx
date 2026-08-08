import styles from "./fields.module.scss";

export const FieldShell = ({ id, label, children }) => (
  <label htmlFor={id} className={styles.field}>
    {label ? <span className={styles.label}>{label}</span> : null}
    {children}
  </label>
);
