import styles from "./fields.module.scss";

export const UnknownField = ({ field }) => (
  <p className={styles.unknown}>
    Unknown field type: <code>{String(field.type)}</code> ({field.name})
  </p>
);
