import styles from "./fields.module.scss";

export const StaticText = ({ field }) => (
  <p className={styles.staticText}>{field.text}</p>
);
